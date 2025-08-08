import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Функции для работы с постами
export async function getAllPosts() {
  const query = `
    *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      author->{
        name,
        image
      },
      categories[]->{
        title
      }
    }
  `
  return client.fetch(query)
}

export async function getPostBySlug(slug: string) {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      body,
      excerpt,
      mainImage,
      publishedAt,
      seoTitle,
      seoDescription,
      seoKeywords,
      author->{
        name,
        image,
        bio
      },
      categories[]->{
        title
      }
    }
  `
  return client.fetch(query, { slug })
} 