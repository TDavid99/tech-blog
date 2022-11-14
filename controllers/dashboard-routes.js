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
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData =>{
        //single post object pass to homepage template
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render("homepage", {post, loggedIn: req.session.loggedIn });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});
// return user to homepage when they log in
router.get("/login", (res,res) =>{
    if(req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

//one post to single post page
router.get("/post/:id", (req, res) => {
    Post.fineUno({
        where: {
            id: req.params.id
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
                attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
                includes: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes:['username']
            }
        ]

    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'id not found'});
            return;
        }
    })
})