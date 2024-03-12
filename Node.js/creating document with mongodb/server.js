const mongoose = require ("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose.connect(process.env.CONN_STR, {
})
.then(() => {
    console.log("DB connection successful")
})
.catch((error) => {
    console.error("Error connecting to the database:", error);
});


const port = 3000;

app.listen(port, () => {
    console.log("server has started...")
})

