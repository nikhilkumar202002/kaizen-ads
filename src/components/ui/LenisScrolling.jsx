import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

const LenisScrolling = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default LenisScrolling
