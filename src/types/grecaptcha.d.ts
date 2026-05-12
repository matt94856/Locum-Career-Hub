export {};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          theme?: "light" | "dark";
          size?: "normal" | "compact";
        },
      ) => number;
      getResponse: (optWidgetId?: number) => string;
      reset: (optWidgetId?: number) => void;
    };
  }
}
