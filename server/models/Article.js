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
    }
});

const Article = model('Article', articleSchema);
module.exports = Article;