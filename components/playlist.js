import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import dynamic from 'next/dynamic'
const Track = dynamic(() => import('./track'))
const Cover = dynamic(() => import('./cover'))


const Playlist = ({list, session}) => {
    const [tracks, setTracks] = useState(null)
    const [showingTracks, setShow] = useState(null)
    const [lyrics, setLyrics] = useState('')

    const getTracks = async (id) => {
        setShow(true)
        await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
              },
        }).then((response) => {setTracks(response.data.items)})
    }

    const showLyrics = async (id) => {
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
            {showingTracks === true && tracks ? 
            (
                <ul className="w-full p-2 px-4 mx-auto text-center">
                <button
                className="absolute top-0 left-0 p-2 m-1 border rounded-md hover:bg-white hover:text-black
                active:bg-white active:text-black" 
                onClick={() => setShow(null)}>←</button>
                {tracks.map((track) => {
                return (
                    <Track key={track.track.id} track={track} showLyrics={showLyrics} />
                )}
                )}
                <button
                id="btn" 
                className="border-2 text-black border-black bg-white rounded-xl p-0.5 px-2" 
                onClick={top}>
                ⯅
                </button>
                </ul>
            ) : showingTracks === null ?  
            (
                <Cover list={list} getTracks={getTracks} />
            ) : (
                <>
                <button
                className="absolute top-0 left-0 p-2 border rounded-md hover:bg-white hover:text-black
                active:bg-white active:text-black" 
                onClick={returnToTracks}>←</button>
                <motion.p
                initial={{opacity: 0}}
                animate={{opacity : 1}}
                transition={{duration: 2}}
                className="whitespace-pre-wrap mt-4 text-center">{lyrics}</motion.p>
                </>
            )}
        </div>
    )
}

export default Playlist