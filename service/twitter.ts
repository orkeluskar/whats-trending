import axios from 'axios'
import CONSTANTS from '../utils/constants'

const TWITTER_API_URL = process.env.TWITTER_API_URL
// info: https://developer.twitter.com/en/docs/twitter-api/v1/trends/trends-for-location/api-reference/get-trends-place
const US_WOEID = 23424977

const TWITTER_URLS = {
    trends: '1.1/trends/place.json',
    search: '1.1/search/tweets.json'
}

const baseConfig = {
    headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    }
}

function stripRequiredFields(tweet: any) {
    return {
        name: tweet.name,
        volume: tweet.tweet_volume?.toLocaleString(),
        source: CONSTANTS.SOURCE.TWITTER
    }
}

function removeDuplicatesByProperty<T>(list: T[], property: keyof T): T[] {
    const uniqueItems: T[] = [];
    const uniqueValues = new Set<any>();

    for (const item of list) {
        const value = item[property];
        if (!uniqueValues.has(value)) {
            uniqueItems.push(item);
            uniqueValues.add(value);
        }
    }

    return uniqueItems;
}

function getURL(item: any) {
    return `https://twitter.com/search?q=${item.name}`
}

export async function getTwitterTrends(location = US_WOEID, exclude = false) {
    const url = `${TWITTER_API_URL}/${TWITTER_URLS.trends}`
    const config = {
        ...baseConfig,
        params: {
            id: location,
            exclude
        }
    }
    const { data } = await axios.get(url, config)
    const trends = data[0].trends.map(stripRequiredFields)
    return removeDuplicatesByProperty(trends, 'name')
}

export async function searchTweetsWithMedia(queries: string[]) {

    try {
        const searchPromises = queries.map(async (query) => {

            const url = `${TWITTER_API_URL}/${TWITTER_URLS.search}`
            const q = `${query} filter:images`
            const response = await axios.get(url, {
                ...baseConfig,
                params: {
                    q,
                    count: 1,
                    'result_type': 'popular',
                    'lang': 'en'
                }
            });
            return response.data.statuses[0]?.entities?.media?.at(0);
        });

        const tweets = await Promise.all(searchPromises);
        return tweets.flat();
    } catch (error) {
        console.error('Error searching tweets:', error);
        return []
    }
};

export async function getTrending() {
    const response = await getTwitterTrends();
    const medias = await searchTweetsWithMedia(response.map((i: any) => i.name))
    if (medias.length === 0) return response
    return medias.map((media: any, index) => ({
        ...response[index],
        post_url: media?.expanded_url ?? getURL(response[index]),
        media_url: media?.media_url_https
    }))
}
