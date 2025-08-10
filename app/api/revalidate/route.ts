import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: { current: string }
  _id: string
}

export async function POST(req: NextRequest) {
  try {
    // Check if we have the revalidation secret
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      console.error('Missing SANITY_REVALIDATE_SECRET environment variable')
      return new Response('Missing environment variable', { status: 500 })
    }

    // Parse and validate the webhook body
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      console.error('Invalid webhook signature')
      return new Response('Invalid signature', { status: 401 })
    }

    console.log('Webhook received:', body)

    // Handle different content types
    if (body._type === 'post') {
      if (body.slug?.current) {
        // Revalidate the specific blog post
        const postPath = `/blog/${body.slug.current}`
        revalidatePath(postPath)
        console.log(`Revalidated blog post: ${postPath}`)
        
        // Also revalidate the blog list page
        revalidatePath('/blog')
        console.log('Revalidated blog list page')
      }
    }

    // Revalidate the home page if it shows blog posts
    revalidatePath('/')
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: `Successfully revalidated ${body._type}`
    })
  } catch (err: any) {
    console.error('Error in revalidation webhook:', err)
    return new Response(err.message, { status: 500 })
  }
}
