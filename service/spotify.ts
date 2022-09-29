import SpotifyWebApi from 'spotify-web-api-node'

class Spotify {
    spotifyClient: SpotifyWebApi
    accessToken: any;
    constructor() {
        this.spotifyClient = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        })
    }

    async refreshToken() {
        const creds = await this.spotifyClient.clientCredentialsGrant()
        this.accessToken = creds.body.access_token
        this.spotifyClient.setAccessToken(this.accessToken)
    }

    private formatResponse(item: any, index: number) {
        return {
            name: `${item.track.id}_${item.track.name}`,
            volume: `#${index + 1}`,
            source: 5
        }
    }

    public async getTopTrending({
        playListId='37i9dQZEVXbLRQDuF5jeBp' // Top hits US
    }) {
        if (!this.accessToken) {
            await this.refreshToken()
        }
        const { body } = await this.spotifyClient.getPlaylist(playListId, {
            fields: 'tracks.items(track(name,id))'
        })
        return body.tracks.items.map(this.formatResponse)
    }
}

const spotifyClient = new Spotify()

export default spotifyClient
