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

function getVolume(item: any, rank: number) {
    if (item?.statistics?.viewCount) {
        return parseInt(item.statistics.viewCount).toLocaleString()
    }
    return `#${rank}`
}

function stripRequiredFields(item: any, index: number): any {
    return {
        name: item.snippet.title,
        volume: getVolume(item, index + 1),
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
    
    const params = new URLSearchParams()
    params.append('part', 'statistics')
    params.append('part', 'snippet')
    params.append('chart', 'mostPopular')
    params.append('regionCode', 'US')
    params.append('maxResults', '50')
    params.append('key', process.env.GOOGLE_API_KEY || '')

    const config = {
        params
    }

    let { data } = await axios.get(url, config)
    return data.items.map(stripRequiredFields)
}

export async function getYoutubeTopMusicVideos() {
    const baseUrl = process.env.GOOGLE_API_URL || ''
    const url = `${baseUrl}/youtube/v3/playlistItems`
    const params = new URLSearchParams()
    params.append('part', 'snippet')
    params.append('part', 'contentDetails')
    params.append('key', process.env.GOOGLE_API_KEY || '')
    params.append('playlistId', 'RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs')
    params.append('maxResults', '50')

    const config = {
        params
    }

    let { data } = await axios.get(url, config)
    return data.items.map(stripRequiredFields)
}
