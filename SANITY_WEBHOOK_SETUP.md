# Sanity Webhook Setup for Next.js Revalidation

This guide will help you set up a webhook in Sanity that automatically triggers revalidation in your Next.js app whenever blog posts are published, updated, or deleted.

## Step 1: Generate a Secret

First, generate a random secret for your webhook:

```bash
openssl rand -base64 32
```

Copy the generated string and add it to your `.env.local` file:

```env
SANITY_REVALIDATE_SECRET=your_generated_secret_here
```

## Step 2: Deploy Your Next.js App

Make sure your Next.js app is deployed and accessible via HTTPS. The webhook URL will be:

```
https://yourdomain.com/api/revalidate
```

## Step 3: Configure Sanity Webhook

1. Go to your [Sanity project dashboard](https://www.sanity.io/manage)
2. Navigate to **API** → **Webhooks**
3. Click **Create webhook**
4. Configure the webhook as follows:

### Basic Settings
- **Name**: `Next.js Revalidation`
- **URL**: `https://yourdomain.com/api/revalidate`
- **HTTP Method**: `POST`
- **Dataset**: `production` (or your dataset name)

### Filter
- **Document Type**: `post`
- **Operation**: `create`, `update`, `delete`

### Headers
Add a custom header:
- **Key**: `Authorization`
- **Value**: `Bearer your_generated_secret_here`

### GROQ Query (Optional)
If you want to filter specific conditions:

```groq
*[_type == "post" && publishedAt <= now()]
```

## Step 4: Test the Webhook

1. Create or update a blog post in Sanity
2. Check your Next.js app logs for the webhook message:
   ```
   Webhook received: { _type: 'post', slug: { current: 'new-post-slug' }, _id: '...' }
   Revalidated blog post: /blog/new-post-slug
   Revalidated blog list page
   ```

3. Visit the new post URL to verify it's accessible

## Step 5: Verify Revalidation

After publishing a new post:

1. The webhook will automatically trigger
2. Next.js will revalidate the specific post route
3. The new post will be immediately accessible without a rebuild
4. The blog list page will also be updated

## Troubleshooting

### Webhook Not Triggering
- Check that the webhook is enabled in Sanity
- Verify the URL is correct and accessible
- Check that the document type filter matches your content

### 401 Unauthorized
- Verify the `SANITY_REVALIDATE_SECRET` environment variable is set
- Check that the secret in Sanity matches your environment variable

### 500 Internal Server Error
- Check your Next.js app logs for detailed error messages
- Verify all required environment variables are set
- Ensure the webhook endpoint is accessible

### Posts Still Returning 404
- Check that the webhook is successfully triggering
- Verify the revalidation logs in your Next.js app
- Ensure the post slug is being correctly extracted

## Security Notes

- Keep your webhook secret secure and never commit it to version control
- The webhook validates the signature to prevent unauthorized requests
- Only revalidate paths that are safe to expose publicly

## Performance Considerations

- Webhooks trigger immediately when content changes
- Revalidation happens on-demand, reducing build times
- Consider rate limiting if you have high-frequency content updates
- Monitor webhook performance and adjust as needed
