 import express from "express";
import data from ("../public/data.json");
import path  from ("path");
import fs from ("fs");
import multer from("multer");
import { writeFile } from "fs";
import { resolve } from "path/posix";
import { rejects } from "assert";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "postImg/") 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })
const router = express.Router()
router.get("/", (req, res, next) => { //get all blogs
  res.json(data);
})

router.get("/:id", (req, res, next) => { // get single blog by id
  const { id } = req.params
  const blog = data.posts.find((blog) => Number(blog.id) === Number(id))
  res.json(blog)
})

router.use("/postImg", express.static(path.join(__dirname, "postImg")))

router.get("/postImg/:imageUrl", (req, res, next) => {
  
  const { imageUrl } = req.params

  const parentDir = path.resolve(__dirname, "..")
  const absoluteImagePath = path.join(parentDir, "postImg", imageUrl)
 
  res.sendFile(absoluteImagePath, (err) => {
    if (err) {
      console.error("Error sending file:", err)
      res.status(err.status || 500).send("File not found")
    }
  })
})
router.post("/", upload.single("imageUrl"), async (req, res, next) => {
  const mainDir = path.resolve(__dirname, "..")
  const blog = req.body
  if (req.file) {
    const postImgFileName = req.file.filename
    newBlog.imageUrl = postImgFileName;
  }
  data.posts.unshift(blog)
  const filePath = path.join(mainDir, "/public/data.json")
  try{
    await writeFileAsync(filePath,JSON.stringify(data,null,2))
    res.json(blog);
    console.log("Blog create successfully!");
  }catch (err){
    res.status(500).json({ error: "Failed to write to JSON file" });
    console.error( err)
  }
});
const updatedBlog = async(id,updatedBlogData) =>{
  return new Promise((resolve,reject) =>{
    const index = data.posts.findIndex(
      (blog) => Number(blog.id) === Number(id)
    );
    if (index !== -1) {
      if (req.file) {
        const newImageFilename = req.file.originalname;
        updatedBlogData.imageUrl = newImageFilename;
      }
      data.posts[index] = { ...data.posts[index], ...updatedBlogData };
      resolve(data.posts[index]) 
    } else {
      reject(new Error("Blog post not found"))
    }

  })
}
router.put("/:id", upload.single("imageUrl"),  async(req, res, next) => {
  try{
    const updatedBlogData = req.body;
    console.log(updatedBlogData);
    const { id } = req.params;
    const updatedBlog = await updatedBlog(id,updatedBlogData);
    res.json(updatedBlog);   
  }catch (error){
    res.status(404).json({message:error.message})
  }  
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params
  console.log( `Deleting blog with Id:${id}`);
  const index = data.posts.findIndex(
    (blog) => Number(blog.id) === Number(id));
  if (index !== -1) {
    return res.status(404).send("The requested was not found");
     
  } data.posts.splice(index, 1);
  const remainigPosts = data.posts.map((blog) =>{
    const {id,title,content} = blog;
    return{id,title,content};
  })
   return res.status(200).json(remainigPosts);
  })

export default router;
