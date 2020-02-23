const { Video, validate } = require('../../models/Video');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const youtube = require('youtube-api')
const uuid = require('uuid')
const open = require('open')
const fs = require('fs')

const credentials = require('../../config/youtube.json')

const storage = multer.diskStorage({
    destination: 'public/',
    filename(req, file, cb){
        const newFileName = `${uuid()}-${file.originalname}`
        cb(null, newFileName)
    }
})

const uploadVideFile = multer({
    storage: storage
}).single('videoFile')

router.post('/upload', uploadVideFile, (req, res)=>{
    if(req.file){
        const filename = req.file.filename
        const {title, description} = req.body

        open(oAuth.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/youtube.upload',
            state: JSON.stringify({
                filename, title, description
            })
        }))
    }
})

router.get('/oauth2callback', (req, res)=>{
    res.redirect('http://localhost:4000/api/video/oauth2callback')
    const {filename, title, description} = JSON.parse(req.query.state)
    oAuth.getToken(req.query.code, (err, tokens)=>{
        if(err){
            console.log(err)
            return
        }
        oAuth.setCredentials(tokens)
        youtube.video.insert({
            resource: {
                snippet: {title, description}, 
                state: {privacyStatus: "private"}
            },
            part: 'snippet, status',
            media: {
                body: fs.createReadStream(filename)
            }
        }, (err, data) =>{
            console.log("Done")
        })
    })
})
const oAuth = youtube.authenticate({
    type: 'oauth',
    client_id: credentials.web.client_id,
    client_secret: credentials.web.client_secret,
    redirect_url: credentials.web.redirect_uris[0]
}) 


module.exports = router;
