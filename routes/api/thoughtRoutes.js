const router = require('express').Router();
const {
    getThoughts,
    getSingle,
    updateThought,
    deleteThought,
    createThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController')


router.route('/').get(getThoughts).post(createThought)
router.route('/:thoughtId').get(getSingle).put(updateThought).delete(deleteThought)
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction)
module.exports = router;