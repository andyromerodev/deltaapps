import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

export default function WhatsAppFloatingButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      animate(buttonRef.current, {
        scale: [1, 1.1, 1],
        duration: 2000,
        ease: 'inOutQuad',
        loop: true,
      })
    }
  }, [])

  return (
    <a
      ref={buttonRef}
      href="https://wa.me/51938671766"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactanos en WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-[background-color,box-shadow] hover:bg-[#22bf5b] hover:shadow-[#25D366]/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="size-8"
      >
        <path fill="#ffffff" stroke="#ffffff" strokeWidth="26" d="M123 393l14-65a138 138 0 1150 47z"/>
        <path fill="#ffffff" d="M308 273c-3-2-6-3-9 1l-12 16c-3 2-5 3-9 1-15-8-36-17-54-47-1-4 1-6 3-8l9-14c2-2 1-4 0-6l-12-29c-3-8-6-7-9-7h-8c-2 0-6 1-10 5-22 22-13 53 3 73 3 4 23 40 66 59 32 14 39 12 48 10 11-1 22-10 27-19 1-3 6-16 2-18"/>
      </svg>
    </a>
  )
}
