import instance from '@api/axios';

export const auth = {
  async login(url, id) {
    try {
      const data = await instance({ url: url, id: id });
      return data;
    }
    catch (err) {
      throw err;
    }
  }
}