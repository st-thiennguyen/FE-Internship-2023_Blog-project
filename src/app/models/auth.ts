export interface Auth {
  accessToken: string | null;
  userInfo: UserInfo;
}

export interface UserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  dob: string;
  picture: string;
  displayName: string;
  [key: string]: any;
}

export interface RegisterProps extends Omit<UserInfo, 'id'> {
  password: string;
  picture: string;
}

export interface AuthState {
  auth: Auth;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
