import React, { useEffect, useState } from "react";

export default function Alert ({ message, onClose }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      onClose()
    }, 4000) 

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`message ${show ? "show-message" : "hide-message"}`}>
      {message}
    </div>
  )
}

