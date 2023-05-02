import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'


/**
 * Queries the page to Regenerate it incrementally.
 * currently for every 30 mins
 * @param _req 
 * @param res 
 */
export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    const url = axios.get(process.env.API_URL as string)
    res.status(200).end(`Site Regenerated successfully by querying ${process.env.API_URL}`);
}
