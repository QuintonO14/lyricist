import dynamic from "next/dynamic"
import { TiArrowBack } from 'react-icons/ti'
import { ImArrowUp } from 'react-icons/im'
const Track = dynamic(() => import('./track'))

const List = ({tracks, top,showLyrics, setShow}) => {
    return (
        <ul className="w-full p-2 px-4 mx-auto text-center mt-6">
        <button
        className="absolute top-0 left-0 h-10 w-10 m-1 border border-primary rounded-xl bg-quarternary
        hover:text-primary active:bg-quarternary flex justify-center items-center" 
        onClick={() => setShow(null)}><TiArrowBack /></button>
        {tracks.map((track, i) => {
        return (
            <Track i={i} key={track.track.id} track={track} showLyrics={showLyrics} />
        )}
        )}
        <button
        id="btn" 
        className="border-2 text-primary border-black bg-quarternary rounded-full p-4" 
        onClick={top}>
        <ImArrowUp />
        </button>
        </ul>
    )
}

export default List