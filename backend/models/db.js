const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI_Mongoose).then((result)=>{
    console.log("DB Ready to Use");
}).catch((err)=>{
    console.log(err);
})