import axios from "axios"
import { getSession, signOut } from "next-auth/client"
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState, useEffect } from "react"
import { ImArrowUp } from "react-icons/im"
const Current = dynamic(() => import('../components/current'))
const Playlist = dynamic(() => import('../components/playlist'))

const Dashboard = ({currentSong, session, playlists}) => {
    const [playlist, setPlaylist] = useState(playlists !== null ? playlists.items : null)
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
      
    const showLyrics = async (id: number) => {
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
        <div id="playlist" className="text-quarternary text-center flex flex-col">
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta charSet="utf-8" />
            <title>Lyricist | Playlists</title>
            <meta name="description" content="Playlist feed for users to get their lyrics. 
            Includes currently playing song." />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
         </Head>    
        <div className="w-full bg-primary flex justify-between border-b-2 border-tertiary">
            <img className="h-8 my-2 ml-1" src="/lyricist.png"  alt="logo" />
            <button 
            className="float-right m-1 border border-white p-1 rounded-sm bg-secondary 
            hover:bg-quarternary hover:text-primary active:bg-quarternary active:text-primary text-lg sm:text-lg" 
            onClick={() => signOut()}>Logout
            </button>
        </div>
             <div>
             {currentlyPlaying &&(
                <div>
                  <h1 className="text-center pt-4 mb-2 text-xl">Currently Playing:</h1>
                  <Current 
                  currentSong={currentlyPlaying} 
                  loading={loading} 
                  show={show} 
                  showLyrics={showLyrics} 
                  lyrics={lyrics} 
                  returnToTrack={returnToTrack} />
                </div>
              )}
              <h1 className="text-center p-4 text-xl">Playlists:</h1>
              {playlist.length && ( playlist.map((list) => {
                     return (
                         <Playlist
                         key={list.id} 
                         list={list}
                         session={session} />
                     )
                 }))}  
              <button                
                  className="border-2 text-primary border-black bg-quarternary rounded-xl p-2 mt-4" 
                  onClick={top}>
                  <ImArrowUp />
              </button>
             </div>
            {!playlist && (
             <p className="w-1/2 mx-auto">No Playlists Found. Head to Spotify and start saving playlists!</p>
            )}
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
  