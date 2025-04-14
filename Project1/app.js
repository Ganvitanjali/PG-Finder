const express = require("express") 
const mongoose = require("mongoose")
const cors = require("cors");


const app = express()
app.use(cors());
app.use(express.json())


const roleRoutes = require("./src/routes/RoleRoutes")
const userRoutes = require("./src/routes/UserRoutes");
app.use(roleRoutes)
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes) 

const areaRoutes = require("./src/routes/AreaRoutes")
app.use("/area",areaRoutes)

const categoryRoutes = require("./src/routes/CategoryRoutes");
app.use("/category", categoryRoutes)

const propertyRoutes = require("./src/routes/PropertyRoutes");
app.use("/property", propertyRoutes)

const favoriteRoutes = require("./src/routes/FavoriteRoutes");
app.use("/favorite", favoriteRoutes)

const inquiryRoutes = require("./src/routes/InquiryRoutes");
app.use("/inquiry", inquiryRoutes);

const agentdetailsRoutes = require("./src/routes/AgentDetailsRoutes");
app.use("/agentdetails", agentdetailsRoutes);

const bookingRoutes = require("./src/routes/BookingRoutes");
app.use("/booking", bookingRoutes);

const AdminDashboardRoutes = require("./src/routes/AdminDashboardRoutes");
app.use("/admindashborad", AdminDashboardRoutes);

const notificationRoutes = require('./src/routes/NotificationRoutes');
app.use("/notification", notificationRoutes);







mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})



const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})


