const express = require("express");
const router = express.Router();
const sql = require("mssql");
require("dotenv").config();
const { createSetJson, createSetPatternJson } = require("./controllers/createSet");

const config_PCBUILDER = {
  server: process.env.DB_CONFIG_HOST,
  user: process.env.DB_CONFIG_USER,
  password: process.env.DB_CONFIG_PW,
  database: process.env.DB_PCBUILDER_DATABASE,
  options: {
    TrustServerCertificate: true,
    encrypt: false,
    trustedconnection: true,
    enableArithAbort: true,
  },
};

const connection1 = new sql.ConnectionPool(config_PCBUILDER);
