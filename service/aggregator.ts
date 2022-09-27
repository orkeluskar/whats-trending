import { getTwitterTrends } from './twitter'
import { getGoogleTrends } from './google'
import supabaseClient from './supabase'

export async function saveTrends() {
    const twitterTrends = await getTwitterTrends()
    const googleTrends = await getGoogleTrends()

    // Delete old records
    await supabaseClient
        .from('posts')
        .delete()
        .lte('created_at', new Date().toISOString())

    const { data, error } = await supabaseClient
        .from('posts')
        .insert([
            ...twitterTrends,
            ...googleTrends
        ])

    return { data, error }
}
