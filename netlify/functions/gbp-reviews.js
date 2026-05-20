const MIN_RATING_FALLBACK = 4;
const MAX_REVIEWS = 10;

function getReviewText(review) {
  if (!review || !review.text) return '';
  if (typeof review.text === 'string') return review.text;
  if (typeof review.text.text === 'string') return review.text.text;
  return '';
}

function toIsoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const minRating = Number(process.env.GOOGLE_REVIEWS_MIN_RATING || MIN_RATING_FALLBACK);
  const lang = event.queryStringParameters?.lang === 'en' ? 'en' : 'bg';

  if (!apiKey || !placeId) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Missing Google Places configuration. Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID.',
      }),
    };
  }

  try {
    const endpoint = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=${lang}`;
    const fieldMask = [
      'displayName',
      'googleMapsUri',
      'rating',
      'userRatingCount',
      'reviews',
    ].join(',');

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': fieldMask,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: 'Failed to fetch Google reviews',
          details: errorBody,
        }),
      };
    }

    const place = await response.json();
    const sourceReviews = Array.isArray(place.reviews) ? place.reviews : [];

    const reviews = sourceReviews
      .map((review) => {
        const reviewText = getReviewText(review).trim();
        const authorName = review.authorAttribution?.displayName || '';
        const rating = Number(review.rating || 0);

        return {
          id: review.name || `${authorName}-${review.publishTime || ''}`,
          authorName,
          rating,
          text: reviewText,
          relativePublishTimeDescription: review.relativePublishTimeDescription || '',
          publishTime: toIsoDate(review.publishTime),
          originalUrl:
            review.googleMapsUri ||
            review.authorAttribution?.uri ||
            place.googleMapsUri ||
            null,
        };
      })
      .filter((review) => review.rating >= minRating && review.text && review.originalUrl)
      .sort((a, b) => {
        const aTs = a.publishTime ? Date.parse(a.publishTime) : 0;
        const bTs = b.publishTime ? Date.parse(b.publishTime) : 0;
        return bTs - aTs;
      })
      .slice(0, MAX_REVIEWS);

    return {
      statusCode: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        source: 'google-business-profile',
        placeName: place.displayName?.text || '',
        placeUrl: place.googleMapsUri || null,
        rating: Number(place.rating || 0),
        reviewCount: Number(place.userRatingCount || 0),
        minRating,
        reviews,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Unexpected server error while fetching reviews',
        details: error instanceof Error ? error.message : String(error),
      }),
    };
  }
};
