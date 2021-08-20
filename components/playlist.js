import { useState } from "react"
import axios from "axios"
import dynamic from 'next/dynamic'
const Cover = dynamic(() => import('./cover'))
const List = dynamic(() => import('./list'))
const Lyrics = dynamic(() => import('./lyrics'))

const Playlist = ({list, session}) => {
    const [tracks, setTracks] = useState(null)
    const [showingTracks, setShow] = useState(null)
    const [lyrics, setLyrics] = useState('')
    const [loading, setLoading] = useState(false)

    const getTracks = async (id) => {
        setShow(true)
        setLoading(true)
        await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
              },
        }).then((response) => {setTracks(response.data.items)})
        setLoading(false)
    }

    const showLyrics = async (id) => {
        setLoading(true)
        await axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_isrc=${id}&apikey=0ddd166bf424d4206c0307822ac666ed`).then((res) => {
            const newId = res.data.message.body.track.track_id
            axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${newId}&apikey=0ddd166bf424d4206c0307822ac666ed`).then((res) => {
                if(res.data.message.body.lyrics.lyrics_body) {
                    setLyrics(res.data.message.body.lyrics.lyrics_body) 
                } else {
                    setLyrics(`Unfortunately these lyrics have been subjected to copyright laws and cannot be displayed. Please try another time or look somewhere else for the lyrics to this song.`)
                }
            })
        })
        setLoading(false)
        setShow(false)
    }

    const returnToTracks = () => {
        setShow(true)
        setLyrics('')
    }

    const top = () => {
            document.getElementById(list.id).scroll({top:0,behavior:'smooth'}); 
    }
    
 

    return (
        <div
        id={list.id}
        className="relative bg-black text-white w-full lg:w-1/2 max-h-96 overflow-y-auto w-auto mx-auto px-4 border
         border-white rounded-md p-8 scrollbar scrollbar-thumb-rounded scrollbar-thumb-gray-600
        scrollbar-track-rounded scrollbar-thin scrollbar-track-gray-200">
            {showingTracks === true && loading === false && tracks ? 
               <List setShow={setShow} showLyrics={showLyrics} tracks={tracks} top={top} />
             : showingTracks === null ? 
               <Cover list={list} getTracks={getTracks} />
             : loading === true ? <svg className="animate-spin rounded-full mx-auto h-32 w-32 border-b-2 border-gray-100"></svg>
             : <Lyrics loading={loading} lyrics={lyrics} returnToTracks={returnToTracks} />
            }
        </div>
    )
}

export default Playlist