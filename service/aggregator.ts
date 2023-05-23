import { getTrending } from "./twitter";
import { getGoogleTrends, getYoutubeTrends } from "./google";
import supabaseClient from "./supabase";
import redditClient from "./reddit";
import SpotifyWebApi from 'spotify-web-api-node'
import Spotify from "./spotify";
import netflixClient from "./netflix";

const _spotifyClient = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET
})

const spotifyService = new Spotify(_spotifyClient)

export async function saveTrends() {
  const [
    twitterTrends,
    googleTrends,
    youtubeTrends,
    redditTrends,
    spotifyTrends,
    netflixFilmTrends,
    netflixShowTrends
  ] = await Promise.all([
    getTrending(),
    getGoogleTrends(),
    getYoutubeTrends(),
    redditClient.getTrendingSearches(),
    spotifyService.getTopTrending({}),
    netflixClient.getTopTenFilms(),
    netflixClient.getTopTenShows()
  ]);

  // Delete old records
  await supabaseClient
    .from("posts")
    .delete()
    .lte("created_at", new Date().toISOString());

  const { data, error } = await supabaseClient
    .from("posts")
    .insert([
      ...twitterTrends,
      ...googleTrends,
      ...youtubeTrends,
      ...redditTrends,
      ...spotifyTrends,
      ...netflixFilmTrends,
      ...netflixShowTrends
    ]);

  return { data, error };
}
