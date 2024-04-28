import makeRequest from "./makeRequest";

const getPosts = async (config = {}) => {
  config.url = "/posts";

  const response = await makeRequest(config);

  return response.data;
};

const mutatePost = async (postId, updatedPost, config = {}) => {
  config.url = `/posts/${postId}`;
  config.method = "PUT";
  config.data = updatedPost;

  const response = await makeRequest(config);
  return response.data;
};

const addPost = async (newPost, config = {}) => {
  config.url = `/posts`;
  config.method = "POST";
  config.data = newPost;

  const response = await makeRequest(config);
  return response.data;
};

const deletePost = async (postId, config = {}) => {
  config.url = `/posts/${postId}`;
  config.method = "DELETE";

  const response = await makeRequest(config);
  return response.data;
};

//////////////////////////////////////////////

const getUsers = async (config = {}) => {
  config.url = "/users";

  const response = await makeRequest(config);
  return response.data;
};
const addUser = async (newUser, config = {}) => {
  config.url = "/users";
  config.method = "POST";
  config.data = newUser;

  const response = await makeRequest(config);
  return response.data;
};
const deleteUser = async (userId, config = {}) => {
  config.url = `/users/${userId}`;
  config.method = "DELETE";

  const response = await makeRequest(config);
  return response.data;
};

const mutateUser = async (userId, updatedUser, config = {}) => {
  config.url = `/users/${userId}`;
  config.method = "PUT";
  config.data = updatedUser;

  const response = await makeRequest(config);
  return response.data;
};

/////////////////////////////////////////////////

const api = {
  getPosts,
  addPost,
  mutatePost,
  deletePost,
  getUsers,
  mutateUser,
  deleteUser,
  addUser,
};

export default api;
