const path = require("path");
const express = require("express");
const helpers = require("./utils/helpers");
const session = require("express-session");

const app = express();

const PORT = process.env.PORT || 3001;

const sequelize = require("./config/config");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secrect: "",
    Cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

