const {Comment} = require("../models");

const commentdata = [
    {
    Comment: 'Aliquam erat volutpat. In congue.',
    user_id: 1,
    post_id: 1
  },
  {
    Comment: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    user_id: 2,
    post_id: 1
  },
  {
    Comment: 'In hac habitasse platea dictumst.',
    user_id: 3,
    post_id: 1
  },
  {
    Comment: 'Vivamus vestibulum sagittis sapien.',
    user_id: 4,
    post_id: 2
  },
  {
    Comment: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
    user_id: 5,
    post_id: 2
  },
  
];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;