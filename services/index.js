import {request, gql} from "graphql-request"

const graphqlAPI = "https://api-us-east-1.graphcms.com/v2/ckxw1s5w50iua01web4m10xh0/master";

export const getPosts = async () => {
    const query = gql `
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                ... on Author {
                  bio
                  id
                  name
                  photo {
                    url
                  }
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              category {
                name
                slug
              }
            }
          }
        }
      }
      
    `

    const results = await request(graphqlAPI, query)

    return results.postsConnection.edges;
}

export const getPostDetail = async (slug) => {
  const query = gql `
  query GetPostDetails($slug: String!) {
      post(where: {slug: $slug}){
            author {
              ... on Author {
                bio
                id
                name
                photo {
                  url
                }
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
            content {
              raw
            }
          }
        }
    
  `

  const results = await request(graphqlAPI,query, {slug})

  return results.post;
}

export const getRecentPosts = async () => {
    const query = gql `
        query getPostDetails() {
            posts (
                orderBy: createdAt_ASC
                last: 3
            ){
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const results = await request(graphqlAPI, query)

    return results.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql `
        query getPostDetails($slug: String!, $categories: [String!]){
            posts(
                where:{slug_not: $slug, AND: {category_some:{slug_in: $categories} }}
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query, {categories, slug})

    return result.posts;
}

export const getCategories = async () => {
    const query = gql `
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `

    const result = await request(graphqlAPI, query)

    return result.categories;
}

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj)
  });

  return result.json();
}

export const getComments = async (slug) => {
  const query = gql `
    query GetComments($slug: String!){
      comments(where: {post: {slug: $slug}}){
        name
        createdAt
        comment
      }
    }
  `

  const result = await request(graphqlAPI, query, {slug})

  return result;
}

export const getFeaturedPosts = async () => {
  const query = gql `
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          ... on Author {
            name
            photo {
              url
            }
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.posts
}

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {category_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              ... on Author {
                id
                name
                bio
                photo {
                  url
                }
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            category {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};
