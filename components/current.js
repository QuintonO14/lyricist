const Current = ({currentSong, show, returnToTrack, lyrics, showLyrics}) => {
    const trackId = currentSong ? currentSong.item.external_ids.isrc : null
    return (
            <div className="flex flex-col items-center relative bg-black text-white mt-1 w-full md:w-1/2 max-h-96 overflow-y-auto w-auto mx-auto px-4 border
            border-white rounded-md p-8 scrollbar scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-gray-600
           scrollbar-track-rounded scrollbar-track-gray-200">
             {show === false ? (
             <>
                <p className="mb-1">{currentSong.item.name}</p>
                 <img height={200} width={200} src={currentSong.item.album.images[0].url} alt="Image" />
                 <p className="mt-1">{currentSong.item.artists[0].name}</p>
                 <button
                 className="border-2 border-white rounded-md p-1 mt-2 hover:text-black hover:bg-white"
                 onClick={() => showLyrics(trackId)}>Get Lyrics</button>
             </>
             ) : (
             <>
                <button
                className="absolute top-0 left-0 p-2 border rounded-md hover:bg-white hover:text-black
                active:bg-white active:text-black m-1" 
                onClick={returnToTrack}>←</button>
                <p className="whitespace-pre-wrap mt-4 text-center">{lyrics}</p>
             </>
             )}
            </div>
    )   
}

export default Current