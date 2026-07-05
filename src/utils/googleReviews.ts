const GOOGLE_TRANSLATION_MARKER = /\n\n\(Translated by Google\)\n/i;

export function splitGoogleReviewComment(comment: string): { bg: string; en: string | null } {
  const match = comment.match(GOOGLE_TRANSLATION_MARKER);

  if (!match || match.index === undefined) {
    const text = comment.trim();
    return { bg: text, en: null };
  }

  const bg = comment.slice(0, match.index).trim();
  const en = comment.slice(match.index + match[0].length).trim();

  return { bg, en: en || null };
}

export function getLocalizedReviewComment(comment: string, lang: 'bg' | 'en'): string {
  const { bg, en } = splitGoogleReviewComment(comment);

  if (lang === 'en' && en) {
    return en;
  }

  return bg;
}

export function formatReviewDate(value: string | undefined, lang: 'bg' | 'en'): string {
  if (!value) return '';

  const locale = lang === 'en' ? 'en-US' : 'bg-BG';

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value));
}

export const REVIEW_PREVIEW_LENGTH = 140;

export function truncateReviewText(
  text: string,
  maxLength = REVIEW_PREVIEW_LENGTH
): { preview: string; isTruncated: boolean } {
  if (text.length <= maxLength) {
    return { preview: text, isTruncated: false };
  }

  const cut = text.lastIndexOf(' ', maxLength);
  const preview = `${(cut > 80 ? text.slice(0, cut) : text.slice(0, maxLength)).trim()}…`;

  return { preview, isTruncated: true };
}
