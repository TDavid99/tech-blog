const router = require ("express").Router();
const { User, Post} = require("../../models");
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
                attributes:["id", "comment", "createdAt"],
                include: {
                    model:Post,
                    attributes: ["title"],
                },
            },
        ],
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
router.post("/", async (req, res) =>{
    try{
     const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
     });
     
})
// router.post("/", async (req, res) => {
//     try{
//         const newUser
//     }
// })