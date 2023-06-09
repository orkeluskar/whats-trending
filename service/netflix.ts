import Axios from "../utils/Axios";
import CONSTANTS from "../utils/constants";

export class Netflix {
  baseUrl = process.env.NETFLIX_API_URL;
  constructor() {}

  formatResponse({ data }: { data: DataType }, type: string) {
    if (data.weeklyCountryRanks) {
      return data.weeklyCountryRanks.map((item, index) => ({
        name: item.name,
        source: CONSTANTS.SOURCE.NETFLIX,
        volume: `#${index + 1}`,

        media_url: data.weeklyBoxartUrls[item.id].vertical,
        post_url: `https://www.netflix.com/watch/${item.id}`,
        type,
      }));
    }
    return [];
  }

  public async getTopTenFilms() {
    const url = `${this.baseUrl}/films.json`;
    const { data, error } = await Axios.get<WeeklyTopTenResponse>(url);
    if (data) return this.formatResponse(data.pageProps, "film");
    return [];
  }

  public async getTopTenShows() {
    const url = `${this.baseUrl}/tv.json`;
    const { data, error } = await Axios.get<WeeklyTopTenResponse>(url);
    if (data) return this.formatResponse(data.pageProps, "tv");
    return [];
  }
}

type WeeklyTopTenItem = {
  showId: string;
  id: string;
  week: string;
  rank: number;
  weeksInTopTen: number;
  country: string;
  category: string;
  name: string;
  showName: string;
  seasonName: string;
};

type WeeklyCountryRankItem = {
  vertical: string;
  id: string;
  showId: string;
  name: string;
  showName: string;
  seasonName: string;
  countries: string[];
  countriesAtNumberOne: string[];
};

type WeeklyBoxartUrls = {
  cid: string;
  id: string;
  iso: string;
  horizontal: string;
  horizontalWebP: string;
  horizontalSmall: string;
  horizontalSmallWebP: string;
  vertical: string;
  art: string;
  logo: string;
};

type mostPopularItem = {
  vertical: WeeklyBoxartUrls;
  showId: string;
  id: string;
  category: string;
  hours: number;
  rank: number;
  name: string;
  showName: string;
  seasonName: string;
};

type DataType = {
  mostPopuplar: mostPopularItem[];
  weeklyTopTen: WeeklyTopTenItem[];
  weeklyCountryRanks: WeeklyCountryRankItem[];
  weeklyBoxartUrls: {
    [key: string]: WeeklyBoxartUrls;
  };
};

type WeeklyTopTenResponse = {
  pageProps: {
    data: DataType;
  };
};

const netflixClient = new Netflix();

export default netflixClient;
