import { motion } from "framer-motion"

const Lyrics = ({returnToTracks, loading, lyrics}) => {
    return (
        <>
        <button
        className="absolute top-0 left-0 p-2 border rounded-md hover:bg-white hover:text-black
        active:bg-white active:text-black" 
        onClick={returnToTracks}>←</button>
        {loading === false ? (
              <motion.p
              initial={{opacity: 0}}
              animate={{opacity : 1}}
              transition={{duration: 2}}
              className="whitespace-pre-wrap mt-4 text-center">{lyrics}
              </motion.p>
        ) : <svg className="animate-spin rounded-full mx-auto h-32 w-32 border-b-2 border-gray-100"></svg>
        }
        </>
    )
}

export default Lyrics