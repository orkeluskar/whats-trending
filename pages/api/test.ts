// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import netflixClient from '../../service/netflix'


export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await netflixClient.getTopTenFilms()
  res.status(200).json(data)
}
