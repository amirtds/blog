import { gql } from "graphql-tag";
import apolloClient from 'lib/apolloClient';


export const getPost = async (slug) => {
    const BLOG_QUERY = gql`
    query($slug: String){
      blogs(where: {slug: $slug}){
        id
        title
        subtitle
        description
        published
        slug
        image{
          url
        }
        author {
          name
          photo {
            url
          }
        }
        content
      }
    }
    `
    const { data:blogData } = await apolloClient.query({
      query: BLOG_QUERY,
      variables: {slug}
    })
    return blogData.blogs[0]
}