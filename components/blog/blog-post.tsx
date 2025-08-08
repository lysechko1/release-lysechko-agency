'use client'

import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import PortableTextComponent from './portable-text'

interface Post {
  _id: string
  title: string
  slug: string
  body: any
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

interface BlogPostProps {
  post: Post
}

export default function BlogPost({ post }: BlogPostProps) {
  const { language, t } = useTranslation()
  
  const getLocalizedPath = (path: string) => {
    return language === "en" ? `/en${path}` : path
  }

  const locale = language === "en" ? enUS : ru

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href={getLocalizedPath("/blog")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("backToBlog")}
              </Link>
            </Button>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories?.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(post.publishedAt), 'dd MMMM yyyy', { locale })}
                </span>
              </div>
              
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author.name}</span>
                </div>
              )}
            </div>
            
            {post.mainImage && (
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={post.mainImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {post.body && (
              <PortableTextComponent content={post.body} />
            )}
          </div>
        </div>
      </section>
    </article>
  )
} 