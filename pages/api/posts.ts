// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import supabaseClient from '../../service/supabase'
import { definitions } from '../../types/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<definitions['posts'][]>
) {
  const { data } = await supabaseClient.from<definitions['posts']>('posts').select('*')
  res.status(200).json(data!)
}
