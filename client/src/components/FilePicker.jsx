//FilePicker has to be hardcoded
import React from 'react'
import CustomButton from './CustomButton'
const FilePicker = ({file, setFile, readFile}) => {
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input
        id='file-upload'
        type='file'
        accept='image/*'//this makes sure that only images can be uploaded
        onChange={(e) => { setFile(e.target.files[0]) }}//sets the file to the first file in the array
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload File
        </label>
        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file === '' ? 'No file selected' : file.name}
        </p>
        <div className='mt-4 flex flex-wrap gap-3 py-20'> 
          <CustomButton
            type='outline'
            title='Logo'
            handleClick={() => readFile('logo')}
            customStyles='font-bold text-xs'
          />
          <CustomButton
            type='filled'
            title='Full'
            handleClick={() => readFile('full')}
            customStyles='font-bold text-xs'
          />
        </div>
      </div>
    </div>
  )
}

export default FilePicker