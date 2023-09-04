import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';//state management
import config from '../config/config';//backend urls
import state from '../store';
import { download } from '../assets';//download icon
import { downloadCanvasToImage, reader } from '../config/helpers';//helper functions
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';//default values
import { fadeAnimation, slideAnimation } from '../config/motion';//framer motion animations
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';//custom components
const Customiser = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setgeneratingImg] = useState(false);
  const [activeEditorTab, setactiveEditorTab] = useState('');
  const [activeFilterTab, setactiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,

  });
  const generateTabContent = (tab) => {//this shows tab content depending on which tab is active
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}//comes from useState
          readFile={readFile}
        />
      case 'aipicker':
        return <AIPicker />
      default:
        return null;  
    }
  }
  const handleDecals = (type, res) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = res;//updates the logo decal or full decal state
    if(!activeFilterTab[decalType.filterTab]){//checks if the decal selected is already active
      handleActiveFilterTab(decalType.filterTab);//if not, then it sets the active filter tab to the decal type
    }
  }
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    } 
    //after setting the state, we have to update the active filter tab
    setactiveFilterTab((prevState) => {
      return {
      ...prevState,
      [tabName]: !prevState[tabName]
    }})
  }
  const readFile = (type) =>{
    reader(file, type).then((res) => {//reader function is used to read the file and convert it to base64
      handleDecals(type, res);
      setactiveEditorTab=("");//resetting the active tab
    })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className='absolute top-0 left-0 z-10'
            {...slideAnimation("left")}>
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => { setactiveEditorTab(tab.name) }}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm" />
          </motion.div>
          <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customiser