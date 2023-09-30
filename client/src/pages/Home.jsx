import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'//motion is a component that can animate elements, AnimatePresence is a component that allows us to animate elements that are being added or removed from the DOM
import {useSnapshot} from 'valtio'; //useSnapshot is a hook that returns the current state object, valtio is a react state management library
import state from '../store'
import {headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../config/motion'
import { CustomButton } from '../components';
const Home = () => {
    const snap = useSnapshot(state);
  return (
        <AnimatePresence>
            {snap.intro && (//checks if we are in intro section
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img src='./threejs.png' alt='logo'
                        className='w-8 h-8 object-contain' />
                    </motion.header>
                    <motion.div className='home-content' {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>
                                LET'S <br className='xl:block hidden'/> DO IT
                            </h1>
                        </motion.div>
                            <motion.div {...headContentAnimation}
                            className='flex flex-col gap-5'>
                                <p className='max-w-md font-normal text-gray-600 text-base'>
                                    Create your unique and and exclusive Tees with our 3D customizer. <strong>Unleash your imagination</strong> and define your own style.
                                </p>
                                <CustomButton
                                type="filled"
                                title="Customise It"
                                handleClick={()=> state.intro=false}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm" />    
                            </motion.div>
                        </motion.div>
                    </motion.section>
            )}
        </AnimatePresence>
  )
}

export default Home
