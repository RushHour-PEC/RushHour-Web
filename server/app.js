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
// const videoRoutes = require('./routes/video');

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


// app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/area', areaRoutes);
app.use('/station', policeStationRoutes);
// app.use('/video', videoRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is up at port ${process.env.PORT}`);
})




