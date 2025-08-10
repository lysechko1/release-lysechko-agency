import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language') || 'ru'
    
    const query = `
      *[
        _type == "post" && 
        slug.current == $slug &&
        publishedAt <= now() &&
        language == $language
      ][0] {
        _id,
        title,
        "slug": slug.current,
        body,
        excerpt,
        "mainImage": mainImage.asset->url,
        publishedAt,
        seoTitle,
        seoDescription,
        seoKeywords,
        author->{
          name,
          "image": image.asset->url,
          bio
        },
        categories[]->{
          title
        }
      }
    `

    const post = await client.fetch(query, { slug: params.slug, language })

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
} 