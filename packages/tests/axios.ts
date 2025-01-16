import axios2 from "axios";
export const axios = {
  post: async (...args: Parameters<typeof axios2.post>): Promise<any> => {
    try {
      const res = await axios2.post(...args);
      return res;
    } catch (e: any) {
      return e.response;
    }
  },
  get: async (...args: Parameters<typeof axios2.get>): Promise<any> => {
    try {
      const res = await axios2.get(...args);
      return res;
    } catch (e: any) {
      return e.response;
    }
  },
  put: async (...args: Parameters<typeof axios2.put>): Promise<any> => {
    try {
      const res = await axios2.put(...args);
      return res;
    } catch (e: any) {
      return e.response;
    }
  },
  delete: async (...args: Parameters<typeof axios2.delete>): Promise<any> => {
    try {
      const res = await axios2.delete(...args);
      return res;
    } catch (e: any) {
      return e.response;
    }
  },
};
