export const getUserList = async (axios) => {
  const userList = await axios.get('/auth');
  const arr = [];
  if (userList) {
    userList.data.forEach((user) => {
      arr.push({
        id: user.id,
        name: user.email.split('@')[0],
        color: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
          Math.random() * 255
        )},${Math.floor(Math.random() * 255)})`,
        icon: 'bx bxl-discord-alt',
      });
    });
  }
  return arr;
};
