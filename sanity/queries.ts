export const postFields = `
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  body,
  tags,
  publishedAt,
  readingTime,
  seoTitle,
  seoDescription,
  ogImage,
  author->{_id, name, image, bio, socialLinks},
  category->{_id, name, slug, description}
`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) { ${postFields} }`;
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] { ${postFields} }`;
export const relatedPostsQuery = `*[_type == "post" && slug.current != $slug && category._ref == $categoryId] | order(publishedAt desc)[0...3] { ${postFields} }`;
export const categoriesQuery = `*[_type == "category"] | order(name asc) {_id, name, slug, description}`;
export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {_id, title, image, description, technologies, projectType, liveUrl, githubUrl}`;
export const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {_id, name, company, message, image}`;
