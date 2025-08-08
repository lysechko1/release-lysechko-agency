import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User } from 'lucide-react'
import { format } from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
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

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  const { language } = useTranslation()
  const locale = language === "en" ? enUS : ru
  
  const getLocalizedPath = (path: string) => {
    return language === "en" ? `/en${path}` : path
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link href={getLocalizedPath(`/blog/${post.slug}`)}>
        <div className="relative h-48 overflow-hidden">
          {post.mainImage ? (
            <img
              src={post.mainImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <span className="text-gray-400">Нет изображения</span>
            </div>
          )}
        </div>
      </Link>
      
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories?.slice(0, 2).map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category.title}
            </Badge>
          ))}
        </div>
        
        <Link href={getLocalizedPath(`/blog/${post.slug}`)}>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(post.publishedAt), 'dd MMM yyyy', { locale })}
            </span>
          </div>
          
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 