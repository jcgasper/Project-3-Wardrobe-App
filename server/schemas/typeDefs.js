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
  }

  type Query {
    user(userId: ID!): User
    articles(userId: ID!): [Article]
    article(articleId: ID!): Article
  }

  type Mutation {
    addTempImage(userId: ID!, filename: String!): User
    removeTempImage(userId: ID!): User
    addArticle(
      userId: ID!,
      category: ArticleCategory!,
      description: String,
      tags: [String],
      ): Article
  }
`;

// TODO probably need mutations for: adding users, updating articles, removing/updating images in existing articles?

module.exports = typeDefs;