import { useState, useEffect } from "react"

export default function Footer( ) {
  let initialYear = new Date().getFullYear();
  const [currentYear, setCurrentYear] = useState(initialYear);
  useEffect(()=>{
    let animationFrameId = null;
    const updateYear = ()=>{
      setCurrentYear(updateYear)
    }
    animationFrameId = requestAnimationFrame(updateYear)
    return() => cancelAnimationFrame(animationFrameId)
  },[]);
  return (
    <footer className="bg-black text-white py-4 relative bottom-0 w-full">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <p className="text-center">
            &copy; {currentYear} Copy right{" "}
          </p>
        </div>
      </div>
    </footer>
  )
}


