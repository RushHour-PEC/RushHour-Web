const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const env = require('dotenv');


//routes
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const areaRoutes = require('./routes/area');
const policeStationRoutes = require('./routes/policestation');

env.config();


// mongodb connection
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE}.c95i11j.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Database Connected Successfully");
    });



//middlewares
app.use(express.json())



app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/area', areaRoutes);
app.use('/admin', policeStationRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is up at port ${process.env.PORT}`);
})




