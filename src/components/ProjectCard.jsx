import './ProjectCard.css'
import { motion } from 'framer-motion'

const MotionDiv = motion.div

function ProjectCard({ title, description, image }) {
  return (
    <MotionDiv
      className="project-card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
    </MotionDiv>
  )
}

export default ProjectCard
