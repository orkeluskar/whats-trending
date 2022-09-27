import { getTwitterTrends } from './twitter'
import { getGoogleTrends, getYoutubeTrends } from './google'
import supabaseClient from './supabase'

export async function saveTrends() {
    const [twitterTrends, googleTrends, youtubeTrends] = await Promise.all([
      getTwitterTrends(),
      getGoogleTrends(),
      getYoutubeTrends()
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
            ...youtubeTrends
        ])

    return { data, error }
}
