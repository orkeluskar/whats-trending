import { getTrending, sendTweet } from "./twitter";
import { getGoogleTrends, getGoogleTrendsV2, getYoutubeTrends } from "./google";
import supabaseClient from "./supabase";
import redditClient from "./reddit";
import SpotifyWebApi from "spotify-web-api-node";
import Spotify from "./spotify";
import netflixClient from "./netflix";
import { testOpenai } from "./openai";

const _spotifyClient = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const spotifyService = new Spotify(_spotifyClient);

export async function saveTrends(tweetTrends = false) {
  const [
    googleTrends,
    youtubeTrends,
    redditTrends,
    spotifyTrends,
    netflixFilmTrends,
    netflixShowTrends,
  ] = await Promise.all([
    getGoogleTrendsV2(),
    getYoutubeTrends(),
    redditClient.getTrendingSearches(),
    spotifyService.getTopTrending({}),
    netflixClient.getTopTenFilms(),
    netflixClient.getTopTenShows(),
  ]);

  // Delete old records
  await supabaseClient
    .from("posts")
    .delete()
    .lte("created_at", new Date().toISOString());

  const { data, error } = await supabaseClient.from("posts").insert([
    ...googleTrends.map((i) => {
      const elem = JSON.parse(JSON.stringify(i));
      delete elem?.articles;
      return elem;
    }),
    ...youtubeTrends,
    ...redditTrends,
    ...spotifyTrends,
    ...netflixFilmTrends,
    ...netflixShowTrends,
  ]);

  if (tweetTrends) {
    const tweets = await testOpenai({
      googleTrends,
      youtubeTrends,
      spotifyTrends,
    });
    await sendTweet(tweets);
  }
  return { data, error };
}
