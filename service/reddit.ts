import axios from "axios"
import CONSTANTS from "../utils/constants"

export class Reddit {
    constructor() {

    }

    private formatResponse (item: any) {
        const data = item.data
        const { subreddit, id, title, thumbnail } = data
        const formattedTitle = title.replaceAll(' ', '_')
        const media_url = !thumbnail?.includes('http') || thumbnail?.includes('external-preview.redd.it') ? null : thumbnail

        return {
            name: `/r/${subreddit}/comments/${id}/${formattedTitle}`,
            volume: data.score?.toLocaleString(),
            source: CONSTANTS.SOURCE.REDDIT,
            media_url
        }
    }

    public async getTrendingSearches() {
        const url = `${process.env.REDDIT_API_URL}/r/popular/hot`
        const config = {
            params: {
                geo_filter: 'US'
            }
        }

        const { data } = await axios.get(url, config)
        return data?.data?.children?.map(this.formatResponse)
    }
}

const redditClient = new Reddit()

export default redditClient
