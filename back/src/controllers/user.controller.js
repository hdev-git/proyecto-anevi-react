const { pool, numeroHash } = require("../database");
const { encryptPassword } = require("../middlewares/EncryptPass");

/* Métodos para obtener información */

async function getUsers(req, res) {
  try {
    let users = await pool.query(`SELECT * FROM "Users"`);
    let sellersList = [];
    users.rows.map((user) => {
      let {
        id,
        firstName,
        lastName,
        userName,
        email,
        role,
        accountBlocking = false,
        reasonBlocking,
        dateBlocking,
      } = user;
      let fullName = `${firstName} ${lastName}`;
      if (role < 3) {
        sellersList.push({
          id,
          firstName,
          userName,
          lastName,
          email,
          role,
          fullName,
          accountBlocking,
          reasonBlocking,
          dateBlocking,
        });
      }
    });
    res.status(200).json(sellersList);
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(req, res) {
  try {
    let id = parseInt(req.body.id);
    let userData = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [
      id,
    ]);
    if (userData.rowCount) {
      delete userData.rows[0].password;
      let getRoles = await pool.query(`SELECT * FROM "Role"`);
      let roles = {};
      getRoles.rows.map((rol) => (roles[rol.id] = rol.title));
      return res
        .status(200)
        .json({ ...userData.rows[0], rolName: roles[userData.rows[0].role] });
    } else
      return res.status(200).json({
        error: true,
        message: "Lo sentimos no se pudo obtener la información.",
      });
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                             CREACION DE USARIOS                            */
/* -------------------------------------------------------------------------- */

async function createUser(req, res) {
  try {
    let { firstName, lastName, userName, email, password, rePassword, role } =
      req.body;

    if (userName && email) {
      let existUser = await pool.query(
        `SELECT * FROM "Users" WHERE "userName" = $1 OR "email" = $2`,
        [userName.toLowerCase(), email.toLowerCase()]
      );
      if (existUser.rowCount)
        return res
          .status(200)
          .json({
            error: true,
            message:
              "El usuario ó el correo electrónico ya se encuentran registrados.",
          });
    } else
      return res
        .status(200)
        .json({
          error: true,
          message: "Debe ingresar el usuario y el correo electrónico.",
        });

    let isValidEmail = email
      .toLowerCase()
      .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    if (!firstName)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar el nombre." });
    if (!lastName)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar el apellido." });
    if (!isValidEmail)
      return res
        .status(200)
        .json({ error: true, message: "No ha ingresado un email válido." });
    if (!password)
      return res
        .status(200)
        .json({ error: true, message: "Debe ingresar la contraseña." });
    if (password !== rePassword)
      return res
        .status(200)
        .json({ error: true, message: "Las contraseñas no coinciden." });
    if (role >= 3) return res.status(200).json({ error: true });

    let passwordEncrypted;
    await encryptPassword(password)
      .then((passwordEncrypt) => {
        passwordEncrypted = passwordEncrypt;
        console.log("Encriptado exitoso");
      })
      .catch((err) => console.log(err));

    firstName = firstName.toUpperCase();
    lastName = lastName.toUpperCase();
    let dateCreation = new Date();

    await pool.query(
      `INSERT INTO "Users" 
      ("userName",  "email",  "password",  "firstName",  "lastName", "role",  "dateCreate",  "dateBlocking",  "accountBlocking",  "reasonBlocking") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        userName.toLowerCase(),
        email.toLowerCase(),
        passwordEncrypted,
        firstName,
        lastName,
        role,
        dateCreation,
        null,
        false,
        null,
      ]
    );
    res.status(200).json({
      message: "Se ha creado la cuenta de forma exitosa.",
    });
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                   Actualización de la información del usuario              */
/* -------------------------------------------------------------------------- */
async function updateUser(req, res) {
  try {
    let id = parseInt(req.params.id);
    let existUserData = await pool.query(
      `SELECT * FROM "Users" WHERE "id" = $1`,
      [id]
    );
    if (existUserData.rowCount) {
      let dataUser = existUserData.rows[0];
      let { firstName, lastName, userName, email, role, password, rePassword } =
        req.body;
      if (password) {
        if (password === rePassword) {
          await encryptPassword(password)
            .then((passwordEncrypt) => {
              password = passwordEncrypt;
            })
            .catch((err) => console.log(err));
        } else {
          return res.status(200).json({
            error: true,
            message: "Las contraseñas no coinciden, no se pudo actualizar.",
          });
        }
      } else password = dataUser.password;
      await pool.query(
        `UPDATE "Users" 
            SET "firstName" = $1, "lastName" = $2, "userName" = $3, "email" = $4, "role" = $5, "password" = $6
            WHERE "id" = $7`,
        [firstName, lastName, userName, email, role, password, id]
      );
      return res
        .status(200)
        .json({ message: "La información ha sido actualizada." });
    } else
      return res.status(200).json({
        error: true,
        message: "Lo sentimos no se pudo actualizar la información.",
      });
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------------------------------------------------- */
/*                        SISTEMA DE BLOQUEO DE CUENTA                        */
/* -------------------------------------------------------------------------- */

async function accountBlocking(req, res) {
  try {
    let id = parseInt(req.params.id);
    let userInfo = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [
      id,
    ]);
    if (!userInfo.rowCount)
      return res.status(400).json({
        error: true,
        message: "El usuario a bloquear no existe o no esta registrado",
      });
    let accountBlocking = !userInfo.rows[0].accountBlocking;

    await pool.query(
      `UPDATE "Users" 
      SET "accountBlocking" = $1
      WHERE "id" = $2`,
      [accountBlocking, id]
    );

    res.status(200).json({
      error: accountBlocking ? true : false,
      message: `El usuario ${userInfo.rows[0].userName} ha sido ${
        accountBlocking ? "suspendido" : "activado"
      } con éxito`,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  accountBlocking,
};
