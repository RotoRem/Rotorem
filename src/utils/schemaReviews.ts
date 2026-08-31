import reviewsData from '../data/google-reviews.json';
import { getLocalizedReviewComment } from './googleReviews';

const STAR_RATING_MAP: Record<string, string> = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
};

type StoredGoogleReview = {
  reviewId: string;
  reviewer: { displayName: string };
  starRating: string;
  comment: string;
  createTime: string;
};

function getEligibleGoogleReviews(): StoredGoogleReview[] {
  return reviewsData.accounts
    .flatMap((account) => account.locations)
    .flatMap((location) => location.reviews)
    .filter(
      (review) =>
        ['FOUR', 'FIVE'].includes(review.starRating) &&
        Boolean(review.comment?.trim())
    );
}

export function buildAggregateRating(): Record<string, string> {
  return {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: String(reviewsData.totalReviews),
    bestRating: '5',
    worstRating: '1',
  };
}

export function buildSchemaReviews(
  lang: 'bg' | 'en' = 'bg',
  limit = 5
): Array<Record<string, unknown>> {
  return getEligibleGoogleReviews()
    .slice(0, limit)
    .map((review) => ({
      '@type': 'Review',
      '@id': `https://www.rotorem.bg/#review-${review.reviewId}`,
      author: {
        '@type': 'Person',
        name: review.reviewer.displayName,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: STAR_RATING_MAP[review.starRating] ?? '5',
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: getLocalizedReviewComment(review.comment, lang),
      datePublished: review.createTime.split('T')[0],
    }));
}
