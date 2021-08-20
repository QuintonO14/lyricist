import dynamic from "next/dynamic"
const Track = dynamic(() => import('./track'))

const List = ({tracks, top,showLyrics, setShow}) => {
    return (
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
        ↑
        </button>
        </ul>
    )
}

export default List