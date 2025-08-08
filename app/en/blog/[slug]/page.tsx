import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPost from '@/components/blog/blog-post'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  // В реальном проекте здесь будет запрос к Sanity
  const posts = [
    { slug: 'how-to-increase-website-conversion-2024' },
    { slug: 'top-5-digital-marketing-trends-2024' },
    { slug: 'ai-in-marketing-chatgpt-for-business' }
  ]
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/posts/${params.slug}`)
    const post = await response.json()
    
    if (!post || post.error) {
      return {
        title: 'Post not found',
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
      title: 'Post not found',
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