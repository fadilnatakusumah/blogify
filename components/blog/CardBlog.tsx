import React from 'react'
import Gravatar from 'react-gravatar'
import { BlogDataTypes } from '../../api/blog'

interface CardBlogProps {
  blog: BlogDataTypes,
}

export function CardBlog({ blog }: CardBlogProps) {
  return (
    <div>
      <div>
        <Gravatar
          email={blog?.author?.email}
          size={100}
          rating="pg"
          default="monsterid"
        />
      </div>
      <div>
        <h4>{blog}</h4>
      </div>
    </div>
  )
}
