const jwt = require("jsonwebtoken");
const { SECRET } = require("../keys");
const { pool, numeroHash } = require("../database");

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token)
    return res.status(403).json({ message: "No hay token para validar" });
  const { userId } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET);
    // let userIds = decoded.id;
    // const user = await User.findById(req.userId, { password: 0 });
    const user = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [
      userId,
    ]);
    if (!user)
      return res.status(404).json({ message: "Usuario no Encontrado" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado para entrar!" });
  }
};

const isModerator = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const valUser = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [
      userId,
    ]);
    let user = valUser.rows[0];
    const valRol = await pool.query(`SELECT * FROM "Role" WHERE id = $1`, [
      user.role,
    ]);
    let Roles = valRol.rows[0];
    if (valUser.rows.length > 0) {
      if (Roles.role !== "moderator")
        return res
          .status(403)
          .json({ message: "Requiere el Rol de moderador!" });
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Requiere un usuario que este registrado" });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const isAdmin = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const valUser = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [
      userId,
    ]);
    let user = valUser.rows[0];
    const valRol = await pool.query(`SELECT * FROM "Role" WHERE id = $1`, [
      user.role,
    ]);
    let Roles = valRol.rows[0];
    if (valUser.rows.length > 0) {
      if (Roles.title !== "admin")
        return res
          .status(403)
          .json({ message: "Requiere el Rol de Administrador!" });
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Requiere un usuario que este registrado" });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const isVendor = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const valUser = await pool.query(`SELECT * FROM "Users" WHERE id = $1`, [
      userId,
    ]);
    let user = valUser.rows[0];
    const valRol = await pool.query(`SELECT * FROM "Role" WHERE id = $1`, [
      user.role,
    ]);
    let Roles = valRol.rows[0];
    if (valUser.rows.length > 0) {
      if (Roles.role !== "vendor") {
        if (Roles.title !== "moderator") {
          if (Roles.title !== "admin")
            return res
              .status(403)
              .json({ message: "Requiere el Rol de Vendedor!" });
        }
      }
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Requiere un usuario que este registrado" });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

module.exports = {
  verifyToken,
  isModerator,
  isAdmin,
  isVendor,
};
