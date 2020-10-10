const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")
const { reduce } = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


server.get("/", function(req, res) {
    const about = {
        avatar_url: "https://scontent.fcfc2-1.fna.fbcdn.net/v/t1.0-9/72295119_2467073236710179_4117636003382951936_n.jpg?_nc_cat=111&_nc_sid=09cbfe&_nc_ohc=U1EmPtx5pM4AX8au_Dy&_nc_ht=scontent.fcfc2-1.fna&oh=aa7b74ca00a2c6306c808e3efdd5f856&oe=5FA68CA4",
        name:"Haniel Lourenço Lohn",
        role:"Estudante - Univille",
        description:"Acadêmico em Engenharia de Software desbravando o mundo da programação",
        links: [
            {name: "Github", url: "https://github.com/haniellourenco"},
            {name: "Twitter", url: "https://twitter.com/haniellourenco"},
            {name: "Instagram", url: "https://www.instagram.com/haniellourenco"}
        ]
    }

    return res.render("about", { about })
})

server.get("/basketball", function(req, res) {
    return res.render("basketball", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id

    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})
})

server.listen(5000, function(){
    console.log("server is running")
})