const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "Jayanth114!",
  host: "localhost",
  port: 5432,
  database: "juvanta",
});
module.exports = pool;
