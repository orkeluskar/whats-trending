import SpotifyWebApi from 'spotify-web-api-node'
import CONSTANTS from '../utils/constants';

export default class Spotify {
    client: SpotifyWebApi
    accessToken: any;
    constructor(client: SpotifyWebApi) {
        this.client = client
    }

    async refreshToken() {
        const creds = await this.client.clientCredentialsGrant()
        this.accessToken = creds.body.access_token
        this.client.setAccessToken(this.accessToken)
    }

    private formatResponse(item: any, index: number) {
        console.log(item)
        return {
            name: `${item.track.id}_${item.track.name}`,
            volume: `#${index + 1}`,
            source: CONSTANTS.SOURCE.SPOTIFY,
            media_url: item.track.album.images[0].url
        }
    }

    public async getTopTrending({
        playListId='37i9dQZEVXbLRQDuF5jeBp' // Top hits US
    }) {
        if (!this.accessToken) {
            await this.refreshToken()
        }
        const { body } = await this.client.getPlaylist(playListId, {
            fields: 'tracks.items(track(name,id,album(images)))'
        })
        return body.tracks.items.map(this.formatResponse)
    }
}
