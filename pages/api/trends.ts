// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { saveTrends } from "../../service/aggregator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const response = await saveTrends();
    res.status(200).json(response);
  } catch (e) {
    console.error(e);
    res.status(200).json({ error: e });
  }
}
