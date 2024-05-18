import OpenAI from "openai";
import CONSTANTS from "../utils/constants";

const openai = new OpenAI();

export async function testOpenai({
  googleTrends,
  youtubeTrends,
  spotifyTrends,
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
        role: "assistant",
        content: "What are my duties?",
      },
      {
        role: "user",
        content: `Write a crafty tweet thread to highlight the
          top trending posts. Also can you add the link to https://trendzy.app
          in the last thread? Generate a JSON response.
          Dont have any links in the first tweet and keep it like a TL;DR (too long didnt read). Rest
          of the tweets can have links, if any. Ignore any previous context in response`,
      },
    ],
    response_format: {
      type: "json_object",
    },
    model: "gpt-4-turbo",
  });

  const res = JSON.parse(completion.choices[0].message.content as string);
  console.log(res);
  return res;
}
