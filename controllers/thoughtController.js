const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .populate('reaction')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate('reaction')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
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
            {$set: {reactions: req.body }})
            .then((reaction) => 
            !reaction 
            ? res.status(404).json({message: "No thought with that id"})
            :res.json(reaction))
            .catch((err) => res.json(err))
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: {reaction: req.params.id}})
            .then((reaction) => 
            !reaction 
            ? res.status(404).json({message: "No thought with that id"})
            :res.json(reaction))
            .catch((err) => res.json(err))
    }
}