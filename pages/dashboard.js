import axios from "axios"
import { getSession, signOut } from "next-auth/client"
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState, useEffect } from "react"
const Current = dynamic(() => import('../components/current'))
const Playlist = dynamic(() => import('../components/playlist'))

const Dashboard = ({currentSong, session, playlists}) => {
    console.log(playlists)
    const [playlist, setPlaylist] = useState(playlists !== null ? playlists.items : playlists)
    const [currentlyPlaying, setPlaying] = useState(currentSong)
    const [loading, setLoading] = useState(false)
    const [lyrics, setLyrics] = useState('')
    const [show, setShow] = useState(false)
    useEffect(() => {
        if(session.error) {
            const tokenRedirect = async() => {
                    signOut();
            }
            tokenRedirect()
        } else {
            const song = setInterval(async() => {
                await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                        headers: {
                            "Authorization" :  `Bearer ${session.accessToken}`
                        },
                        params: {
                            market: "US"
                        }
                     }).then((res) => {
                         if(!res.data) {
                             setPlaying(null)
                         } else {
                             setPlaying(res.data)
                         }
                     }).catch((err) => {
                         if(err) {
                             signOut();
                         }
                     })
                }, 60000)
            return () => clearInterval(song)
        }
      }, [session]);
      
    const showLyrics = async (id) => {
        setLoading(true)
        await axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_isrc=${id}&apikey=0ddd166bf424d4206c0307822ac666ed`).then((res) => {
            const newId = res.data.message.body.track.track_id
            axios.get(`https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${newId}&apikey=0ddd166bf424d4206c0307822ac666ed`).then((res) => {
                if(res.data.message.body.lyrics.lyrics_body) {
                    setLyrics(res.data.message.body.lyrics.lyrics_body) 
                } else {
                    setLyrics(`Unfortunately these lyrics have been subjected to copyright laws and cannot be displayed. Please try again another time or look elsewhere for the lyrics to this song.`)
                }
            })
        })
        setLoading(false)
        setShow(true)
    }

    const returnToTrack = async () => {
        setShow(false)
        setLyrics('')
    }

    const top = () => {
        window.scroll({top:0,behavior:'smooth'}); 
    }

    return (
        <div id="playlist" className="bg-black text-white text-center">
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta charSet="utf-8" />
            <title>Lyricist | Playlists</title>
            <meta name="description" content="Playlist feed for users to get their lyrics. 
            Includes currently playing song." />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
         </Head>    
        <button 
        className="absolute right-0 m-1 border border-white p-1 rounded-sm 
        hover:bg-white hover:text-black active:bg-white active:text-black text-xs sm:text-lg" 
        onClick={signOut}>Logout</button>
        {playlists.items > 1 ? (
             <>
             {currentlyPlaying ? 
              (
                  <>
                  <h1 className="text-center pt-4 mb-2 text-lg">Currently Playing:</h1>
                  <Current 
                  currentSong={currentlyPlaying} 
                  loading={loading} 
                  show={show} 
                  showLyrics={showLyrics} 
                  lyrics={lyrics} 
                  returnToTrack={returnToTrack} />
                  </>
              ) : null}
              <h1 className="text-center p-4 text-lg">Playlists:</h1>
              {playlist !== null ? ( playlist.map((list) => {
                     return (
                         <Playlist
                         key={list.id} 
                         list={list}
                         showLyrics={showLyrics} 
                         session={session} />
                     )
                 })) : <svg className="animate-spin rounded-full mx-auto h-32 w-32 border-b-2 border-gray-100"></svg>}
              <button                
                  className="border-2 text-black border-black bg-white rounded-xl p-0.5 px-2 mt-4" 
                  onClick={top}>↑
              </button>
             </>
        ) : <p className="w-1/2 mx-auto">No Playlists Found. Head to Spotify and start saving playlists!</p>}
       </div>
       
    )
}

export default Dashboard

export async function getServerSideProps (context) {
    const session = await getSession(context)
    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    } 
 
    const playlist = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        },
        params: {
          limit: 20
        }
       },
    ).catch((err) => {
        console.log(err)
    })

    const song = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: {
            "Authorization" :  `Bearer ${session.accessToken}`
        },
        params: {
            market: "US"
        }
     }).catch((err) => {
         console.log(err)
     })

    return {
      props: {
        session: session,
        playlists: playlist ? playlist.data : null,
        currentSong: song ? song.data : null
      }
    }
  }
  