import { useMemo } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";
import GoogleLogo from "../../public/google-logo.svg";
import NetflixLogo from "../../public/netflix-logo.svg";
import TikTokLogo from "../../public/tiktok-logo.svg";
import SpotifyLogo from "../../public/spotify-logo.svg";
import Image from "next/image";
import CONSTANTS from "../../utils/constants";

type Post = {
  id: number;
  name: string;
  source: number;
  volume: number;
  post_url: string;
};

const usePostData = (posts: Post[]) => {
  const tabData = [
    {
      icon: <Image height={15} width={15} src={GoogleLogo} alt="Google logo" />,
      alt: "Google logo",
    },
    { icon: <YouTubeIcon sx={{ color: "red" }} />, alt: "YouTube logo" },
    { icon: <RedditIcon sx={{ color: "red" }} />, alt: "Reddit logo" },
    {
      icon: (
        <Image height={15} width={15} src={SpotifyLogo} alt="Spotify logo" />
      ),
      alt: "Spotify logo",
    },
    {
      icon: (
        <Image height={15} width={15} src={NetflixLogo} alt="Netflix logo" />
      ),
      alt: "Netflix logo",
    },
    {
      icon: <Image height={15} width={15} src={TikTokLogo} alt="TikTok logo" />,
      alt: "TikTok logo",
    },
  ];

  const postGroups = useMemo(() => {
    return posts.reduce((acc, post) => {
      (acc[post.source] = acc[post.source] || []).push(post);
      return acc;
    }, {} as Record<number, Post[]>);
  }, [posts]);

  const getURL = (post: Post) => {
    const name = encodeURIComponent(post.name);
    switch (post.source) {
      case CONSTANTS.SOURCE.GOOGLE:
        return `https://trends.google.com/trends/trendingsearches/daily?geo=US#${name}`;
      case CONSTANTS.SOURCE.YOUTUBE:
        return (
          post.post_url ??
          `https://www.youtube.com/results?search_query=${name}`
        );
      case CONSTANTS.SOURCE.REDDIT:
        return `https://www.reddit.com${post.name}`;
      case CONSTANTS.SOURCE.SPOTIFY:
        let trackId = post.name.split("_")[0];
        return `https://open.spotify.com/track/${trackId}`;
      case CONSTANTS.SOURCE.NETFLIX:
        return post.post_url;
      default:
        return "#";
    }
  };

  const getName = (name: string) => {
    let title = name.split("/")[5].replaceAll("_", " ");
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const getTrackName = (name: string) => {
    return name.split("_")[1];
  };

  return {
    postGroups,
    getURL,
    getName,
    getTrackName,
    tabData,
  };
};

export default usePostData;
