import './SectionTitle.css'
import { motion } from 'framer-motion'

function SectionTitle({ icon, title }) {
  const MotionH2 = motion.h2
  return (
    <MotionH2
      className="section-title"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {icon} {title}
    </MotionH2>
  )
}

export default SectionTitle
