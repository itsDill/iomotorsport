# iomotorsport Blog Posts

This folder contains all blog posts organized by category for easy management.

## Folder Structure

```
hub/
├── README.md              # This file
├── _template.html         # Template for creating new posts
├── endurance/             # Endurance Racing articles
├── tech/                  # Tech & Engineering articles
├── drivers/               # Driver Stories & Profiles
├── history/               # Racing History articles
├── analysis/              # Race Analysis articles
└── esports/               # Esports & Sim Racing articles
```

## Creating a New Post

1. Copy `_template.html` to the appropriate category folder
2. Rename it to match your post ID (e.g., `my-new-article.html`)
3. Update the metadata in the `<script>` tag at the top
4. Write your content in the article body
5. Add the post to `data/blog.json` for it to appear in the main blog listing

## Post Metadata

Each post contains metadata in the JavaScript section:

- `id`: Unique identifier (matches filename without .html)
- `title`: Article title
- `excerpt`: Short description for previews
- `category`: Category ID (endurance, tech, drivers, history, analysis, esports)
- `author`: Author name and avatar emoji
- `date`: Publication date (YYYY-MM-DD)
- `readTime`: Estimated read time
- `tags`: Array of related tags

## Categories

| ID        | Name                 | Icon | Color   |
| --------- | -------------------- | ---- | ------- |
| endurance | Endurance Racing     | 🏁   | #e63946 |
| tech      | Tech & Engineering   | ⚙️   | #007bff |
| drivers   | Driver Stories       | 🏆   | #28a745 |
| history   | Racing History       | 📚   | #9c27b0 |
| analysis  | Race Analysis        | 📊   | #ff9800 |
| esports   | Esports & Sim Racing | 🎮   | #00bcd4 |

## Adding to Blog Listing

After creating a post, add an entry to `/data/blog.json` in the `posts` array:

```json
{
  "id": "your-post-id",
  "title": "Your Post Title",
  "excerpt": "Brief description...",
  "category": "endurance",
  "author": {
    "name": "Author Name",
    "avatar": "🏎️"
  },
  "date": "2026-01-21",
  "readTime": "10 min read",
  "image": "image-name.jpg",
  "tags": ["Tag1", "Tag2"],
  "featured": false
}
```
