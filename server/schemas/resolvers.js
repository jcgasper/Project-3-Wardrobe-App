const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Article, User } = require('../models');
const { deleteImageFromFirebase } = require('../utils/firebase');

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      // TODO
    },
    articles: async (parent, args, context, info) => {
      // TODO
    },
    article: async (parent, args, context, info) => {
      // TODO
    }
  },
  Mutation: {
    addTempImage: async (parent, { userId, filename }, context, info) => {
      // TODO add authentication check
      const user = await User.findById(userId);
      if (user.tempImageFile) {
        deleteImageFromFirebase(user.tempImageFile);
      }
      user.tempImageFile = filename;
      await user.save();
      return user
    },
    removeTempImage: async (parent, {userId}, context, info) => {
      // TODO add authentication check
      const user = await User.findById(userId);
      if (user.tempImageFile) {
        deleteImageFromFirebase(user.tempImageFile);
      }
      user.tempImageFile = '';
      await user.save();
      return user;
    },
    addArticle: async (parent, args, context, info) => {
      // TODO add authentication check
      const {userId, category, description, tags} = args;
      const user = await User.findById(userId);
      const {tempImageFile} = user;
      const article = await Article.create({
        category,
        description,
        tags,
        imageFile: tempImageFile
      });
      user.tempImageFile = ''
      user.clothing.push(article._id)
      await user.save();
      return article;
    }
  },
};

module.exports = resolvers;