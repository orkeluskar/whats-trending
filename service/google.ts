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

export async function getGoogleTrends() {
    const url = process.env.GOOGLE_API_URL || ''
    const { data } = await axios.get<string>(url)
    const response = formatResponse(data)
    return response
}
