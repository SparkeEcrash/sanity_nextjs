import { getBlogBySlug } from 'lib/api';

export default async function enablePreview(req, res) {

	if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET) {
		return res.status(401).json({message: "Invalid token"})
	}

	const blog = await getBlogBySlug(req.query.slug);

	if (!blog) {
		return res.status(401).json({message: "Invalid slug"})
	}

	// setPreviewData will set cookies into your browser
	// __prerender_bypass __next_preview_data
	res.setPreviewData({message: 'This is Preview Mode from preview.js under api folder'});
	// 'This is Preview Mode' from message can be retrieved in [slug] where the function getStaticProps is
	res.writeHead(307, { Location: `/blogs/${blog["what we want for api"]}`})
	res.end();
}