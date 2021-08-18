import { motion } from "framer-motion"
const Track = ({track, showLyrics}) => {
    const id = track.track.external_ids.isrc
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
            <li className="cursor-pointer border border-black rounded-md text-black list-none bg-white
             hover:bg-green-200 active:bg-green-200 p-2 my-2 text-xs sm:text-base"
             onClick={() => showLyrics(id)}
             >{track.track.name} by {track.track.artists[0].name}
             </li>
        </motion.div>
    )
}

export default Track