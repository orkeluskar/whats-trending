// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { saveTrends } from '../../service/aggregator';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Any>
) {
  const response = await saveTrends()
  res.status(200).json(response);
}
