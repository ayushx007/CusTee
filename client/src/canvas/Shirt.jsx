import React from 'react';
import {easing} from 'maath';//used to ease the animation
import {useSnapshot} from 'valtio';//state management
import {useFrame} from '@react-three/fiber';//used to render the 3d model
import {Decal, useGLTF, useTexture} from '@react-three/drei';//Decal is used to add a mesh to the 3d model, useGLTF is used to load the 3d model, useTexture is used to load the texture
import state from '../store';
const Shirt = () => {
  const snap = useSnapshot(state);
  const {nodes, materials} = useGLTF('/shirt_baked.glb');//loading the 3d model, .glb extension is used for 3d models
  const logoTexture = useTexture(snap.logoDecal);//loading the texture
  const fullTexture = useTexture(snap.fullDecal);
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));//used to change the color of the 3d model
  const stateString = JSON.stringify(snap);//sometimes the state does not update properly, so we are converting the state to a string and then back to an object
  return (
    <group
    key={stateString}>//comes from three.js
      <mesh
      castShadow//to cast shadow
      geometry={nodes.T_Shirt_male.geometry}//loading the geometry of the 3d model
      material={materials.lambert1}//material used in the 3d model
      material-roughness={0.5}
      dispose={null}
      >
        {snap.isFullTexture && (//applying texture to the 3d model
          <Decal
          position={[0,0,0]} 
          rotation={[0,0,0]}
          scale={1} 
          map={fullTexture}//map is used to render the texture
          />
        )}
        {snap.isLogoTexture && (//applying texture to the 3d model
          <Decal
          position={[0,0.04,0.15]} 
          rotation={[0,0,0]}
          scale={0.15}//scale is used to resize the texture 
          map={logoTexture}//map is used to render the texture
          anisotropy={16}//anisotrophy is used to make the texture more clear
          depthTest={false}//depthTest is used to make the texture visible on top of other objects on the screen
          depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
