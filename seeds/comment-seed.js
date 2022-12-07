const {Comment} = require("../models");

const commentdata = [
  {
    body: "Aliquam erat volutpat. In congue.",
    userId: 1,
    postId: 1,
  },
  {
    body: "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    user_id: 2,
    post_id: 1
  },
  {
    body: "In hac habitasse platea dictumst.",
    user_id: 3,
    post_id: 1
  },
  {
    body: "Vivamus vestibulum sagittis sapien.",
    user_id: 4,
    post_id: 2
  },
  {
    body: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_id: 5,
    post_id: 2
  },
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;