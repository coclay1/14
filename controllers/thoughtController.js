const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {username: req.body.username},
                {$addToSet: {thoughts: thought._id}}
            )
        })
        .then((user) => 
        !user?res.status(404).json({message: 'Thought Created but no User Found'})
        :res.json('Created a Thought'))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          })
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.id})
        .then((thought) =>
        !thought 
        ? res.status(404).json({message: 'No thought with that id'})
        : res.json('Deleted Thought!'))
    },
    newReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet: {reactions: req.body }})
            .then((reaction) => 
            !reaction 
            ? res.status(404).json({message: "No thought with that id"})
            :res.json(reaction))
            .catch((err) => res.json(err))
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: {reactions: {reactionId: req.params.reactionId}}})
            .then((reaction) => 
            !reaction 
            ? res.status(404).json({message: "No thought with that id"})
            :res.json(reaction))
            .catch((err) => res.json(err))
    }
}