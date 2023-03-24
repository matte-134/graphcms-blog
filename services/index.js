import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
    const query = gql`
    query MyQuery {
        postsConnection {
          edges {
            node {
              author {
                bio
                id
                name
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featureImage {
                url
              }
              catergories {
                name
                slug
              }
            }
          }
        }
      }`

const result = await request(graphqlAPI, query)

return result.postsConnection.edges
    }

    export const getPostDetails = async (slug) => {
      const query = gql`
      query GetPostDetials($slug: String!) {
        post(where: { slug: $slug }) {
                author {
                  bio
                  id
                  name
                  photo {
                    url
                  }
                }
                createdAt
                slug
                title
                excerpt
                featureImage {
                  url
                }
                catergories {
                  name
                  slug
                }
                content {
                  raw
                }
              }
            }`
  
  const result = await request(graphqlAPI, query, { slug })
  
  return result.post
      }

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
      title
      featureImage {
        url
      }
      createdAt
      slug
    }
  }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $catergories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: {catergories_some: { slug_in: $catergories}}}
        last: 3
      ) {
        title
        featureImage {
          url
        }
        createdAt
        slug
      }
    }
    `
  const result = await request(graphqlAPI, query, { categories, slug })

  return result.posts
}

export const getCategories = async () => {
  const query = gql`
  query GetCategories {
    catergories {
      name
      slug
    }
  }
  `

  const result = await request(graphqlAPI, query)

  return result.catergories
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj),
  })

  return result.json()
}

export const getComments = async (slug) => {
  const query = gql`
  query GetComments($slug: String!) {
    comments(where: {
      post: { slug: $slug } } ) {
          name
          createdAt
          comment
        }
      }
    `

  const result = await request(graphqlAPI, query, { slug })

  return result.comments
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featureImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};