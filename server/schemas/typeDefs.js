const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    email: String
    displayname: String
    password: String
    tempImageFile: String
    clothing: [Article]!
  }

  enum ArticleCategory {
    Top
    Bottom
    Outerwear
    Footwear
    Accessory
  }

  type Article {
    _id: ID
    category: ArticleCategory
    description: String
    tags: [String]!
    imageFile: String
    owner: User
    lastWorn: Date
    wearings: [Date]
    dateAcquired: Date
  }

  type Auth {
    token: ID
    user: User
  }

  enum ImageAction {
    none
    update
    delete
  }
  
  type Category {
    category: ArticleCategory
    clothing: [Article]
  }

  type Query {
    user(userId: ID!): User
    articles(userId: ID!): [Article]
    article(articleId: ID!): Article
    me: User
    categories: [Category]
  }

  type Mutation {
    addTempImage(filename: String!): User
    removeTempImage: User
    addArticle(
      category: ArticleCategory!,
      description: String,
      tags: [String],
      dateAcquired: Date
      ): Article
    addUser(email: String!, password: String!, displayname: String!): Auth
    login(email: String!, password: String!): Auth
    updateArticle(
      articleId: ID!,
      category: ArticleCategory,
      description: String,
      tags: [String],
      dateAcquired: Date,
      imageAction: ImageAction
    ): Article
    addWearing(
      articleId: ID!,
      wearDate: Date!
    ): Article
    removeArticle(articleId: ID!): Article
  }
`;

module.exports = typeDefs;