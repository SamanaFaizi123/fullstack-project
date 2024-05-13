import { Link } from "react-router-dom"

function PostBlog() {
  return (
    <div className="m-10">
      <Link to="/post" >
        <a
          className="bg-white  text-white   "
          onClick={() => {
          }}
        >
          
        </a>
      </Link>
    </div>
  )
}

export default PostBlog
