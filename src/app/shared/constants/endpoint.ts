const BASE_URL = process.env.REACT_APP_BASE_API;

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
    google: `${BASE_URL}/${RESOURCES.auth}/google`,
    facebook: `${BASE_URL}/${RESOURCES.auth}/facebook`,
    github: `${BASE_URL}/${RESOURCES.auth}/github`,
    register: `${BASE_URL}/${RESOURCES.users}/register`,
    login: `${BASE_URL}/${RESOURCES.users}/login`,
    logout: `${BASE_URL}/${RESOURCES.users}/logout`,
    reset_password: `${BASE_URL}/${RESOURCES.users}/reset-password`,
    change_password: `${BASE_URL}/${RESOURCES.users}/change-password`,
  },
  bookmark: {
    index: `${BASE_URL}/${RESOURCES.bookmarks}/`,
  },
  post: {
    index: `${BASE_URL}/${RESOURCES.posts}`,
    draft: `${BASE_URL}/${RESOURCES.posts}/draft`,
    public: `${BASE_URL}/${RESOURCES.posts}/public`,
    recommend: `${BASE_URL}/${RESOURCES.posts}/recommend`,
    recyclebin: `${BASE_URL}/${RESOURCES.posts}/recyclebin`,
  },
  users: {
    index: `${BASE_URL}/${RESOURCES.users}`,
    updatePassword: `${BASE_URL}/${RESOURCES.users}/change-password`,
  },
  signatures: {
    index: `${BASE_URL}/${RESOURCES.signatures}`,
  },
  friends: {
    index: `${BASE_URL}/${RESOURCES.friends}`,
  },
};
