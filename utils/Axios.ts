import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

type AxiosResponseExtended<T = any, D = any> = AxiosResponse<T, D> & {
    error?: AxiosError<T>
}

class AxiosWrapper {
    ok = 200
    constructor() { }

    get<T = any, R = AxiosResponseExtended<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    async get(url: string, config = {}) {
        const { data, status } = await axios.get(url, config)
        const error = {
            message: `${url} failed for config: ${JSON.stringify(config)}.`
        }
        if (status !== this.ok) {
            console.error(error, data)
            return {
                data,
                error
            }
        }

        return { data }
    }
}

const Axios = new AxiosWrapper()

export default Axios
