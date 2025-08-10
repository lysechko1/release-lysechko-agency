import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPost from '@/components/blog/blog-post'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Enable dynamic route generation for new posts
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Generate static params for known posts at build time
export async function generateStaticParams() {
  try {
    const { client } = await import('@/lib/sanity')
    
    const query = `
      *[_type == "post" && publishedAt <= now()] {
        "slug": slug.current
      }
    `
    
    const posts = await client.fetch(query)
    
    console.log('generateStaticParams slugs:', posts)
    
    return posts.map((post: any) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    // Return empty array to allow dynamic generation
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/posts/${params.slug}`)
    const post = await response.json()
    
    if (!post || post.error) {
      return {
        title: 'Статья не найдена',
      }
    }

    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      keywords: post.seoKeywords?.join(', '),
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        images: post.mainImage ? [post.mainImage] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Статья не найдена',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/posts/${params.slug}`)
    const post = await response.json()
    
    if (!post || post.error) {
      notFound()
    }

    return <BlogPost post={post} />
  } catch (error) {
    notFound()
  }
} 