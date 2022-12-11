const router = require("express").Router();
const { User, Comment, Post } = require("../models");
const sequelize = require("../config/connections");

//homepage post

router.get("/", (req, res) => {
  console.log(res.session);

  Post.findAll({
//     include: [User],
    // attributes:[
    //     "id",
    //     "post_url",
    //     "title",
    //     "createdAt"
    // ],
    // include: [
    //     {
    //     model: Comment,
    //     attributes:["id", "comment_text", "post_url", "user_id"],
    //     include:{
    //     model: User,
    //     attributes:["email"]
    //     }
    //     },
    //     {
    //         model: User,
    //         attributes: ["email"]
    //     }
    // ]
  })
    .then((dbPostData) => {
      //single post object into homepage template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("all-post",
       { posts, 
        loggedIn: req.session.loggedIn 
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//returns to homepage once users logs on
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//sign up page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// one post to the single post page
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_url", "title", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id"],

        include: {
          model: User,
          attributes: ["email"],
        },
      },
      {
        model: User,
        attributes: ["email"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "invaild  id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

