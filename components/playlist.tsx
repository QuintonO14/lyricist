import { useRef, useState } from "react"
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
    const playlist = useRef(null)

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
        await axios('/api/lyrics', {
            method: 'GET',
            params: {
                id: id
            }
        }).then((res) => {
            if(res.data) {
                setLyrics(res.data)
            } else {
                setLyrics(`Unfortunately, the lyrics for this song have been subjected
                 to copyright by its creator and cannot be displayed at this time`)
            }
        })
        setLoading(false)
        setShow(false)
    }

    const returnToTracks = () => {
        setShow(true)
        setLyrics('')
    }

    const top = () => {
        playlist.current?.scroll({top:0,behavior:'smooth'}); 
    }

    return (
        <div
        ref={playlist}
        className="relative bg-tertiary text-primary w-11/12 lg:w-2/3 max-h-96 overflow-y-auto w-auto mx-auto px-4 border-2
         border-quarternary rounded-md p-8 scrollbar scrollbar-thumb-rounded scrollbar-thumb-secondary
        scrollbar-track-rounded scrollbar-thin scrollbar-track-quarternary my-2">
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