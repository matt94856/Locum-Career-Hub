"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type RecaptchaFieldHandle = {
  getToken: () => string;
  reset: () => void;
};

type RecaptchaFieldProps = {
  onReady?: () => void;
  onLoadError?: () => void;
};

const SCRIPT_SRC = "https://www.google.com/recaptcha/api.js?render=explicit";

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => resolve());
        return;
      }
      existing.addEventListener("load", () => window.grecaptcha?.ready(() => resolve()));
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA script failed to load")));
      return;
    }

    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => window.grecaptcha?.ready(() => resolve());
    s.onerror = () => reject(new Error("reCAPTCHA script failed to load"));
    document.head.appendChild(s);
  });
}

export const RecaptchaField = forwardRef<RecaptchaFieldHandle, RecaptchaFieldProps>(function RecaptchaField(
  { onReady, onLoadError },
  ref,
) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onReadyRef = useRef(onReady);
  const onLoadErrorRef = useRef(onLoadError);
  onReadyRef.current = onReady;
  onLoadErrorRef.current = onLoadError;

  useImperativeHandle(ref, () => ({
    getToken: () => {
      if (widgetIdRef.current == null || !window.grecaptcha) return "";
      return window.grecaptcha.getResponse(widgetIdRef.current);
    },
    reset: () => {
      if (widgetIdRef.current == null || !window.grecaptcha) return;
      window.grecaptcha.reset(widgetIdRef.current);
    },
  }));

  useEffect(() => {
    if (!siteKey) {
      onReadyRef.current?.();
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    let cancelled = false;

    const mount = () => {
      if (cancelled || !el || !window.grecaptcha) return;
      if (widgetIdRef.current != null) return;
      if (el.childNodes.length > 0) return;

      try {
        widgetIdRef.current = window.grecaptcha.render(el, {
          sitekey: siteKey,
          theme: "light",
          size: "normal",
        });
        onReadyRef.current?.();
      } catch {
        onLoadErrorRef.current?.();
      }
    };

    loadScript()
      .then(() => {
        if (cancelled) return;
        window.grecaptcha?.ready(mount);
      })
      .catch(() => {
        if (!cancelled) {
          onLoadErrorRef.current?.();
        }
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current != null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
        } catch {
          /* ignore */
        }
      }
      widgetIdRef.current = null;
      el.innerHTML = "";
    };
  }, [siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 sm:p-5">
      <p className="text-xs font-semibold text-slate-800">Security check</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">
        Please complete the verification below to help us prevent automated submissions.
      </p>
      <div className="mt-4 flex justify-start">
        <div ref={containerRef} className="min-h-[78px]" />
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
        This site is protected by reCAPTCHA and the Google{" "}
        <a className="text-brand-700 underline hover:text-brand-800" href="https://policies.google.com/privacy">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a className="text-brand-700 underline hover:text-brand-800" href="https://policies.google.com/terms">
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </div>
  );
});
