const { pool, numeroHash } = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../keys");
const { desEncryptPassword } = require("../middlewares/EncryptPass");

async function Login(req, res) {
  try {
    let { userName, password } = req.body;
    if (!userName)
      return res
        .status(200)
        .json({
          error: true,
          message: "Debe ingresar un usuario o correo electrónico.",
        });
    if (!password)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar la contraseña." });
    let isEmail = userName
      .toLowerCase()
      .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    let userExist;
    if (isEmail) {
      userExist = await pool.query(`SELECT * FROM "Users" WHERE "email" = $1`, [
        userName.toLowerCase(),
      ]);
      if (!userExist.rowCount)
        return res
          .status(200)
          .json({
            error: true,
            message: "El correo electrónico no existe o es incorrecto.",
          });
    } else {
      userExist = await pool.query(
        `SELECT * FROM "Users" WHERE "userName" = $1`,
        [userName.toLowerCase()]
      );
      if (!userExist.rowCount)
        return res
          .status(200)
          .json({
            error: true,
            message: "El usuario no existe o es incorrecto.",
          });
    }
    let userDataDB = userExist.rows[0];
    if (userDataDB.accountBlocking)
      return res
        .status(200)
        .json({
          error: true,
          message: "Su cuenta ha sido suspendida, contacte con el Auditor.",
        });
    let passwordEncrypted;
    await desEncryptPassword(password, userDataDB.password)
      .then((data) => (passwordEncrypted = data))
      .catch((err) => console.log(err));
    if (passwordEncrypted) {
      let getRole = await pool.query(`SELECT * FROM "Role" WHERE "id" = $1`, [
        userDataDB.role,
      ]);
      let roleName = getRole.rows[0].title;
      let user = { id: userDataDB.id, role: userDataDB.role, roleName };
      let token = jwt.sign({ id: userDataDB.id }, SECRET, {
        expiresIn: 86400, // 24 hours
      });
      res
        .status(200)
        .json({
          message: `Bienvenido ${userDataDB.firstName} ${userDataDB.lastName}`,
          token,
          user,
        });
    } else
      return res
        .status(200)
        .json({
          error: true,
          message:
            "La contraseña y/o el usuario ó correo electrónico no coinciden.",
        });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  Login,
};
