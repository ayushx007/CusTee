import React from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'//AccumulativeShadows is used to add shadows to the 3d model, RandomizedLight is used to add light to the 3d model

const Backdrop = () => {
  const shadows = React.useRef();
  return (
    <AccumulativeShadows
    ref={shadows}
    temporal//temporal is used to smooth out the edges of the shadows
    frames={60}//60fps
    alphaTest={0.85}//sets the transparency of the shadows
    scale={10}
    rotation={[Math.PI / 2, 0, 0]}
    position={[0, 0, -0.14]}
    >
      <RandomizedLight amount={4} radius={9} intensity={1} ambient={0.25} position={[5,5,-10]} />
      <RandomizedLight amount={4} radius={5} intensity={0.25} ambient={0.55} position={[-5,5,-9]} />
    </AccumulativeShadows>
  )
}

export default Backdrop