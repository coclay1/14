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
router.route('/').get(getUsers).post(newUser);
// api single user
router.route('/:id').get(getSingleUser).delete(deleteUser).put(updateUser)
// api user friends
router.route('/:id/friends').post(addFriend);
router.route('/:id/friends/:id').delete(removeFriend);


module.exports = router;