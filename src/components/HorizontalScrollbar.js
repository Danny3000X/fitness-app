import React, { useContext } from 'react'
import { Box, Typography } from '@mui/material'
import BodyPart from './bodyPart' 
import ExerciseCard from './ExerciseCard'


import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

import RightArrowIcon from '../assets/icons/right-arrow.png'
import LeftArrowIcon from '../assets/icons/left-arrow.png'


const RightArrow = () => {
  const { scrollNext} = useContext(VisibilityContext);
return (
  <Typography onClick={() => scrollNext()} className='right-arrow'>
      <img src={RightArrowIcon} alt='left-arrow'/>
  </Typography>
)
}


const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} className='left-arrow'>
        <img src={LeftArrowIcon} alt='left-arrow'/>
    </Typography>
  )
}



const HorizontalScrollbar = ({ data, bodyPart, setBodyPart, isBodyParts }) => {


  
  return (
    <ScrollMenu RightArrow={RightArrow} LeftArrow={LeftArrow} >
        {data.map( (item) => (
            <Box itemId={item.id || item} key={item.id || item} title={item.id || item} m='0 40px'>
                {isBodyParts ? <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart}/> :
                <ExerciseCard exercise={item}/>}
            </Box>
        ))}
    </ScrollMenu>
  )
}

export default HorizontalScrollbar