const express = require('express');
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const articleServiceHost = process.env.ARTICLEFEEDHOST//"http://localhost:3000/article/feed";
const reviewServiceHost = process.env.REVIEWFEEDHOST//"http://localhost:4001/feed";

app.get("/", async (req, res) => {
    console.log("received request for feed");
    let following = req.body.following;
    if (following) {
        console.log("following: " + following);
        let articles = [];
        axios.post(articleServiceHost, {
            following: following
        }).then((response) => {
            articles = response.data.articles;
        }).catch((error) => console.log(error));

        let reviews = [];
        await axios.post(reviewServiceHost, {
            following: following
        },).then((response) => {
            reviews = response.data.reviews;
        }).catch((error) => console.log(error));
        res.status(200).send({
            articles: articles,
            reviews: reviews
        })
    }
});

const port = process.env.PORT || 4005;

app.listen(port, () => {
    console.log("server listening on port " + port);
})