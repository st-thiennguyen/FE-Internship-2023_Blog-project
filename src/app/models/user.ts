export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string;
  displayName: string;
  picture: string;
  isActive: boolean;
  isAdmin: boolean;
  followers: number;
  followings: number;
  verifyAt: string;
}

export interface formChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}
