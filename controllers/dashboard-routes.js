const router = require('express').Router();
const {Post, User, Comment} = require("../models");
const withAuth = require("../utils/auth");

// post created by logged in users
router.get("/", withAuth, (req,res)=>{
    Post.findAll({
        where: {
            //Id from session
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "body",
            "title",
            "createdAt"
        ],
        include: [
            {
                model: Comment,
                attributes: ["id", "comment_text", "user_id", "createdAt"],
                include: {
                    model: User,
                attributes: ["username"]
                }
            },
            {
                model: User,
                attributes
            }
        ]
    })
})