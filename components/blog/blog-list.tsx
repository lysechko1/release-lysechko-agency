'use client'

import { useState, useEffect } from 'react'
import BlogCard from './blog-card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

interface Post {
  _id: string
  title: string
  slug: string
  excerpt: string
  mainImage: any
  publishedAt: string
  author: {
    name: string
    image: any
  }
  categories: Array<{
    title: string
  }>
}

export default function BlogList() {
  const { language, t } = useTranslation()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [page, language])

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/blog/posts?page=${page}&limit=6&language=${language}`)
      const data = await response.json()
      
      if (page === 1) {
        setPosts(data.posts)
      } else {
        setPosts(prev => [...prev, ...data.posts])
      }
      
      setHasMore(data.hasMore)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && page === 1) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0 && !loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              {t("noPostsFound")}
            </h3>
            <p className="text-gray-500">
              {t("tryDifferentKeywords")}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="latest-posts" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
        
        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button 
              onClick={() => setPage(prev => prev + 1)}
              disabled={loading}
              variant="outline"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("loading")}
                </>
              ) : (
                t("loadMore")
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
} 