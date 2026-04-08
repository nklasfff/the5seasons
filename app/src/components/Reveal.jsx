import { useState, useRef, useEffect } from 'react'
import styles from './Reveal.module.css'

export default function Reveal({ children, preview }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [open, children])

  return (
    <div className={`${styles.reveal} ${open ? styles.open : ''}`}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        {preview}
        <span className={styles.hint}>
          {open ? 'Luk' : 'Læs mere'}
        </span>
      </button>
      <div
        className={styles.content}
        style={{ maxHeight: open ? height + 'px' : '0px' }}
      >
        <div ref={contentRef} className={styles.inner}>
          {children}
        </div>
      </div>
    </div>
  )
}
