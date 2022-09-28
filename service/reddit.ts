import axios from "axios"

export class Reddit {
    constructor() {

    }

    private formatResponse (item: any) {
        const data = item.data
        const { subreddit, id, title } = data
        const formattedTitle = title.replaceAll(' ', '_')
        return {
            name: `/r/${subreddit}/comments/${id}/${formattedTitle}`,
            volume: data.score?.toLocaleString(),
            source: 4
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
