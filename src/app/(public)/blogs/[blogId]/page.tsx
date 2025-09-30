/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard"

export const generateStaticParams= async()=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`)
  const result = await res.json()
  const blogs =  result.data.data

  return blogs.slice(0,2).map((blog:any)=>({
    blogId: String(blog.id)
  }))

}

const BlogDetails = async({params}: {params: Promise<{blogId: string}>}) => {
    const {blogId} = await params

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${blogId}`,{
        cache: "no-store"
    })
    const result = await res.json()
    const blog =  result.data
    
  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
        <BlogDetailsCard blog={blog}/>
    </div>
  )
}

export default BlogDetails