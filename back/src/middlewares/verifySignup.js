const { pool, numeroHash } = require("../database");

const checkExistingUser = async (req, res, next) => {
  try {
    const userFound = await pool.query(
      `SELECT * FROM Users WHERE userName = $1`,
      [req.body.userName]
    );
    if (userFound)
      return res
        .status(400)
        .json({ message: "Este usuario ya esta registrado" });

    const email = await pool.query(`SELECT * FROM Users WHERE userName = $1`, [
      req.body.email,
    ]);
    if (email)
      return res.status(400).json({ message: "Este email ya esta registrado" });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkExistingRole = async (req, res, next) => {
  const roleFound = await pool.query(
    `SELECT * FROM Users WHERE userName = $1`,
    [req.body.roles]
  );
  if (roleFound) return res.status(400).json({ message: "No roles" });

  for (let i = 0; i < req.body.roles.length; i++) {
    if (!ROLES.includes(req.body.roles[i])) {
      return res.status(400).json({
        message: `Role ${req.body.roles[i]} does not exist`,
      });
    }
  }

  next();
};

module.exports = {
  checkExistingRole,
  checkExistingUser,
};
