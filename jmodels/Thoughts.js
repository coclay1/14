const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reactions')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: Schema.Types.String,
            required: true,
            maxLength: 280,
            minLength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },
        username: {
            type: Schema.Types.String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought