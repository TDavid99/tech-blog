const router = require("express").Router();
const {Comment, User , Post } = require("../../models");
const withAuth = require("../../utils/auth");

//Get all comments
router.get("/", async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "title"],
                },
                m
            ]
        })
    }
});
