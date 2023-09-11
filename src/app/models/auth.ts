export interface Auth {
  accessToken: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  displayName: string;
}
