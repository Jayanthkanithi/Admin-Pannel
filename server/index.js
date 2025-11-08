require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db"); // PostgreSQL connection

// Middleware
app.use(cors());
app.use(express.json());

// ----------------- AGENCIES ROUTES -----------------

// Create Agency
app.post("/agencies", async (req, res) => {
  try {
    const { name, companyType, status, tenants } = req.body;
    const newAgency = await pool.query(
      "INSERT INTO Agencies (name, companyType, status, tenants) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, companyType, status, tenants]
    );
    res.json(newAgency.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all Agencies
app.get("/agencies", async (req, res) => {
  try {
    const allAgencies = await pool.query("SELECT * FROM Agencies");
    res.json(allAgencies.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get single Agency by id
app.get("/agencies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await pool.query("SELECT * FROM Agencies WHERE id = $1", [
      id,
    ]);
    res.json(agency.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update Agency
app.put("/agencies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, companyType, status, tenants } = req.body;
    await pool.query(
      "UPDATE Agencies SET name = $1, companyType = $2, status = $3, tenants = $4 WHERE id = $5",
      [name, companyType, status, tenants, id]
    );
    res.json("Agency updated successfully");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete Agency
app.delete("/agencies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM Agencies WHERE id = $1", [id]);
    res.json("Agency deleted successfully");
  } catch (err) {
    console.error(err.message);
  }
});

// ----------------- AGENCIES_CHILDS ROUTES -----------------

// Create Child Agency
app.post("/agencies_childs", async (req, res) => {
  try {
    const { name, companyType, status, locations, agency_name } = req.body;
    const newChild = await pool.query(
      "INSERT INTO agencies_childs (name, companyType, status, locations, agency_name) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, companyType, status, locations, agency_name]
    );
    res.json(newChild.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all Child Agencies
app.get("/agencies_childs", async (req, res) => {
  try {
    const allChilds = await pool.query("SELECT * FROM agencies_childs");
    res.json(allChilds.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// ----------------- LOCATIONS ROUTES -----------------

// Create Location
app.post("/locations", async (req, res) => {
  try {
    const { name, code, type, locality, region, country } = req.body;
    const newLocation = await pool.query(
      "INSERT INTO Locations (name, code, type, locality, region, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, code, type, locality, region, country]
    );
    res.json(newLocation.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all Locations
app.get("/locations", async (req, res) => {
  try {
    const allLocations = await pool.query("SELECT * FROM Locations");
    res.json(allLocations.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// ----------------- TENANTS ROUTES -----------------

// Create Tenant
app.post("/tenants", async (req, res) => {
  try {
    const {
      name,
      companyType,
      status,
      accountType,
      email,
      agency,
      agencyId,
      locations,
    } = req.body;
    const newTenant = await pool.query(
      `INSERT INTO Tenants (name, companyType, status, accountType, email, agency, agencyId, locations)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        name,
        companyType,
        status,
        accountType,
        email,
        agency,
        agencyId,
        locations,
      ]
    );
    res.json(newTenant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all Tenants
app.get("/tenants", async (req, res) => {
  try {
    const allTenants = await pool.query("SELECT * FROM Tenants");
    res.json(allTenants.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get single Tenant by id
app.get("/tenants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tenant = await pool.query("SELECT * FROM Tenants WHERE id = $1", [
      id,
    ]);
    res.json(tenant.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update Tenant
app.put("/tenants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      companyType,
      status,
      accountType,
      email,
      agency,
      agencyId,
      locations,
    } = req.body;
    await pool.query(
      `UPDATE Tenants SET name=$1, companyType=$2, status=$3, accountType=$4, email=$5, agency=$6, agencyId=$7, locations=$8
       WHERE id=$9`,
      [
        name,
        companyType,
        status,
        accountType,
        email,
        agency,
        agencyId,
        locations,
        id,
      ]
    );
    res.json("Tenant updated successfully");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete Tenant
app.delete("/tenants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM Tenants WHERE id=$1", [id]);
    res.json("Tenant deleted successfully");
  } catch (err) {
    console.error(err.message);
  }
});

// ----------------- AUTH & DASHBOARD ROUTES -----------------
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

// ----------------- START SERVER -----------------
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
