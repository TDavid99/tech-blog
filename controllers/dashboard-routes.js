const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// post created by logged in users
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      //Id from session
      user_id: req.session.user_id,
    },
    attributes: ["id", "post_url", "title", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id"],
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
      //single post object pass to homepage template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", 
      { Post, loggedIn: 
        req.session.loggedIn
       });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// return user to homepage when they log in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//one post to single post page
router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_url", "title", "createdAt"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "createdAt"],
        includes: {
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
        res.status(404).json({ message: "id not found" });
        return;
      }
      //data
      const post = dbPostData.get({ plain: true });

      // sends data to template
      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', {loggedIn: true});
});

module.exports = router;
