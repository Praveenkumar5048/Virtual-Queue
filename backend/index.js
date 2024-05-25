import dbConnection from "./src/db/dbConnection.js";
import { v2 as cloudinary } from 'cloudinary';


// Database connnection configuration
dbConnection()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })
