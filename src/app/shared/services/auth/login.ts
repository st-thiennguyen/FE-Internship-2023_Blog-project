import axios from "axios";
import { ENDPOINT } from "../../constants/endpoint";

export const fetchAuthLogin = (email: string, password: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const response = await axios.post(ENDPOINT.auth.login, { email, password });
      resolve(response.data);
    } catch (error: any) {
      reject(error);
    }
  })
}
