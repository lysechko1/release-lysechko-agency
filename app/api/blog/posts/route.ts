import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page')
    const limit = searchParams.get('limit')
    const language = searchParams.get('language') || 'ru'
    
    // Если запрос без пагинации - возвращаем все посты (для generateStaticParams)
    if (!page && !limit) {
      const query = `
        *[_type == "post" && publishedAt <= now() && language == $language] | order(publishedAt desc) {
          _id,
          title,
          "slug": slug.current,
          excerpt,
          "mainImage": mainImage.asset->url,
          publishedAt,
          author->{
            name,
            "image": image.asset->url
          },
          categories[]->{
            title
          }
        }
      `
      
      const posts = await client.fetch(query, { language })
      return NextResponse.json(posts)
    }
    
    // Пагинация для обычных запросов
    const pageNum = parseInt(page || '1')
    const limitNum = parseInt(limit || '6')
    const offset = (pageNum - 1) * limitNum

    const query = `
      *[_type == "post" && publishedAt <= now() && language == $language] | order(publishedAt desc) [${offset}...${offset + limitNum}] {
        _id,
        title,
        "slug": slug.current,
        excerpt,
        "mainImage": mainImage.asset->url,
        publishedAt,
        author->{
          name,
          "image": image.asset->url
        },
        categories[]->{
          title
        }
      }
    `

    const countQuery = `count(*[_type == "post" && publishedAt <= now() && language == $language])`
    
    const [posts, totalCount] = await Promise.all([
      client.fetch(query, { language }),
      client.fetch(countQuery, { language })
    ])

    const hasMore = offset + limitNum < totalCount

    return NextResponse.json({
      posts,
      hasMore,
      totalCount
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
} 