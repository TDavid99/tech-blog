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

//single user ny id

router.get("/.:id", (req, res) => {
    User.findOne({
        attributes: {exclude: ["password"]},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes
            }
        ]
    })
})
// router.post("/", async (req, res) => {
//     try{
//         const newUser
//     }
// })