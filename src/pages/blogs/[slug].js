import Navbar from 'components/navbar'
import Blog from 'components/blog'
import Newsletter from 'components/newsletter'
import Footer from 'components/footer'
import Banner from 'components/banner'
// third part libraries 
import gql from "graphql-tag";
import apolloClient from 'lib/apolloClient';


const BlogPage = ({post, previewMode}) => {
    return(
        <>
            <Navbar />
            <Banner previewMode={previewMode} />
            <Blog post={post} />
            <Newsletter />
            <Footer />
        </>
    )
}
export default BlogPage;

export const getStaticProps = async (context) => {
    // Blogs Data
    // GQL queries
    const slug = context.params.slug
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
      variables: {slug},
      preview: context.preview,
    })
    const previewMode = context.preview == false || context.preview == null ? "published" : "draft"
    return {
      props: {
        post: blogData.blogs[0],
        previewMode: previewMode
      },
    }

}
export async function getStaticPaths() {
    // Blogs Data
    // GQL queries
    const BLOGS_SLUGS_QUERY = gql`
    query{
      blogs{
        slug
      }
    }
    `
    const { data:blogSlugsData } = await apolloClient.query({
        query: BLOGS_SLUGS_QUERY
      })
    let blogsParams = []
    blogSlugsData.blogs.map(
        slug => blogsParams.push({ params: slug }))
    return {
        paths: blogsParams,
        fallback: false
    };
}
  
  
