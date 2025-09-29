import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard"


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