const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email: {
        type: String,
        required: 'An email is required.'
    },
    displayname: {
        type: String,
        required: 'Please include a display name.'
    },
    password: {
        type: String,
        required: 'Please enter a password.'
    },
    tempImageFile: {
        type: String
    },
    clothing: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Article'
        }
    ]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;