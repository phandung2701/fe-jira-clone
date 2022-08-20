export const getUserList = async (axios) => {
  const userList = await axios.get('/auth');
  return userList.data;
};
