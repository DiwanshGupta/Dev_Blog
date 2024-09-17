import React, { Suspense } from 'react'
import BlogData from '../../components/blog/blogdata'
const page = () => {
  return (
      <Suspense>
        <BlogData/>
      </Suspense>
  )
}

export default page