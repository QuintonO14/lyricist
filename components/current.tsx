import { TiArrowBack } from "react-icons/ti"

const Current = ({currentSong, loading, show, returnToTrack, lyrics, showLyrics}) => {
    const trackId = currentSong ? currentSong.item.external_ids.isrc : null
    return (
            <div className="relative bg-tertiary text-primary w-11/12 lg:w-2/3 max-h-96 overflow-y-auto w-auto mx-auto px-4 border-2
            border-quarternary rounded-md p-8 scrollbar scrollbar-thumb-rounded scrollbar-thumb-secondary
           scrollbar-track-rounded scrollbar-thin scrollbar-track-quarternary my-2">
             {show === false ? (
             <div className="flex flex-col items-center mx-auto">
                <p className="mb-1">{currentSong.item.name}</p>
                 <img className="border-4 border-quarternary" height={200} width={200} src={currentSong.item.album.images[0].url} alt="Image" />
                 <p className="mt-1">{currentSong.item.artists[0].name}</p>
                 <button
                 className="border-2 border-quarternary text-quarternary bg-primary hover:bg-quarternary hover:text-primary
                 rounded-md p-2 mt-2 hover:text-primary hover:bg-quarternary hover:border-primary"
                 onClick={() => showLyrics(trackId)}>Get Lyrics</button>
             </div>
             ) : (
             <>
                <button
               className="absolute top-0 left-0 h-10 w-10 m-1 border border-primary rounded-xl bg-quarternary
               hover:text-primary active:bg-quarternary flex justify-center items-center" 
                onClick={returnToTrack}><TiArrowBack /></button>
                {loading === true ? (
                 <svg className="animate-spin rounded-full mx-auto h-32 w-32 border-b-2 border-gray-100"></svg> ) :
                (
                    <p className="whitespace-pre-wrap mt-4 text-center">{lyrics}</p>
                )}
             </>
             )}
            </div>
    )   
}

export default Current