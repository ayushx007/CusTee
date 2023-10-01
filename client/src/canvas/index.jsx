import {Canvas} from '@react-three/fiber';
//we will implement the main three.js functionality here
import {Environment, Center} from '@react-three/drei';
import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
const CanvasModel = () => {
return (
    <Canvas
    shadows
    camera={{ position: [0, 0, 0], fov: 25 }}//fov brings the camera closer to the object
    gl={{preserveDrawingBuffer:true}}//this is used to save the canvas as an image
    className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.5} />
      <Environment files="syferfontein_0d_clear_puresky_1k.hdr" />
     <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
