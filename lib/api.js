import client, { previewClient } from "./sanity";
import imageUrlBuilder from '@sanity/image-url';

const blogFields = `
	title,
	subtitle,
	'what we want for api': slug.current,
	date,
	'author': author->{name, 'avatar': avatar.asset->url},
	coverImage,
`

const builder = imageUrlBuilder(client);
const getClient = preview => preview ? previewClient: client;

export function urlFor(source) {
	return builder.image(source);
}

// offset = how many data you want to skip, limit = how many items you want to fetch
export async function getAllBlogs() {
  // const results = await client.fetch(`*[_type == "blog"]{title, subtitle, slug}`);
  const results = await client.fetch(`*[_type == "blog"] | order(_createdAt desc) {${blogFields}}`);
  return results;
}

export async function getPaginatedBlogs({offset = 0, date = 'desc'} = {offset: 0, date: 'desc'}) {
  // const results = await client.fetch(`*[_type == "blog"]{title, subtitle, slug}`);
  const results = await client.fetch(`*[_type == "blog"] | order(_createdAt ${date}) {${blogFields}}[${offset}...${offset + 6}]`);
  return results;
}

export async function getBlogBySlug(slug, preview) {
	const currentClient = getClient(preview);
	const result = await currentClient	
		.fetch(`*[_type == "blog" && slug.current == $slug] {
			${blogFields}
			content[]{..., "asset": asset->}
		}`, {slug}).then(res => preview ? (res?.[1] ? res[1] : res[0]) : res?.[0])
		/*$slug is being replaced by {slug}*/
	
		return result;
}
