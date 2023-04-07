import { ArrowCircleUp } from '@phosphor-icons/react'
import {
  Variants,
  useAnimationControls,
  useScroll,
  motion,
} from 'framer-motion'
import React, { useEffect } from 'react'

type ScrollToTopProps = {}

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0, translateY: '30px', transition: { duration: 0.1 } },
  show: { opacity: 1, translateY: '-30px', transition: { duration: 0.1 } },
}

export function ScrollToTop(props: ScrollToTopProps) {
  const isBrowser = () => typeof window !== 'undefined'

  function scrollToTop() {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const { scrollYProgress } = useScroll()
  const controls = useAnimationControls()

  useEffect(() => {
    scrollYProgress.on('change', (latestValue) => {
      if (latestValue > 0.15) {
        controls.start('show')
      } else {
        controls.start('hide')
      }
    })
  })

  return (
    <div>
      <motion.button
        variants={ScrollToTopContainerVariants}
        initial="hide"
        animate={controls}
        onClick={scrollToTop}
        className="fixed bottom-0 text-green-100 right-20 w-[32px] h-[32px]"
      >
        <ArrowCircleUp size={32} weight="fill" />
      </motion.button>
    </div>
  )
}
