import React from 'react';//useRef is used to move the camera
import {easing} from 'maath';
import {useSnapshot} from 'valtio';
import {useFrame} from '@react-three/fiber';
import state from '../store';
const CameraRig = ({children}) => {//the children prop is used to render the 3d model
  const group = React.useRef();//used to move the camera
  const snap = useSnapshot(state);
  useFrame((state, delta) => {//delta is the time between the current frame and the last frame
    //Responsiveness:
    const isBreakpoint = window.innerWidth < 1260;//used to check if the screen is less than 1260px
    const isMobile = window.innerWidth < 600;//used to check if the screen is less than 768px
    //set initial position of the target model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro){
      if(isBreakpoint){
        targetPosition = [0, 0, 2];
      }
      if(isMobile){
        targetPosition = [0, 0, 2.5];
      }
      else{
        if(isMobile){
          targetPosition = [0, 0, 2.5];
        }
        else{
          targetPosition = [0, 0, 2];
        }
      }
    }
    //set initial position of the camera
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);//damp3 is used to ease the animation
    //set rotation of the camera
    easing.dampE(group.current.rotation, [state.pointer.y/10, -state.pointer.x/5, 0], 0.25, delta); //dampE is used to ease the animation
  })
    return (
      <group ref={group}>
        {children}
      </group>
    )
}

export default CameraRig