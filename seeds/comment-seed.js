const {Comment} = require("../models");

const commentdata = [
  {
    comment_text: "Aliquam erat volutpat. In congue.",
    userId: 1,
    postId: 1,
  },
  {
    comment_text: "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    user_id: 2,
    post_id: 1
  },
  {
    comment_text: "In hac habitasse platea dictumst.",
    user_id: 3,
    post_id: 1
  },
  {
    comment_text: "Vivamus vestibulum sagittis sapien.",
    user_id: 4,
    post_id: 2
  },
  {
    comment_text: "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    user_id: 5,
    post_id: 2
  },
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;