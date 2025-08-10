# Solving 404 Errors for New Blog Posts with Sanity Webhooks

## Problem Description

When using Next.js with static site generation (SSG) and Sanity CMS, new blog posts published after the build process return 404 errors. This happens because:

1. Static routes are generated at build time
2. New content published after the build doesn't have corresponding static pages
3. The `generateStaticParams` function only knows about posts that existed during the build

## Solution Overview

This solution implements **on-demand revalidation** using Sanity webhooks to automatically regenerate pages for new content without requiring a full rebuild.

## How It Works

1. **Webhook Trigger**: When a blog post is published/updated/deleted in Sanity
2. **API Call**: Sanity sends a webhook to your Next.js app
3. **Revalidation**: Next.js revalidates the specific post route and related pages
4. **Dynamic Generation**: The new post becomes immediately accessible

## Files Added/Modified

### 1. API Route (`app/api/revalidate/route.ts`)
- Handles webhook requests from Sanity
- Validates webhook signatures for security
- Triggers revalidation for specific blog posts
- Updates blog list and home page

### 2. Blog Post Page (`app/blog/[slug]/page.tsx`)
- Added `dynamic = 'force-dynamic'` for immediate updates
- Set `revalidate = 0` for no caching
- Maintains `generateStaticParams` for build-time optimization

### 3. Next.js Config (`next.config.mjs`)
- Added experimental features for better webhook handling
- Configured external packages for Sanity client

### 4. Environment Variables (`env.example`)
- Template for required environment variables
- Includes webhook secret configuration

### 5. Setup Guide (`SANITY_WEBHOOK_SETUP.md`)
- Step-by-step instructions for configuring Sanity webhooks
- Troubleshooting guide and security considerations

### 6. Test Script (`scripts/test-webhook.js`)
- Utility to test webhook functionality locally
- Helps verify the setup before going live

## Setup Instructions

### 1. Environment Variables
```bash
# Generate a random secret
openssl rand -base64 32

# Add to .env.local
SANITY_REVALIDATE_SECRET=your_generated_secret
```

### 2. Deploy Your App
Ensure your Next.js app is deployed and accessible via HTTPS.

### 3. Configure Sanity Webhook
- Go to Sanity Dashboard → API → Webhooks
- Create webhook pointing to: `https://yourdomain.com/api/revalidate`
- Set document type filter to `post`
- Add authorization header with your secret

### 4. Test the Setup
```bash
# Test locally
node scripts/test-webhook.js

# Or test with environment variables
WEBHOOK_URL=https://yourdomain.com/api/revalidate node scripts/test-webhook.js
```

## Benefits

✅ **Immediate Availability**: New posts are accessible instantly after publishing
✅ **No Rebuilds**: Eliminates the need for full site rebuilds
✅ **Automatic Updates**: Blog list and related pages update automatically
✅ **Security**: Webhook signature validation prevents unauthorized requests
✅ **Performance**: On-demand revalidation maintains fast build times

## Security Features

- **Signature Validation**: Webhooks are cryptographically signed
- **Environment Secrets**: Sensitive data stored in environment variables
- **Path Validation**: Only safe paths are revalidated
- **Rate Limiting**: Built-in protection against abuse

## Monitoring and Debugging

### Webhook Logs
Check your Next.js app logs for webhook activity:
```
Webhook received: { _type: 'post', slug: { current: 'new-post' }, _id: '...' }
Revalidated blog post: /blog/new-post
Revalidated blog list page
```

### Common Issues
- **401 Unauthorized**: Check webhook secret configuration
- **404 Still Occurring**: Verify webhook is triggering successfully
- **500 Errors**: Check environment variables and API route logs

## Performance Considerations

- Webhooks trigger immediately on content changes
- Revalidation happens on-demand, not on every request
- Consider rate limiting for high-frequency updates
- Monitor webhook performance in production

## Alternative Solutions

If webhooks aren't suitable for your use case, consider:

1. **Incremental Static Regeneration (ISR)**: Set revalidation intervals
2. **Dynamic Routes**: Use `fallback: 'blocking'` for new routes
3. **Manual Revalidation**: Trigger revalidation via admin interface
4. **Scheduled Builds**: Automate rebuilds on content changes

## Support

For issues or questions:
1. Check the troubleshooting section in `SANITY_WEBHOOK_SETUP.md`
2. Verify environment variables and webhook configuration
3. Test with the provided test script
4. Check Next.js and Sanity documentation

## Next Steps

After implementing this solution:
1. Monitor webhook performance in production
2. Set up logging and alerting for webhook failures
3. Consider implementing webhook retry logic
4. Add monitoring for revalidation success rates
