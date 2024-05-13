import React, { useState } from "react"
import axios from "axios"
import Alert from "./Alert";

 export default function Post()  {
  const [imagePreview, setImagePreview] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 1000)
    const formData = new FormData()
    formData.append("id", `${id}`)
    formData.append("title", e.currentTarget.titl.value || "title")
    formData.append("content", e.currentTarget.content.value || "no content")
    formData.append("imageUrl", e.currentTarget.image.files[0])

    try {
      const response = await axios.post("http://localhost:3000/", formData, {
      })
      console.log("Response:", response)
      console.log("Data:", response.data)
      setToastMessage("Blog post created successfully!")
      setShowToast(true)
      setTimeout(() => {
        window.location.href = "/"
      }, 1000) 
    } catch (error) {
      console.error("Error posting data:", error)
    
      setToastMessage("Error creating blog post. Please try again later.")
      setShowToast(true)
    }
  }

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result;
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <div className="w-screen ">
      {showToast && (
        <Alert
          message={toastMessage}
         onClose={() => setShowToast(false)}/>
      )}
      <div className="bg-white rounded-md p-8 lg:w-1/2 mx-auto my-0">
        <h2 className="text-4xl font-bold mb-4">Create A <span className="text-green-500">New Post </span>
         </h2>
        <form onSubmit={handleSubmit}>
         
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-blod font-medium text-black"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="titl"
              required
              className="mt-1 block w-full rounded-md shadow-md sm:text-lg p-2 h-16 border-gray-300  border-2 focus:border-2 " 
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-blod font-medium text-black"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={10}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-lg focus:ring-blue-500 focus:border-blue-500 p-2 border-2 sm:text-lg" 
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-blod font-medium text-black"
            >
              Image
            </label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-2 h-54w-full object-cover rounded-md"
              />
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 block w-full rounded-md shadow-blod border-2 focus:border-black sm:text-blod p-12 border-dashed"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-md" >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


