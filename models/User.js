const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: Schema.Types.String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})
const User = model('user', userSchema);

module.exports = User