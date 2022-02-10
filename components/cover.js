import { motion } from "framer-motion"
const Cover = ({list, getTracks}) => {
    return (
        <motion.div
        initial={{rotateY: 180, opacity: 0}}
        animate={{rotateY: 360, opacity: 1}}
        transition={{duration: 1}}
        className="flex flex-col items-center mx-auto">
        <p className="mb-1">{list.name}</p>
        <img className="border-4 border-quarternary" height={200} width={200} src={list.images[0].url} alt="playlist_image" />
        <p className="mt-1">Made By: {list.owner.display_name}</p>
        <button
        className="border-2 border-quarternary text-quarternary bg-primary hover:bg-quarternary hover:text-primary
         rounded-md p-2 mt-2 hover:text-primary hover:bg-quarternary hover:border-primary"
        onClick={() => getTracks(list.id)}>See Tracks</button>
        </motion.div>
    )
}

export default Cover