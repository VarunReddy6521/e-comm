const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
mongoose.connect("mongodb+srv://varunreddy6521:varun21@cluster0.npgwcic.mongodb.net/ecommerce?retryWrites=true&w=majority").then(function(){
    app.get("/", function (req, res) {
        res.send("Ecommerce Setup");
    });
    const userRoutes = require("./routes/user_routes");
    app.use("/api/user", userRoutes);
});

const PORT = 5000;
app.listen(PORT,function(){
    console.log(`Server started at PORT: ${PORT}`);
});