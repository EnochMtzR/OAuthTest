const fs = require("fs");

fs.rmdirSync("./debug", { recursive: true });
fs.rmdirSync("./dist", { recursive: true });
