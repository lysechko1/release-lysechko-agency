import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPost from '@/components/blog/blog-post'
import { client } from '@/lib/sanity'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Отключаем SSG полностью - страница всегда динамическая
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Временно отключаем generateStaticParams для диагностики
// export async function generateStaticParams() {
//   try {
//     const { client } = await import('@/lib/sanity')
    
//     const query = `
//       *[_type == "post" && publishedAt <= now() && (!defined(language) || language == "ru")] {
//         "slug": slug.current
//       }
//     `
    
//     const posts = await client.fetch(query)
    
//     console.log('generateStaticParams slugs:', posts)
    
//     return posts.map((post: any) => ({
//       slug: post.slug,
//     }))
//   } catch (error) {
//     console.error('Error generating static params:', error)
//     // Return empty array to allow dynamic generation
//     return []
//   }
// }

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    
    // Фетч напрямую из Sanity с теми же фильтрами
    const post = await client.fetch(
      `*[_type=="post" && slug.current==$slug && publishedAt <= now() && (!defined(language) || language=="ru")][0]`,
      { slug }
    )
    
    if (!post) {
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
    console.error('Error in generateMetadata:', error)
    return {
      title: 'Статья не найдена',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params
    
    // Фетч напрямую из Sanity с теми же фильтрами
    const post = await client.fetch(
      `*[_type=="post" && slug.current==$slug && publishedAt <= now() && (!defined(language) || language=="ru")][0]`,
      { slug }
    )
    
    // Диагностический лог
    console.log('slug', slug, 'post', !!post)
    
    if (!post) {
      notFound()
    }

    return <BlogPost post={post} />
  } catch (error) {
    console.error('Error in BlogPostPage:', error)
    notFound()
  }
} 