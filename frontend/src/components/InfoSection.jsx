export default  function InfoSection () {
  return (
    <section className=" bg-green-100 py-16 w-screen flex justify-center items-right background h-96 ">
      <div className="max-w-6xl mx-auto container glassmorphic-container  sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-left">
          <div className=" ">
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-black-800 leading-tight mb-4">
                HI IT IS <span className="text-green-500">My Blog</span>
              </h1>
              <p className="text-xl text-black mb-8">
               I am proud to introduce my own blog hub! <br/> in this blog I want to introduce a few influential and famous web devlopers  in the world to you so let's see!
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-full">
                <a href="#main"> See More!</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


