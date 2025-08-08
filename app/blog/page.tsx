import { Metadata } from 'next'
import BlogList from '@/components/blog/blog-list'
import BlogHero from '@/components/blog/blog-hero'

export const metadata: Metadata = {
  title: 'Блог - Lysechko Agency',
  description: 'Актуальные новости, кейсы и insights из мира digital маркетинга от команды Lysechko Agency',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <BlogHero />
      <BlogList />
    </div>
  )
} 