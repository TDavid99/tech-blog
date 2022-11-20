const router = require ("express").Router();
const { User, Post, Comment} = require("../../models");
const withAuth = require("../../utils/auth");


/// GET api routes
router.get("/", (req, res)=> {
    User.findAll({
        attributes: {exclude: ["password"]}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//single user By id

router.get("/.:id", (req, res) => {
    User.findOne({
        attributes: {exclude: ["password"]},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes:["Id", "title", "body", "createdAt"]
            },
            //model comment
            {
                model: Comment,
                attributes:["id", "comment_text", "createdAt"],
                include: {
                    model: Post,
                    attributes: ["title"]
                }
            }
        ]
    })
.then(dbUserData => {
    if(!dbUserData) {
        res.status(404).json({message: "invaild user id"});
        return;
    }
    res.json(dbUserData);
})
.catch(err =>{
    console.log(err);
    res.status(500).json(err);
});

});
// add new user
router.post("/", (req, res) =>{
      User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
     })
     .then(dbUserData => {
         req.session.save(() => {

             req.session.user_id = dbUserData.id;
             req.session.username = dbUserData.username;
             req.session.loggedIn = true;
             
             res.json(dbUserData);
            });
        });
     });
// log in for  users 
router.post("/login", (req, res) => {
    //expects emails 
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({message: "invaild user name!"});
            return;
        }
        //verify user
        const vaildPassword = dbUserData.checkPassword(req.body.password);

        if (!vaildPassword) {
            res.status(400).json({message:"incorrect password!"});
            return;
        }
        req.session.save(() => {
            //declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({user: dbUserData, message: "your logged in."});
        });
    });
});

router.post ("/logout", withAuth, (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();   
        });
        } else{
            res.status(404).end;
        }

});
//Update a user
 router.put("/:id", withAuth, (req,res) =>{
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({message: "invaild user id"});
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

    //delete user 

    router.delete("/:id", withAuth, (req, res) => {
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message:"invaild user id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
    module.exports = router;
 
