import axios from 'axios'

export default async function handler(req, res) {
     const id = req.query.id
     const data = await axios.get(`https://api.musixmatch.com/ws/1.1/track.get?track_isrc=${id}&apikey=0ddd166bf424d4206c0307822ac666ed`)
     const track_id = data.data.message.body.track.track_id
     const lyrics = await axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=0ddd166bf424d4206c0307822ac666ed`).then((res) => {
        if(res.data.message.body.lyrics.lyrics_body) {
            return res.data.message.body.lyrics.lyrics_body
        } 
    })
    res.json(lyrics)
    res.end()
}