export default function NavigationBar() {
  return (
    <nav className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-white text-2xl font-bold mr-6">
            Home
          </a>
        </div>
        <div className="flex items-center gap-3">
           <a href="/post" className="text-white text-2xl font-bold mr-6">
            Post A Blog
          </a>
          
        </div>
      </div>
    </nav>
  )
}


