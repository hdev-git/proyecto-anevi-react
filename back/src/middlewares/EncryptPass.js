const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  let passwordEncrypt = await bcrypt.hash(password, salt);
  return passwordEncrypt;
};

const desEncryptPassword = async (password, receivedPassword) => {
  let passwordEncrypt = await bcrypt.compare(password, receivedPassword);
  return passwordEncrypt;
};

module.exports = {
  encryptPassword,
  desEncryptPassword,
};
