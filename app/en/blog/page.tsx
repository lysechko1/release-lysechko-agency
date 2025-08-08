import { Metadata } from 'next'
import BlogList from '@/components/blog/blog-list'
import BlogHero from '@/components/blog/blog-hero'

export const metadata: Metadata = {
  title: 'Blog - Lysechko Agency',
  description: 'Expert insights, case studies and latest news from the world of digital marketing from Lysechko Agency team',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <BlogHero />
      <BlogList />
    </div>
  )
} 