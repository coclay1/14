const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    newReaction,
    updateThought,
    deleteThought,
    deleteReaction,

    
} = require('../../controllers/thoughtController')

router.route('/').get(getThoughts)
router.route('/:id').get(getSingleThought).delete(deleteThought).put(updateThought)
router.route('/:id/reactions/:id').delete(deleteReaction).put(newReaction)

module.exports = router;
