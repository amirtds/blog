import gql from "graphql-tag";
import apolloClient from 'lib/apolloClient';

export default async function handler(req, res) {
 if (req.query.secret !== (process.env.STRAPI_PREVIEW_SECRET)) {
   return res.status(401).json({ message: "Invalid token" });
 }

 const slug = req.query.slug
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
 if (!blogData.blogs[0]) {
   return res.status(401).json({ message: "Invalid slug" });
 }

 res.setPreviewData({});

 res.writeHead(307, { Location: `/blogs/${req.query.slug}` });
 res.end();
};

// http://localhost:3000/api/preview?secret=GwpRUnwb7otnm2InuPeWGYiUNn0TJ8PK&slug=build-nextjs-blog-with-strapi