import axios from "axios";
import CONSTANTS from "../utils/constants";

function formatResponse(data: string): any {
  const response = JSON.parse(data.replace(`)]}',\n`, ""));
  return response.default.trendingSearches.map((trend: any) => {
    //console.log(trend);
    return {
      name: trend.title,
      volume: trend.formattedTraffic,
      source: CONSTANTS.SOURCE.GOOGLE,
    };
  });
}

function formatResponseV2(data: string): any {
  const response = JSON.parse(data.replace(`)]}',\n`, ""));
  //console.log(response.default.trendingSearchesDays[0].trendingSearches);
  return response.default.trendingSearchesDays[0].trendingSearches.map(
    (trend: any) => {
      //console.log(trend);
      return {
        name: trend?.title?.query,
        articles: trend?.articles,
        volume: trend.formattedTraffic,
        source: CONSTANTS.SOURCE.GOOGLE,
      };
    }
  );
}

function getVolume(item: any, rank: number) {
  if (item?.statistics?.viewCount) {
    return parseInt(item.statistics.viewCount).toLocaleString();
  }
  return `#${rank}`;
}

function stripRequiredFields(item: any, index: number): any {
  return {
    name: item.snippet.title,
    volume: getVolume(item, index + 1),
    source: CONSTANTS.SOURCE.YOUTUBE,
    media_url: item.snippet.thumbnails.medium.url,
    post_url: `https://www.youtube.com/watch?v=${item.id}`,
  };
}

export async function getGoogleTrends() {
  const url = process.env.GOOGLE_TRENDS_API || "";
  const { data } = await axios.get<string>(url);
  const response = formatResponse(data);
  return response;
}

export async function getGoogleTrendsV2() {
  const url = process.env.GOOGLE_TRENDS_API_V2 || "";
  const { data } = await axios.get<string>(url);
  const response = formatResponseV2(data);
  return response;
}

export async function getYoutubeTrends() {
  const baseUrl = process.env.GOOGLE_API_URL || "";
  const url = `${baseUrl}/youtube/v3/videos`;

  const params = new URLSearchParams();
  params.append("part", "statistics");
  params.append("part", "snippet");
  params.append("chart", "mostPopular");
  params.append("regionCode", "US");
  params.append("maxResults", "50");
  params.append("key", process.env.GOOGLE_API_KEY || "");

  const config = {
    params,
  };

  let { data } = await axios.get(url, config);
  return data.items.map(stripRequiredFields);
}

export async function getYoutubeTopMusicVideos() {
  const baseUrl = process.env.GOOGLE_API_URL || "";
  const url = `${baseUrl}/youtube/v3/playlistItems`;
  const params = new URLSearchParams();
  params.append("part", "snippet");
  params.append("part", "contentDetails");
  params.append("key", process.env.GOOGLE_API_KEY || "");
  params.append("playlistId", "RDCLAK5uy_kmPRjHDECIcuVwnKsx2Ng7fyNgFKWNJFs");
  params.append("maxResults", "50");

  const config = {
    params,
  };

  let { data } = await axios.get(url, config);
  return data.items.map(stripRequiredFields);
}
