'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Tag>
  )
}
