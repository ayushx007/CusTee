import React from 'react'
import CustomButton from './CustomButton'
const AiPicker = ({prompt, setPrompt, generatingImg, handleSubmit}) => {
  return (
    <div className='aipicker-container'>
      <textarea>
        className='aipicker-textarea'
        placeholder='Enter a prompt for the AI to generate an image'
        rows='5'
        value = {prompt}
        onChange = {(e) => setPrompt(e.target.value)}
      </textarea>
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton
          type = 'outline'
          title="Asking AI..."
          customStyles="text-xs"
          />
        ) : (
          <>
          <CustomButton
          type='outline'
          title='AI Logo'
          handleClick={() => handleSubmit('logo')}
          customStyles='text-xs'
          />
          <CustomButton
          type='filled'
          title='AI Full'
          handleClick={() => handleSubmit('full')}
          customStyles='text-xs'
          />
          </>
        )
        }
      </div>
    </div>
  )
}

export default AiPicker