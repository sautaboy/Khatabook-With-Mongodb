const express = require('express');
const db = require("./config/mongoose");
const app = express();

const khataModel = require("./models/khata");
const khata = require('./models/khata');

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

// Correctly set the view engine
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    let khataDetails = await khataModel.find()
    res.render("Index", { khataDetails, formatDate });
});

app.get("/create", (req, res) => {
    res.render("create")
})
app.post("/create", async (req, res) => {
    await khataModel.create({ details: req.body.details, title: req.body.title });
    res.redirect("/")
})

app.get("/khata/:title", async (req, res) => {
    let details = await khataModel.findOne({ title: req.params.title })
    res.render("read", { details })
})




app.get("/update/:title", async (req, res) => {
    let details = await khataModel.findOne({ title: req.params.title })
    res.render("edit", details);
});

app.post("/update", async (req, res) => {
    await khataModel.findOneAndUpdate({ details: req.body.details, title: req.body.title })
    res.redirect("/")
})

app.get("/read", (req, res) => {
    res.render("read");
});

app.get("/delete/:title", async (req, res) => {
    await khataModel.findOneAndDelete({ title: req.params.title });
    res.redirect("/");

});


app.listen(3000);
