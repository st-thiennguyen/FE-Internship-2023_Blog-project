const RESOURCES = {
  users: 'users',
  auth: 'auth',
  bookmarks: 'bookmarks',
  friends: 'friends',
  posts: 'posts',
  signatures: 'signatures',
};

export const ENDPOINT = {
  auth: {
    google: `/${RESOURCES.auth}/google`,
    facebook: `/${RESOURCES.auth}/facebook`,
    github: `/${RESOURCES.auth}/github`,
    register: `/${RESOURCES.users}/register`,
    login: `/${RESOURCES.users}/login`,
    logout: `/${RESOURCES.users}/logout`,
    reset_password: `/${RESOURCES.users}/reset-password`,
    change_password: `/${RESOURCES.users}/change-password`,
  },
  bookmark: {
    index: `/${RESOURCES.bookmarks}/`,
  },
};
