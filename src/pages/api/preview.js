import { getPost } from 'lib/api'

export default async function handler(req, res) {
 if (req.query.secret !== (process.env.STRAPI_PREVIEW_SECRET)) {
   return res.status(401).json({ message: "Invalid token" });
 }

 const slug = req.query.slug
 const blogData = await getPost(slug)
 if (!blogData) {
   return res.status(401).json({ message: "Invalid slug" });
 }

 res.setPreviewData({});

 res.writeHead(307, { Location: `/blogs/${slug}` });
 res.end();
};