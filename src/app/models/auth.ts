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

export interface AuthStateProps {
  auth: Auth;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
