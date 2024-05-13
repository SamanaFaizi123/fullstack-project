import { useEffect, useState } from "react";
import PostBlog from "./PostBlog";
import CustomCard from "./CustomCard";
import InfoSection from "./InfoSection";

export default function BlogList() {
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/")
        if (!response.ok) {
          throw new Error("The data was not found!")
        }
        const data = await response.json()
        setData(data)
      
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [data])

  const renderBlog = (data) => {
    return   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      { data.posts.map((blog ,index) => (
      <CustomCard
        key={index}
        title={blog.title}
        content={blog.content}
        imageUrl={blog.imageUrl}
        id={blog.id}
      />
    ))}
    </div>  
   
  }
  return (
    <div>
      <InfoSection />
      <PostBlog />
        <main className=" flex justify-center  items-center">
          <div className="container flex flex-wrap">
            <div className="container mx-auto">
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              {data && renderBlog(data)}
              </div>
            </div>
          </div>
        </main>
    </div>
  )
}

