import axios from "axios";
import { ENDPOINT } from "../../constants/endpoint";

export const postLogout = async (token: any) => {
  try {
    await axios.post(ENDPOINT.auth.logout, {
      headers: {
       Authorization:
          "Bearer " + token,
      },
    }); 
  } catch (error) {
    console.error('Failed to logout on the server:', error);
  }
}
