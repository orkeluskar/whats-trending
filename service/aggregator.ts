import { getTwitterTrends } from "./twitter";
import { getGoogleTrends, getYoutubeTrends } from "./google";
import supabaseClient from "./supabase";
import redditClient from "./reddit";
import spotifyClient from "./spotify";

export async function saveTrends() {
  const [
    twitterTrends,
    googleTrends,
    youtubeTrends,
    redditTrends,
    spotifyTrends,
  ] = await Promise.all([
    getTwitterTrends(),
    getGoogleTrends(),
    getYoutubeTrends(),
    redditClient.getTrendingSearches(),
    spotifyClient.getTopTrending({}),
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
    ]);

  return { data, error };
}
