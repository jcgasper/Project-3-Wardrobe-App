const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Article, User } = require('../models');
const { deleteImageFromFirebase } = require('../utils/firebase');
const { dateScalar } = require('./customScalars');

const resolvers = {
  Query: {
    user: async (parent, { userId }, context, info) => {
      return await User.findById(userId);
    },
    articles: async (parent, { userId }, context, info) => {
      const { clothing } = await User.findById(userId).populate('clothing');
      return clothing;
    },
    article: async (parent, { articleId }, context, info) => {
      return await Article.findById(articleId);
    },
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      return await User.findById(context.user._id);
    },
    categories: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const clothes = await Article.find({ owner: context.user._id });

      let categories = [
        { category: 'Top', clothing: [] },
        { category: 'Bottom', clothing: [] },
        { category: 'Outerwear', clothing: [] },
        { category: 'Footwear', clothing: [] },
        { category: 'Accessory', clothing: [] },
      ]

      clothes.forEach(article => {
        switch (article.category) {
          case 'Top': categories[0].clothing.push(article);
            break;
          case 'Bottom': categories[1].clothing.push(article);
            break;
          case 'Outerwear': categories[2].clothing.push(article);
            break;
          case 'Footwear': categories[3].clothing.push(article);
            break;
          case 'Accessory': categories[4].clothing.push(article);
            break;
          default: return;
        }
      });

      categories = categories.filter(el => el.clothing.length > 0);

      return categories;
    },
  },
  User: {
    clothing: async (parent) => {
      return await Article.find({ _id: { $in: (parent.clothing) } });
    }
  },
  Article: {
    owner: async (parent) => {
      return await User.findById(parent.owner);
    }
  },
  Date: dateScalar,
  Mutation: {
    addTempImage: async (parent, { filename }, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findById(context.user._id);
      if (user.tempImageFile) {
        deleteImageFromFirebase(user.tempImageFile);
      }
      user.tempImageFile = filename;
      await user.save();
      return user;
    },
    removeTempImage: async (parent, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findById(context.user._id);
      if (user.tempImageFile) {
        deleteImageFromFirebase(user.tempImageFile);
      }
      user.tempImageFile = '';
      await user.save();
      return user;

    },
    addArticle: async (parent, { category, description, tags, dateAcquired }, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const user = await User.findById(context.user._id);
      const { tempImageFile } = user;
      const article = await Article.create({
        category,
        description,
        tags,
        imageFile: tempImageFile,
        owner: context.user._id,
        dateAcquired
      });
      user.tempImageFile = ''
      user.clothing.push(article._id)
      await user.save();
      return article;
    },
    addUser: async (parent, args, info) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }, info) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Unable to locate user with that email/password');
      }

      const pwCheck = await user.isCorrectPassword(password);

      if (!pwCheck) {
        throw new AuthenticationError('Unable to locate user with that email/password');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateArticle: async (parent, { articleId, imageAction = 'none', ...newArticleData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      // const [user, article] = await Promise.all([User.findById(context.user._id), Article.findById(articleId)]);
      const article = await Article.findById(articleId).populate('owner');
      const user = article.owner;

      if (article.owner.id !== context.user._id) {
        throw new AuthenticationError('That item does not belong to you!');
      }

      if (imageAction === 'update') {
        deleteImageFromFirebase(article.imageFile);
        article.imageFile = user.tempImageFile;
        user.tempImageFile = '';
      } else if (imageAction === 'delete') {
        deleteImageFromFirebase(article.imageFile);
        article.imageFile = '';
      }

      article.category = newArticleData?.category ?? article.category;
      article.tags = newArticleData?.tags ?? article.tags;
      article.description = newArticleData?.description ?? article.description;
      article.dateAcquired = newArticleData?.dateAcquired ?? article.dateAcquired;
      // TODO check if there is a better way with atomic transaction enforcement
      await Promise.all([user.save(), article.save()]);
      return article;
    },
    removeArticle: async (parent, { articleId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const article = await Article.findById(articleId).populate('owner');
      if (article.owner.id !== context.user._id) {
        throw new AuthenticationError(`That item does not belong to you!`);
      }

      if (article.imageFile) deleteImageFromFirebase(article.imageFile);

      // TODO check if there is a better way with atomic transaction enforcement
      await Promise.all([
        User.findByIdAndUpdate(context.user._id, { $pull: { clothing: articleId } }),
        Article.findByIdAndDelete(articleId)
      ]);
      return article;
    },
    wearArticle: async (parent, { articleId, wearDate }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      
      const article = await Article.findById(articleId).populate('owner');

      if (article.owner.id !== context.user._id) {
        throw new AuthenticationError('That item does not belong to you!');
      }

      if (!article.wearingLog) {
        article.wearingLog = [];
      }

      article.lastWorn = wearDate;
      article.wearingLog.unshift(wearDate);
      await article.save();
      return article;
    }
  },
};

module.exports = resolvers;