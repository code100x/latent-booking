import axios2 from "axios"
export const axios = {
    async post<T = any, R = axios2.AxiosResponse<T>, D = any>(url: string, data?: D, config?: axios2.AxiosRequestConfig<D>): Promise<any> {
        try {
            const res = await axios2.post(url, data, config)
            return res
        } catch(e: any) {
            return e.response
        }
    },
    get: async (...args: any) => {
        try {
            const res = await axios2.get(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    put: async (...args: any) => {
        try {
            const res = await axios2.put(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
    delete: async (...args: any) => {
        try {
            const res = await axios2.delete(...args)
            return res
        } catch(e) {
            return e.response
        }
    },
}