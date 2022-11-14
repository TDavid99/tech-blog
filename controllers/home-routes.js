const router = require("express").Router();
const { User, Comment, Post} = require("../models");
const sequelize = require("../config/connections")

//homepage post

router.get("/",(req, res)=>{
    console.log(req.session);

    Post.findAll({
        attributes:[
            "id",
            "body",
            "title",
            "createdAt"
        ],
        include: [
            {
            model: Comment,
            attributes:["id", "comment_text", "post_id", "user_id"],
            include:{
            model: User,
            attributes:["username"]
            }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
         .then(dbPostData =>{
            //single post object into homepage template
            const posts = dbPostData.map(post.get({ plain: true}));
           res.render("homepage", {posts, loggedIn: req.session.loggedIn});
         })
         .catch(err => {
            console.log(err);
            res.status(500).json(err);
         });
        });

        //returns to homepage once users logs on
        router.get("/login",(req, res) =>{
            if(req.session.loggedIn) {
                res.redirect("/");
                return;
            }
            res.render(login);
        });
        
        //sign up page 
        router.get("/signup", (req,res) =>{
            res.render("signup");
        });

        // one post to the single post page
        router.get("post/:id" , (req,res)=>{
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
                    attributes:["id", "comment_text", "m,;.'post_id"]
                    }
                ]
            })
        })