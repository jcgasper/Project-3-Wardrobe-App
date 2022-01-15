const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
    url: String
    owner: User
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(userId: ID!): User
    articles(userId: ID!): [Article]
    article(articleId: ID!): Article
    me: User
  }

  type Mutation {
    addTempImage(filename: String!): User
    removeTempImage: User
    addArticle(
      userId: ID!,
      category: ArticleCategory!,
      description: String,
      tags: [String],
      ): Article
    addUser(email: String!, password: String!, displayname: String!): Auth
    login(email: String!, password: String!): Auth
    updateArticle(
      articleId: ID!,
      category: ArticleCategory,
      description: String,
      tags: [String],
      newImage: Boolean
    ): Article
    removeArticle(articleId: ID!): Article
  }
`;

module.exports = typeDefs;