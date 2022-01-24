const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    category: {
        type: String,
        enum: ['Outerwear','Top','Bottom','Footwear','Accessory'],
        required: 'Please select a valid category.'
    },
    description: {
        type: String
    },
    tags: [{
        type: String
    }],
    imageFile: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lastWorn: {
        type: Date
    },
    wearings: [{
        type: Date
    }],
    dateAcquired: {
        type: Date
    }
});

const Article = model('Article', articleSchema);
module.exports = Article;