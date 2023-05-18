import axios from 'axios'
import CONSTANTS from '../utils/constants'

const TWITTER_API_URL = process.env.TWITTER_API_URL
// info: https://developer.twitter.com/en/docs/twitter-api/v1/trends/trends-for-location/api-reference/get-trends-place
const US_WOEID = 23424977

const TWITTER_URLS = {
    trends: '1.1/trends/place.json'
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
    return data[0].trends.map(stripRequiredFields)
}
