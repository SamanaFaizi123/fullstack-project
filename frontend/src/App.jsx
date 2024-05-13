import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import NavigationBar from "./components/NavigationBar"
import BlogList from "./components/BlogList"
import ViewBlog from "./components/ViewBlog"
import Post from "./components/Post"
import Edit from "./components/Edit"
import { element } from "prop-types"

function App() {
  const routes = [
    {
      path:'/',element:<BlogList/>
    },
    {path:'/view/:id',element:<ViewBlog/>},
    {path:'/edit/:id',element:<ViewBlog/>},
  ];
  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
       {routes.map((route)=>(
        <Route key={route.path}
        path={route.path}
        element= {route.element}/>
       ))}
        </Routes>
      </Router>

      <Footer />
    </>
  )
}

export default App
