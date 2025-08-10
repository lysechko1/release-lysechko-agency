import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Точный GROQ-запрос как в Vision
    const query = `*[
      _type == "post" &&
      slug.current == $slug &&
      publishedAt <= now() &&
      (!defined(language) || language == "ru")
    ][0]{
      _id, title, "slug": slug.current, publishedAt, language
    }`

    const post = await client.fetch(query, { slug })

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
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
