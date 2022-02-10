import { motion } from "framer-motion"
const Track = ({i, track, showLyrics}) => {
    const id = track.track.external_ids.isrc
    return (
        <div>
            <motion.li 
             initial="initial"
             animate="animate"
             variants={{
                 initial: { opacity: 0},
                 animate: { opacity: 1}
             }}
             transition={{ duration: 0.3, delay: i * 0.05}}
            className="cursor-pointer border border-quarternary rounded-md text-quarternary list-none bg-primary
             hover:bg-quarternary hover:text-primary hover:border-primary p-2 my-2 text-md"
             onClick={() => showLyrics(id)}
             >{track.track.name} by {track.track.artists[0].name}
             </motion.li>
        </div>
    )
}

export default Track