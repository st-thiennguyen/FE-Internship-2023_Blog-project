import axios from "axios";
import { ENDPOINT } from "../../constants/endpoint";
import { getLocalStorage } from "../../utils";
import { StorageKey } from "../../constants";

export const postLogout = async (token: any) => {
  try {
    await axios.post(ENDPOINT.auth.logout, {
      headers: {
       Authorization:
          "Bearer " + token,
      },
    }); // Replace with your logout endpoint
  } catch (error) {
    console.error('Failed to logout on the server:', error);
  }
}
