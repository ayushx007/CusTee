import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio'; // state management
import config from '../config/config'; // backend URLs
import state from '../store';
import { download } from '../assets'; // download icon
import { downloadCanvasToImage, reader } from '../config/helpers'; // helper functions
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'; // default values
import { fadeAnimation, slideAnimation } from '../config/motion'; // framer motion animations
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components'; // custom components

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

  // This function shows tab content depending on which tab is active
  const generateTabContent = (tab) => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return (
          <FilePicker
            file={file}
            setFile={setFile} // comes from useState
            readFile={readFile}
          />
        );
      case 'aipicker':
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  // This function is async because we want it to wait for the image to be generated
  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt'); // If prompt is empty, then it will return an alert
    try {
      // Calling the backend API
      setgeneratingImg(true);
      const res = await fetch('https://project-threejs-ai-dalle-backend.onrender.com/api/v1/dalle, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await res.json();
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (err) {
      alert(err);
    } finally {
      setgeneratingImg(false);
      setactiveEditorTab(''); // Resetting the active tab
    }
  };

  const handleDecals = (type, res) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = res; // Updates the logo decal or full decal state
    if (!activeFilterTab[decalType.filterTab]) {
      // Checks if the decal selected is already active
      handleActiveFilterTab(decalType.filterTab); // If not, then it sets the active filter tab to the decal type
    }
  };

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
    // After setting the state, we have to update the active filter tab
    setactiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file, type).then((res) => {
      // Reader function is used to read the file and convert it to base64
      handleDecals(type, res);
      setactiveEditorTab(''); // Resetting the active tab
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      setactiveEditorTab(tab.name);
                    }}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
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
  );
};

export default Customiser;
