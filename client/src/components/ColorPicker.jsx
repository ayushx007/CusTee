import React from 'react'
import {SketchPicker} from 'react-color'//color picker provided by react-color, can directly be used in the component
import { useSnapshot } from 'valtio'
import state from '../store'
const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className='absolute left-full ml-3'
    >
      <SketchPicker
        color={snap.color}
        disableAlpha//opacity slider
        onChange={(color) => { state.color = color.hex}}
        
        />
    </div>
  )
}

export default ColorPicker