const router = require("express").Router();
const {post, User, Comment} = require("../models");
const sequelize = require("../config/connections")

//homepage post

router.get("/",(req, res)=>{
    console.log()
})
