# Draft Posts System Documentation

## Overview

This implementation adds a draft system to the CTO Growth Blog using frontmatter-based draft flags and a git submodule for content management. Draft posts are visible in development and preview environments but hidden in production.

## Architecture

### Content Repository Structure
```
cto-growth-blog-private/ (Main private repo)
├── src/content/blog/ (Git submodule)
│   ├── published-post.md (draft: false)
│   ├── draft-post-1.md (draft: true)
│   └── draft-post-2.md (draft: true)
└── ... (other files)

cto-growth-blog-content/ (Public content repo)
├── README.md
├── published-post.md
├── draft-post-1.md
└── draft-post-2.md
```

### Environment Behavior

| Environment | Draft Posts | Published Posts | Use Case |
|-------------|-------------|-----------------|----------|
| Development | ✅ Visible | ✅ Visible | Local development |
| Preview/Staging | ✅ Visible | ✅ Visible | Review and testing |
| Production | ❌ Hidden | ✅ Visible | Live site |

## Implementation Details

### 1. Content Schema Update

**File**: `src/content.config.ts`
```typescript
schema: ({ image }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    draft: z.boolean().default(false), // Added draft field
  }),
```

### 2. Blog Index Filtering

**File**: `src/pages/blog/index.astro`
```typescript
// Filter posts based on environment
const allPosts = await getCollection('blog', ({ data }) => {
  // In production, hide drafts. In dev/preview, show everything
  return import.meta.env.PROD ? !data.draft : true;
});
```

### 3. RSS Feed Filtering

**File**: `src/pages/rss.xml.js`
```typescript
const posts = await getCollection('blog', ({ data }) => {
  return import.meta.env.PROD ? !data.draft : true;
});
```

### 4. Vercel Configuration

**File**: `vercel.json`
```json
{
  "buildCommand": "git submodule update --init --recursive && pnpm build"
}
```

## Usage

### Creating a Draft Post

1. Add a new markdown file to the content repository
2. Include `draft: true` in the frontmatter:

```markdown
---
title: "Your Post Title"
description: "Post description"
pubDate: 2024-01-15
draft: true
---

# Your content here
```

### Publishing a Draft

1. Remove `draft: true` or set `draft: false`
2. Commit and push to the content repository
3. Update the submodule in the main repository:

```bash
cd src/content/blog
git pull origin main
cd ../..
git add src/content/blog
git commit -m "Update blog content"
```

### Local Development

```bash
# Clone with submodules
git clone --recurse-submodules <repository-url>

# Or initialize submodules after cloning
git submodule update --init --recursive

# Start development server
pnpm dev
```

## Workflow

### For Content Contributors

1. **Fork** the content repository
2. **Create** a new branch for your post
3. **Write** your post with `draft: true`
4. **Submit** a pull request
5. **Review** using the preview URL
6. **Publish** by removing `draft: true`

### For Repository Maintainers

1. **Review** pull requests in the content repository
2. **Merge** approved changes
3. **Update** the submodule in the main repository
4. **Deploy** to staging/production

## Testing

### Test Posts Created

1. **Published Post**: `published-post.md` (draft: false)
   - Should appear in all environments
   - Title: "Building High-Performance Engineering Teams"

2. **Draft Post 1**: `draft-post-1.md` (draft: true)
   - Should appear in dev/preview, hidden in production
   - Title: "The Future of Remote Engineering Teams"

3. **Draft Post 2**: `draft-post-2.md` (draft: true)
   - Should appear in dev/preview, hidden in production
   - Title: "Technical Leadership: From Engineer to CTO"

### Testing Checklist

- [ ] Development environment shows all posts (including drafts)
- [ ] Preview environment shows all posts (including drafts)
- [ ] Production environment hides draft posts
- [ ] RSS feed excludes drafts in production
- [ ] Sitemap excludes drafts in production
- [ ] Submodule updates work correctly
- [ ] Vercel deployment handles submodules

## Benefits

### ✅ Advantages

1. **Simple Implementation**: Minimal code changes required
2. **Astro Native**: Uses built-in content collection features
3. **Git-Native**: Standard git workflows for content management
4. **Environment Aware**: Automatic filtering based on deployment environment
5. **Future-Proof**: No custom code that could break with Astro updates
6. **Public Contributions**: Content can be contributed via public repository
7. **Clear Separation**: Content and code are properly separated

### ⚠️ Considerations

1. **Draft Visibility**: Drafts are visible in the public repository source (but not rendered)
2. **Submodule Complexity**: Contributors need to understand git submodules
3. **Sync Management**: Need to keep submodule updated in main repository

## Troubleshooting

### Common Issues

1. **Submodule not updating**: Run `git submodule update --init --recursive`
2. **Drafts showing in production**: Check that `import.meta.env.PROD` is working
3. **Build failures**: Ensure Vercel has access to the content repository

### Debug Commands

```bash
# Check submodule status
git submodule status

# Update submodule
git submodule update --remote

# Check environment variables
echo $NODE_ENV
echo $VERCEL_ENV
```

## Future Enhancements

1. **Automated Submodule Updates**: GitHub Actions to auto-update submodule
2. **Draft Preview URLs**: Generate preview URLs for draft posts
3. **Content Validation**: Add validation for required frontmatter fields
4. **Bulk Operations**: Scripts for bulk publishing/unpublishing

## Security Considerations

- Draft content is visible in the public repository source code
- Consider using private content repository if draft privacy is critical
- Ensure proper access controls on the content repository
