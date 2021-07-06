import Navbar from 'components/navbar'
import Blogs from 'components/blogs'
import Newsletter from 'components/newsletter'
import Footer from 'components/footer'
// Third part libs
import gql from "graphql-tag";
import apolloClient from 'lib/apolloClient';

export default function Home({posts}) {
  return (
    <>
      <Navbar />
      <Blogs posts={posts}/>
      <Newsletter />
      <Footer />
    </>
  )
}
export const getStaticProps = async () => {
  // GQL queries
  const BLOGS_QUERY = gql`
  query{
    blogs{
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
  // Blogs Data
  const { data:blogsData } = await apolloClient.query({
    query: BLOGS_QUERY
  })
  return {
    props: {
      posts: blogsData.blogs.length > 0 ? blogsData.blogs : null
    }
  }

}