# CTO Growth Blog Content

This repository contains the blog content for the CTO Growth Blog. The content is managed as a git submodule in the main blog repository.

## Content Structure

All blog posts are written in Markdown (.md) or MDX (.mdx) format with frontmatter metadata.

## Frontmatter Schema

Each blog post must include the following frontmatter:

```yaml
---
title: "Your Post Title"
description: "A brief description of your post"
pubDate: 2024-01-15
updatedDate: 2024-01-20  # Optional
heroImage: ./path/to/image.jpg  # Optional
draft: true  # Set to false or remove to publish
---
```

### Draft Posts

- Set `draft: true` to keep posts as drafts
- Draft posts are visible in development and preview environments
- Draft posts are hidden in production
- Remove `draft: true` or set to `false` to publish

## Contributing

1. Create a new branch for your post
2. Add your markdown file with proper frontmatter
3. Set `draft: true` initially
4. Submit a pull request for review
5. Once approved, remove `draft: true` to publish

## File Naming

- Use kebab-case for filenames: `my-blog-post.md`
- Include the date in the filename for organization: `2024-01-15-my-blog-post.md`

## Images

- Place images in the same directory as your post
- Reference them in frontmatter as `./image-name.jpg`
- Use descriptive filenames

## Publishing Workflow

1. **Draft**: Post with `draft: true` - visible in dev/preview
2. **Review**: Create PR for review
3. **Publish**: Remove `draft: true` and merge PR
4. **Live**: Post appears on production site

## Environment Behavior

- **Development**: All posts visible (including drafts)
- **Preview/Staging**: All posts visible (including drafts)
- **Production**: Only published posts visible (drafts hidden)
