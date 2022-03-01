import { motion } from "framer-motion"
import { TiArrowBack } from 'react-icons/ti'

const Lyrics = ({returnToTracks, loading, lyrics}) => {
    return (
        <div>
             <button
            className="absolute top-0 left-0 h-10 w-10 m-1 border border-primary rounded-xl bg-quarternary
            hover:text-primary active:bg-quarternary flex justify-center items-center" 
            onClick={returnToTracks}><TiArrowBack />
            </button>
        {loading === false ? (
              <motion.p
              initial={{opacity: 0}}
              animate={{opacity : 1}}
              transition={{duration: 2}}
              className="whitespace-pre-wrap mt-4 text-center">{lyrics}
              </motion.p>
        ) : <svg className="animate-spin rounded-full mx-auto h-32 w-32 border-b-2 border-gray-100"></svg>
        }
        </div>
    )
}

export default Lyrics