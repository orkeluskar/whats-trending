import OpenAI from "openai";
import CONSTANTS from "../utils/constants";

const openai = new OpenAI();

export async function testOpenai({
  googleTrends,
  youtubeTrends,
  spotifyTrends,
}: {
  googleTrends: any[];
  youtubeTrends: any[];
  spotifyTrends: any[];
}) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Here are sources for social medias ${CONSTANTS.SOURCE}`,
      },
      {
        role: "user",
        content: `Here are top Google posts: ${JSON.stringify(
          googleTrends.slice(0, 5)
        )}`,
      },
      {
        role: "user",
        content: `Here are top Youtube posts: ${JSON.stringify(
          youtubeTrends.slice(0, 5)
        )}`,
      },
      {
        role: "user",
        content: `Here are top Spotify songs: ${JSON.stringify(
          spotifyTrends.slice(0, 5)
        )}`,
      },
      {
        role: "user",
        content: `
          Write a crafty tweet thread to garner most attention for the trending posts.
          Group posts by categories: Sports, Celebrity, Music, World News etc.
          Explain each tweet in thread with 250 characters.
          Add the link to https://trendzy.app in the last thread.
          Generate a JSON response something like tweets: string[], where each tweet is a string.
          No links in the first tweet and keep the first tweet like a TL;DR (too long didnt read) or a summary with 280 characters.
          Rest of the tweets can have links and images, if any.
          Include hashtags wherever possible.
          Ignore any previous context in response.`,
      },
    ],
    response_format: {
      type: "json_object",
    },
    model: "gpt-4o",
  });

  const res = JSON.parse(completion.choices[0].message.content as string);
  console.log(res);
  return res;
}
