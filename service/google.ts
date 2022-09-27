import axios from 'axios'

function formatResponse(data: string): any {
    const response = JSON.parse(data.replace(`)]}',\n`, ''))
    return response.default.trendingSearches.map((trend: any) => {
        return {
            name: trend.title,
            volume: trend.formattedTraffic,
            source: 2
        }
    })
}

function stripRequiredFields(item: any): any {
    return {
        name: item.snippet.title,
        volume: parseInt(item.statistics.viewCount).toLocaleString(),
        source: 3
    }
}

export async function getGoogleTrends() {
    const url = process.env.GOOGLE_TRENDS_API || ''
    const { data } = await axios.get<string>(url)
    const response = formatResponse(data)
    return response
}

export async function getYoutubeTrends() {
    const baseUrl = process.env.GOOGLE_API_URL || ''
    const url = `${baseUrl}/youtube/v3/videos`
    
    const params = new URLSearchParams();
    params.append('part', 'statistics');
    params.append('part', 'snippet');
    params.append('chart', 'mostPopular')
    params.append('regionCode', 'US')
    params.append('key', process.env.GOOGLE_API_KEY || '')
    params.append('pageToken', '')

    const config = {
        params
    }

    let { data } = await axios.get(url, config)
    let result = [...data.items]

    if (data.nextPageToken) {
        config.params.set('pageToken', data.nextPageToken)
        const resp = await axios.get(url, config)
        result = [...result, ...resp.data.items]
    }

    return result.map(stripRequiredFields)
}
