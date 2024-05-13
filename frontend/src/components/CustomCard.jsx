import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const mainUrlAdd = "http://localhost:3000/postImg";
 export default function CustomCard ({id,title, content, imageUrl, }) {
  const [image, setImage] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteShortAlrt, setShowDeleteAlrt] = useState(false);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`${mainUrlAdd}/${imageUrl}`)
        if (!response.ok) {
          throw new Error("Failed to fetch image")
        }
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer],{type:'image/jpeg'});
        const imgUrl = URL.createObjectURL(blob)
        setImage(imgUrl)
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
  }, [imageUrl])
  const handleClose = () => {
    if (showMenu) {
      setShowMenu(false)
    }
  }
  const handleDelete = () => {
    setShowConfirmModal(true)
  }
  const confirmedDelete = async () => {
    try {
      await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
      })
      setShowConfirmModal(false)
      setShowDeleteAlrt(true)
      setTimeout(() => setShowDeleteAlrt(false), 3000)
    } catch (error) {
      console.log(error)
    }
  }
  const truncatedContent =
    content.length > 200 ? `${content.slice(0, 200)}...` : content

  return (
    <>
      {showConfirmModal && (
        <ModalConfirmation
          message="Are you sure you want to delete this blog post?"
          onConfirm={confirmedDelete}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      {showDeleteShortAlrt}
      <div className="lg:w-1/3 w-full px-2 pb-12" onClick={handleClose}>
        <div className="h-full bg-white rounded shadow-md hover:shadow-lg relative smooth">
          <div className="cursor-pointer">
            <Link to={`/view/${id}`}>
              <img
                src={image}
                className="h-48 w-full rounded-t shadow cursor-pointer"
                alt="Blog Image"
              />
              <div className="p-6 h-auto md:h-48 cursor-pointer">
              
                <div className="font-bold text-xl text-gray-900">{title}</div>
                <p className="text-gray-800 font-serif text-base mb-5">
                  {truncatedContent}
                </p>
              </div>
            </Link>
              <div 
               className="fle items-center justify-between inset-x-0 bottom-0 p-6"> 
               <Link to={`/edit/${id}`}>
                    <button
                    className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-md "
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600  justify-between text-black font-bold py-2 px-4 rounded-md ml-2"
                    onClick={handleDelete}>
                    Delete
                  </button>
                    <Link to={`/view/${id}`}></Link>
              </div> 
          </div>
        </div>
      </div>
    </>
  )
}

