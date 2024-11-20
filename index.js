import express from "express";
import { dirname } from "path";//
import pg from "pg";
import { fileURLToPath } from "url";//
const __dirname = dirname(fileURLToPath(import.meta.url));//takes location of the file...
import bodyParser from "body-parser";
import path from "path";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "project",
    password: "password",
    port: "5432",
});
            
const app = express();
const port = 3000;


app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set views directory

app.use(express.static("public"));// to use static files like html, css, Image...

app.use(bodyParser.urlencoded({extended: true}));//using bodyparse middleware...

db.connect();

//db for sign up page for contractor...
app.post("/contractor",async (req,res)=>{
    const username = req.body["contractorName"];   
    const email = req.body["contractorEmail"];
    const passkey = req.body["contractorPassword"];

    await db.query("insert into contractor (name,email,password) values ($1,$2,$3)",[username,email,passkey,]);
    res.redirect("/contractorLogin")
});

//db for sign up page for farmer...
app.post("/farmer",async (req,res)=>{
    const username = req.body["farmerName"];
    const email = req.body["farmerEmail"];
    const passkey = req.body["farmerPassword"];

    await db.query("insert into farmer values ($1,$2,$3)",[username,email,passkey,]);
    res.redirect("/farmerLogin")
});

//db for sign up page for transport...
app.post("/transport",async (req,res)=>{
    const username = req.body["transporterName"];
    const email = req.body["transporterEmail"];
    const passkey = req.body["transporterPassword"];

    await db.query("insert into transporter values ($1,$2,$3)",[username,email,passkey,]);
    res.redirect("/transporterLogin")
});

//db for sign up page for vender...
app.post("/vender",async (req,res)=>{
    const username = req.body["venderName"];
    const email = req.body["venderEmail"];
    const passkey = req.body["venderPassword"];

    await db.query("insert into vender values ($1,$2,$3)",[username,email,passkey,]);
    res.redirect("/consumerLogin")
});

//db for farm product..
app.post("/farm",async (req,res)=>{
    const name = req.body["name"];
    const phone = req.body["phone"];
    const email = req.body["email"];
    const pin = req.body["pincode"];
    const crop = req.body["crop"];
    const quantity = req.body["quantity"];
    const price = req.body["price"];

    await db.query("insert into farm values ($1,$2,$3,$4,$5,$6,$7)",[name,phone,email,pin,crop,quantity,price,]);
    res.redirect("/")
});

//db for contract info..
app.post("/contract",async (req,res)=>{
    const name = req.body["name"];
    const phone = req.body["phone"];
    const email = req.body["email"];
    const pin = req.body["pincode"];
    const crop = req.body["crop"];
    const quantity = req.body["quantity"];
    const price = req.body["price"];

    await db.query("insert into contract values ($1,$2,$3,$4,$5,$6,$7)",[name,phone,email,pin,crop,quantity,price,]);
    res.redirect("/")
});

//db for transport info
app.post("/transporter",async (req,res)=>{
    const name = req.body["name"];
    const phone = req.body["phone"];
    const email = req.body["email"];
    const pin = req.body["pincode"];
    const crop = req.body["vehicle"];
    const quantity = req.body["vehicle_no"];
    const price = req.body["fair"];

    await db.query("insert into transport values ($1,$2,$3,$4,$5,$6,$7)",[name,phone,email,pin,crop,quantity,price,]);
    res.redirect("/")
});

//db logic for farmer log in page....
app.post("/farmer1", async (req, res) => {
    const mail = req.body["Mail"];
    const pass = req.body["Farmerpassword"];

    //console.log("Request Body:", req.body);

    try {
        console.log("Executing query to find farmer with email:", mail);
        const result = await db.query("SELECT * FROM farmer WHERE email = $1", [mail]);
        //console.log("Query Result:", result);

        // Check if a result was found
        if (result.rows.length > 0) {
            const dbPassword = result.rows[0].password; // Extract the password from the result

            // Compare the provided password with the stored password
            if (pass === dbPassword) {
                res.redirect("/farmer_Home"); // Render the Farmerhome page
            } else {
                res.redirect("/farmerLogin"); // Redirect if passwords do not match
            }
        } else {
            // No user found with that email
            res.redirect("/farmersignup"); // Redirect if no user found
        }

    } catch (err) {
        console.error("Database query error:", err); // Log the error for debugging
        res.status(500).send("Internal Server Error,try again after some time"); // Send a generic error response
    }
});


//login post request for contractor...
app.post("/contractor1", async (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming request body
    const mail = req.body["Mail"];
    const pass = req.body["contractorPassword"];

    try {
        const result = await db.query("SELECT * FROM contractor WHERE email = $1", [mail]);

        if (result.rows.length > 0) {
            const dbPassword = result.rows[0].password;

            if (pass === dbPassword) {
                res.redirect("/contractor_Home");
            } else {
                res.redirect("/contractorLogin"); 
            }
        } else {
            res.redirect("/contractorsignup");
        }
    } catch (err) {
        console.error("Error during contractor login:", err);
        res.status(500).send("Internal Server Error,try after some time");
    }
});

