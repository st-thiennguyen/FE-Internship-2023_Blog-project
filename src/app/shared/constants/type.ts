export const ACTIONS_TYPE = {
  // GET ALL POST
  GET_ALL_POST: 'get-all-post',
  GET_ALL_POST_SUCCESS: 'get-all-post-success',
  GET_ALL_POST_FAILURE: 'get-all-post-failure',
  RESET_CURRENT_PAGE: 'reset-current-page',
  // GET ALL POST WITH TAG
  GET_POSTS: 'get-posts',
  GET_POSTS_SUCCESS: 'get-posts-success',
  GET_POSTS_FAILURE: 'get-posts-failure',
  RESET_CURRENT_PAGE_POST_WITH_TAG: 'reset-current-page-post-with-tag',

  // GET ALL POST FROM RECYCLEBIN
  GET_RECYCLEBIN: 'get-recyclebin',
  GET_RECYCLEBIN_SUCCESS: 'get-recyclebin-success',
  GET_RECYCLEBIN_FAILURE: 'get-recyclebin-failure',

  // GET ALL POST FROM RECYCLEBIN
  RESTORE_RECYCLEBIN: 'restore-recyclebin',
  RESTORE_RECYCLEBIN_SUCCESS: 'restore-recyclebin-success',
  RESTORE_RECYCLEBIN_FAILURE: 'restore-recyclebin-failure',

  // GET DETAIL BLOG
  GET_DETAIL_BLOG: 'get-detail-blog',
  GET_DETAIL_BLOG_SUCCESS: 'get-detail-blog-success',
  GET_DETAIL_BLOG_FAILURE: 'get-detail-blog-failure',
  // REGISTER
  REGISTER: 'register',
  REGISTER_SUCCESS: 'register-success',
  REGISTER_FAILURE: 'register-failure',
  REGISTER_RESET_STATE: 'register-reset-state',
  // LOGIN
  LOGIN: 'login',
  LOGIN_SUCCESS: 'login-success',
  LOGIN_FAILURE: 'login-failure',
  REASSIGNMENT_AUTH: 'reassignment-auth',
  // LOGOUT
  LOGOUT: 'logout',
  LOGOUT_SUCCESS: 'logout-success',
  LOGOUT_FAILURE: 'logout-failure',
  // CHANGE PASSWORD
  CHANGE_PASSWORD: 'change-password',
  CHANGE_PASSWORD_SUCCESS: 'change-password-success',
  CHANGE_PASSWORD_FAILURE: 'change-password-failure',
  // GET BOOKMARK
  GET_BOOKMARK: 'get-bookmark',
  GET_BOOKMARK_SUCCESS: 'get-bookmark-success',
  GET_BOOKMARK_FAILURE: 'get-bookmark-failure',
  // ADD BOOKMARK
  ADD_BOOKMARK: 'add-bookmark',
  ADD_BOOKMARK_SUCCESS: 'add-bookmark-success',
  ADD_BOOKMARK_FAILURE: 'add-bookmark-failure',
  // GET FOLLOWER
  GET_FOLLOWER: 'get-follower',
  GET_FOLLOWER_SUCCESS: 'get-follower-success',
  GET_FOLLOWER_FAILURE: 'get-follower-failure',
  // GET FOLLOWING
  GET_FOLLOWING: 'get-following',
  GET_FOLLOWING_SUCCESS: 'get-following-success',
  GET_FOLLOWING_FAILURE: 'get-following-failure',
  // UPDATE FOLLOW
  UPDATE_FOLLOW: 'update-follow',
  UPDATE_FOLLOW_SUCCESS: 'update-follow-success',
  UPDATE_FOLLOW_FAILURE: 'update-follow-failure',
  // GET PROFILE
  GET_PROFILE: 'get-profile',
  GET_PROFILE_SUCCESS: 'get-profile-success',
  GET_PROFILE_FAILURE: 'get-profile-failure',
  // UPDATE PROFILE
  UPDATE_PROFILE: 'update-profile',
  UPDATE_PROFILE_SUCCESS: 'update-profile-success',
  UPDATE_PROFILE_FAILURE: 'update-profile-failure',
  // UPDATE AVATAR
  UPDATE_AVATAR: 'update-avatar',
  UPDATE_AVATAR_SUCCESS: 'update-avatar-success',
  UPDATE_AVATAR_FAILURE: 'update-avatar-failure',
  // UPDATE PASSWORD
  UPDATE_PASSWORD: 'update-password',
  UPDATE_PASSWORD_SUCCESS: 'update-password-success',
  UPDATE_PASSWORD_FAILURE: 'update-password-failure',
  // GET USER INFO
  GET_USER_INFO: 'get-user-info',
  GET_USER_INFO_SUCCESS: 'get-user-info-success',
  GET_USER_INFO_FAILURE: 'get-user-info-failure',
  //  GET POST OF USER ID
  GET_USER_POST: 'get-user-post',
  GET_USER_POST_SUCCESS: 'get-user-post-success',
  GET_USER_POST_FAILURE: 'get-user-post-failure',
  // GET ALL USER
  GET_USERS: 'get-users',
  GET_USERS_SUCCESS: 'get-users-success',
  GET_USERS_FAILURE: 'get-users-failure',
  // LOADMORE POST
  LOAD_MORE_PUBLIC_POST: 'load-more-public-post',
  // WRITE POST // RESIZE URL IMAGE POST
  GET_SIGN_URL_IMAGE_POST: 'get-sign-image-post',
  GET_SIGN_URL_IMAGE_POST_SUCCESS: 'get-sign-image-post-success',
  GET_SIGN_URL_IMAGE_POST_FAILURE: 'get-sign-image-post-failure',
  // ADD POST
  ADD_POST: 'add-post',
  ADD_POST_SUCCESS: 'add-post-success',
  ADD_POST_FAILURE: 'add-post-failure',
  // UPDATE POST
  UPDATE_POST: 'update-post',
  UPDATE_POST_SUCCESS: 'update-post-success',
  UPDATE_POST_FAILURE: 'update-post-failure',
  LOAD_MORE_POST_WITH_TAGS: 'load-more-post-with-tags',
  // GET RECOMMEND POSTS
  GET_RECOMMEND: 'get-recommend',
  GET_RECOMMEND_SUCCESS: 'get-recommend-success',
  GET_RECOMMEND_FAILURE: 'get-recommend-failure',
  // REMOVE POST ITEM
  REMOVE_POST_ITEM: 'remove-post-item',
  REMOVE_POST_ITEM_SUCCESS: 'remove-post-item-success',
  REMOVE_POST_ITEM_FAILURE: 'remove-post-item-failure',
  // UPDATE LIKE
  UPDATE_LIKE: 'update-like',
  UPDATE_LIKE_SUCCESS: 'update-like-success',
  UPDATE_LIKE_FAILURE: 'update-like-failure',
  // GET POST COMMENTS
  GET_COMMENTS: 'get-comments',
  GET_COMMENTS_SUCCESS: 'get-comments-success',
  GET_COMMENTS_FAILURE: 'get-comments-failure',
  // POST COMMENT
  POST_COMMENT: 'post-comment',
  POST_COMMENT_SUCCESS: 'post-comment-success',
  POST_COMMENT_FAILURE: 'post-comment-failure',
  // Get Recycle Bin
  GET_RECYCLE_BIN: 'get-recycle-bin',
  GET_RECYCLE_BIN_SUCCESS: 'get-recycle-bin-success',
  GET_RECYCLE_BIN_FAILURE: 'get-recycle-bin-failure',

  // TOAST MESSAGE
  SHOW_TOAST: 'show-toast',
  CLOSE_TOAST: 'close-toast',
};
