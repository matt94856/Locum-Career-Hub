/**
 * CMS-friendly article blocks. Rendered by `ArticleBody`.
 * Keep copy factual and educational; avoid individualized medical, legal, or tax advice.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; variant: "note" | "legal"; title: string; text: string };

export type BlogAuthor = {
  name: string;
  jobTitle?: string;
  description?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readMinutes: number;
  category: string;
  keywords: string[];
  /** Optional human author for E-E-A-T signals in Article JSON-LD. */
  author?: BlogAuthor;
  content: ArticleBlock[];
};