//login post for vender
app.post("/vender1", async (req, res) => {
    const mail = req.body["Mail"];
    const pass = req.body["password"];

    try {
        const result = await db.query("SELECT * FROM vender WHERE email = $1", [mail]);

        // Check if a result was found
        if (result.rows.length > 0) {
            const dbPassword = result.rows[0].password; // Extract the password from the result


            // Compare the provided password with the stored password
            if (pass === dbPassword) {
                res.redirect("/buyer_Home"); // Render the Farmerhome page
            } else {
                res.redirect("/consumerLogin"); // Redirect if passwords do not match
            }
        } else {
            // No user found with that email
            res.redirect("/consumersignup"); // Redirect if no user found
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Internal Server Error,Try after some time"); // Send a generic error response
    }
});

//login page for transporter...
app.post("/transport1", async (req, res) => {
    const mail = req.body["Mail"];
    const pass = req.body["password"];

    try {
        const result = await db.query("SELECT * FROM transporter WHERE email = $1", [mail]);

        // Check if a result was found
        if (result.rows.length > 0) {
            const dbPassword = result.rows[0].password; // Extract the password from the result


            // Compare the provided password with the stored password
            if (pass === dbPassword) {
                res.redirect("/transport_Home"); // Render the Farmerhome page
            } else {
                res.redirect("/transporterLogin"); // Redirect if passwords do not match
            }
        } else {
            // No user found with that email
            res.redirect("/transportersignup"); // Redirect if no user found
        }
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Internal Server Error,try after some time"); // Send a generic error response
    }
});

//for farm search logic
app.post("/farmBuyer",async(req,res)=>{
    const pincode = req.body["pin"];

    try{
        const result = await db.query("select * from farm where pincode = $1",[pincode]);

        res.render('venderHome', { results: result.rows });
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('An error occurred while searching the database.');
    }

});

//for transport search logic
app.post("/transportBuyer",async(req,res)=>{
    const pincode = req.body["pin"];

    try{
        const result = await db.query("select * from transport where pin = $1",[pincode]);

        res.render('venderTransport', { results: result.rows });
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).send('An error occurred while searching the database.');
    }
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/home/index.html");//home page...
});

app.get("/farmerLogin",(req,res)=>{
    res.sendFile(__dirname + "/public/farmer-sign-in/farmer-signin-index.html");//farmer login...
});

app.get("/consumerLogin",(req,res)=>{
    res.sendFile(__dirname + "/public/vender-signin/vender-sigin-index.html");//consumer login...
});

app.get("/transporterLogin",(req,res)=>{
    res.sendFile(__dirname + "/public/transport-sign-in/transport-signin-page-index.html");//transport login...
});

app.get("/contractorLogin",(req,res)=>{
    res.sendFile(__dirname + "/public/contracter-signin/contracter-signin-index.html");//contractor login...
});

app.get("/farmersignup",(req,res)=>{
    res.sendFile(__dirname + "/public/farmer-sign-up/farmer-signup-index.html");//farmer signup...
});

app.get("/consumersignup",(req,res)=>{
    res.sendFile(__dirname + "/public/vender-signup/vender-signup-index.html");//consumer signup...
});

app.get("/transportersignup",(req,res)=>{
    res.sendFile(__dirname + "/public/transportsign-up/transport-signup-pageindex.html");//transport signup...
});

app.get("/contractorsignup",(req,res)=>{
    res.sendFile(__dirname + "/public/contracter-signup/contracter-signup-index.html");//contractor signup...
});

app.get("/sign",(req,res)=>{
    res.sendFile(__dirname + "/public/sign/sign.html");//signIn page...
});

app.get("/log",(req,res)=>{
    res.sendFile(__dirname + "/public/log/log.html");//Login page...
});

app.get("/contractor_Home",(req,res)=>{
    res.sendFile(__dirname + "/public/contractor/contractorHome.html");//home page for contractor log in...
});

app.get("/farmer_Home",(req,res)=>{
    res.sendFile(__dirname + "/public/farmer/farmerHome.html");// farmer home page
});

app.get("/buyer_Home",(req,res)=>{
    res.render(__dirname + "/views/venderHome.ejs"); //vender home page
});

app.get("/transport_Home",(req,res)=>{
    res.sendFile(__dirname + "/public/transport/transportHome.html");// Transport home page
});

app.get("/about",(req,res)=>{
    res.send("About Us Page");// about page 
});

app.get("/buyerTransport",(req,res)=>{
    res.render(__dirname + "/views/venderTransport.ejs");//buyer transport..
});

app.get("/call",(req,res)=>{
    res.send("Help Center");
});

app.listen(port,()=>{
    console.log(`Server is live at ${port}`);
});