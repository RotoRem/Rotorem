import fs from 'node:fs';
import path from 'node:path';

const envPath = '.env';

function loadEnv() {
  if (!fs.existsSync(envPath)) {
    throw new Error('.env file was not found.');
  }

  const env = {};
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, '');

    env[key] = value;
  }

  return env;
}

async function getAccessToken(env) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      refresh_token: env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error('Failed to refresh access token.');
  }

  return data.access_token;
}

async function listAccounts(accessToken) {
  const response = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error('Failed to list accounts.');
  }

  return data.accounts || [];
}

async function listLocations(accessToken, accountName) {
  const url = new URL(`https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`);

  url.searchParams.set('readMask', [
    'name',
    'title',
    'metadata',
    'websiteUri',
    'phoneNumbers',
  ].join(','));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(`Failed to list locations for ${accountName}.`);
  }

  return data.locations || [];
}

async function listReviews(accessToken, accountName, locationName) {
  const reviews = [];
  let pageToken = null;

  do {
    const url = new URL(`https://mybusiness.googleapis.com/v4/${accountName}/${locationName}/reviews`);

    url.searchParams.set('pageSize', '50');

    if (pageToken) {
      url.searchParams.set('pageToken', pageToken);
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      throw new Error(`Failed to list reviews for ${accountName}/${locationName}.`);
    }

    reviews.push(...(data.reviews || []));
    pageToken = data.nextPageToken || null;
  } while (pageToken);

  return reviews;
}

function normalizeReview(review) {
  return {
    reviewId: review.reviewId || null,
    reviewer: {
      displayName: review.reviewer?.displayName || null,
      profilePhotoUrl: review.reviewer?.profilePhotoUrl || null,
    },
    starRating: review.starRating || null,
    comment: review.comment || '',
    createTime: review.createTime || null,
    updateTime: review.updateTime || null,
    reviewReply: review.reviewReply
      ? {
          comment: review.reviewReply.comment || '',
          updateTime: review.reviewReply.updateTime || null,
        }
      : null,
    raw: review,
  };
}

const env = loadEnv();

for (const key of ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN']) {
  if (!env[key]) {
    throw new Error(`Missing ${key} in .env`);
  }
}

const accessToken = await getAccessToken(env);
const accounts = await listAccounts(accessToken);

const output = {
  syncedAt: new Date().toISOString(),
  totalReviews: 0,
  accounts: [],
};

for (const account of accounts) {
  const locations = await listLocations(accessToken, account.name);

  const accountOutput = {
    name: account.name,
    accountName: account.accountName,
    type: account.type,
    locations: [],
  };

  for (const location of locations) {
    const reviews = await listReviews(accessToken, account.name, location.name);

    accountOutput.locations.push({
      name: location.name,
      title: location.title,
      placeId: location.metadata?.placeId || null,
      mapsUri: location.metadata?.mapsUri || null,
      newReviewUri: location.metadata?.newReviewUri || null,
      websiteUri: location.websiteUri || null,
      phone: location.phoneNumbers?.primaryPhone || null,
      totalReviews: reviews.length,
      reviews: reviews.map(normalizeReview),
    });

    output.totalReviews += reviews.length;
  }

  output.accounts.push(accountOutput);
}

const outputPath = path.join('src', 'data', 'google-reviews.json');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf8');

console.log(`Saved ${output.totalReviews} reviews to ${outputPath}`);
console.log(JSON.stringify(output, null, 2));