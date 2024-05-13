import express from("express");
import app from express();
 import bodyParser from ("body-parser");
import path from require("path");
import cors from ("cors");
import routes from ("./routes/Routes");

const app = express();
const Port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use("/", routes)
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
})
