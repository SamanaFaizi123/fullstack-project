import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "./Alert" ;

export default  function PostModal  ({ closeModal }) {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  useEffect(() => {
    const body = document.getElementsByTagName("html")[0] 
    body.style.overflow = "hidden"
    return () => {
      body.style.overflow = "unset" 
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = Math.floor(Math.random() * 1000)
    const formData = new FormData()
    formData.append("id", `${id}`)
    formData.append("title", e.currentTarget.titl.value || "title")
    formData.append(
      "content",
      e.currentTarget.content.value ||
        "Generic content, lorem ipsum dolor sit amet con etiam null tempor"
    )
    
    formData.append("imageUrl", e.currentTarget.image.files[0])

    try {
      const response = await axios.post("http://localhost:3000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Response:", response)
      console.log("Data:", response.data)
      closeModal()
      setToastMessage("Blog post created successfully!")
      setShowToast(true)
    } catch (error) {
      console.error("Error posting data:", error)
      setToastMessage("Error creating blog post. Please try again later.")
      setShowToast(true)
    }
  }
  return (
    <>
      {showToast && (
        <Alert
          message={toastMessage}
          onClose={() => setShowToast(false)}/>
      )}
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white rounded-md p-8 max-w-lg w-full">
          <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md mr-2">
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

