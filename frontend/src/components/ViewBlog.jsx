import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const mainUrlAdd = "http://localhost:3000/postImg"
export default  function ViewBlog  () {
  const { id } = { id: string }=useParams();
  const [image, setImage] = useState(null)
  const [data, setData] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        setData(data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (data && data.imageUrl) {
          const response = await fetch(`${mainUrlAdd}/${data.imageUrl}`)
          if (!response.ok) {
            throw new Error("Failed to fetch image")
          }
          const blob = await response.blob()
          const imgUrl = URL.createObjectURL(blob)
          setImage(imgUrl)
        } else {
          setImage()
        }
      } catch (error) {
        console.error("Error fetching image:", error)
      }
    }
    fetchImage()
    return () => {
      if (image) {
        URL.revokeObjectURL(image)
      }
    }
  }, [data])
  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{data?.title}</h1>
        <div className="flex flex-wrap mb-4">
        </div>
        <div className=" flex items-center mb-4">
        </div>
        <img src={image || ""} alt={data?.title} className="mb-4" />
        <div className="prose">{data?.content}</div>
      </div>
    </div>
  )
}

