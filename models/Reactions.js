const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: Schema.Types.String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: Schema.Types.String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
)


module.exports = reactionSchema