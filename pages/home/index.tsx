import { NextPageContext } from 'next'
import React from 'react'
import { BlogDataTypes, getBlogs } from '../../api/blog'
import { fetchBase } from '../../api/fetchBase'
import { CardBlog } from '../../components/blog/CardBlog'
import Layout from '../../components/Layout'


interface HomePageProps {
  blogs: BlogDataTypes[],
}
function HomePage({ blogs }: HomePageProps) {
  return (
    <Layout>
      {blogs.map((blog) => (
        <CardBlog blog={blog} key={blog._id} />
      ))}
    </Layout>
  )
}

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  // const { } = ctx;
  try {
    const blogsResp = await getBlogs();
    console.log("🚀 ~ file: index.tsx ~ line 27 ~ HomePage.getInitialProps= ~ blogsResp", blogsResp)
    return {
      blogs: blogsResp.success ? blogsResp.data : []
    }
  } catch (error) {
    console.error(error)
    return {
      blogs: []
    }
  }
}

export default HomePage
