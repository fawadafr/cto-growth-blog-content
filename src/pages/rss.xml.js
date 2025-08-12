import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	// Filter posts based on environment: show drafts in dev/preview, hide in production
	const posts = await getCollection('blog', ({ data }) => {
		// In production, hide drafts. In dev/preview, show everything
		return import.meta.env.PROD ? !data.draft : true;
	});
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
