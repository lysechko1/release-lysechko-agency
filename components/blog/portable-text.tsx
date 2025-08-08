'use client'

import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

const components = {
  types: {
    image: ({value}: any) => {
      return (
        <div className="my-8">
          <img
            src={urlFor(value).url()}
            alt={value.alt || 'Blog image'}
            className="w-full h-auto rounded-lg"
          />
          {value.alt && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({children}: any) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({children}: any) => (
      <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({children}: any) => (
      <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">
        {children}
      </h3>
    ),
    h4: ({children}: any) => (
      <h4 className="text-lg font-bold text-gray-900 mt-3 mb-2">
        {children}
      </h4>
    ),
    normal: ({children}: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}: any) => (
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
        {children}
      </ul>
    ),
    number: ({children}: any) => (
      <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({children}: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({children}: any) => (
      <em className="italic">{children}</em>
    ),
    link: ({value, children}: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      )
    },
  },
}

interface PortableTextProps {
  content: any
}

export default function PortableTextComponent({ content }: PortableTextProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
} 