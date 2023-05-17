const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    newReaction,
    updateThought,
    deleteThought,
    deleteReaction,
    createThought,

} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought)
router.route('/:id').get(getSingleThought).delete(deleteThought).put(updateThought)
router.route('/:id/reactions').post(newReaction)
router.route('/:id/reactions/:reactionId').delete(deleteReaction)

module.exports = router;
