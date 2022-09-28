import { getTwitterTrends } from './twitter'
import { getGoogleTrends, getYoutubeTrends } from './google'
import supabaseClient from './supabase'
import redditClient from './reddit';

export async function saveTrends() {
    const [twitterTrends, googleTrends, youtubeTrends, redditTrends] = await Promise.all([
      getTwitterTrends(),
      getGoogleTrends(),
      getYoutubeTrends(),
      redditClient.getTrendingSearches()
    ]);


    // Delete old records
    await supabaseClient
        .from('posts')
        .delete()
        .lte('created_at', new Date().toISOString())

    const { data, error } = await supabaseClient
        .from('posts')
        .insert([
            ...twitterTrends,
            ...googleTrends,
            ...youtubeTrends,
            ...redditTrends
        ])

    return { data, error }
}
