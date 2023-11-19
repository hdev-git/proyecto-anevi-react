const { app } = require("./src/app");
require("./src/database.js");
const { PORT } = require("./src/keys");

app.listen(PORT);
console.log("Server on port", app.get("port"));
