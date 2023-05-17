import Axios from "../utils/Axios";

export class Netflix {
    constructor() {

    }

    formatResponse({ data } : { data: DataType}) {
        if (data.weeklyCountryRanks) {
            const weeklyCountryRanks = data.weeklyCountryRanks.map(item => {
                item.vertical = data.weeklyBoxartUrls[item.id].vertical
                return item
            });
            return {
                data: weeklyCountryRanks
            } 
        }
        return {
            data: []
        } 
    }

    public async getTopTenFilms() {
        const url = `https://top10.netflix.com/_next/data/ua8sHU6xqsMihYXnnjqbh/united-states/films.json`
        const { data, error } = await Axios.get<WeeklyTopTenResponse>(url)
        if (error) return { data: [] }
        return this.formatResponse(data.pageProps);
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
        data: DataType
    }
}

const netflixClient = new Netflix()

export default netflixClient
