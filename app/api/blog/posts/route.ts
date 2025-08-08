import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    const language = searchParams.get('language') || 'ru'
    const offset = (page - 1) * limit

    const query = `
      *[_type == "post" && publishedAt <= now() && language == $language] | order(publishedAt desc) [${offset}...${offset + limit}] {
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

    const hasMore = offset + limit < totalCount

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