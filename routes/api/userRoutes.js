const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    newUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController')

// api/users
router.route('/users').get(getUsers).post(newUser);
// api single user
router.route('/users/:id').get(getSingleUser).delete(deleteUser).put(updateUser)
// api user friends
router.route('/users/:id/friends').post(addFriend);
router.route('/users/:id/friends/:id').delete(removeFriend);


module.exports = router;