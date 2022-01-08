const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: 'An email is required'
    },
    displayname: {
        type: String,
        required: 'Please include a display name'
    },
    password: {
        type: String,
        required: 'please enter a password'
    },
    clothing: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
});

const User = model('User', userSchema);

module.exports = User;