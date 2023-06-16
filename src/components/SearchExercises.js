import { Typography, Stack, Box, Button, TextField } from '@mui/material'
import {React, useEffect, useState} from 'react'
import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setsearch] = useState('')
  const [bodyParts, setBodyParts] = useState([])

useEffect(() => {
  const fetchExercisesData = async () => {
    const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions)
 
    setBodyParts(['all', ...bodyPartsData])  
  }
  fetchExercisesData()

}, [])



  const handleSearch = async () => {
    if (search) {
      const exerciseData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

        const searchedExercises = exerciseData.filter(
          (exercise) => 
          exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search))

          setsearch('')
          setExercises(searchedExercises)
    }
    window.scrollTo( { top: 1800, behavior: 'smooth'})
  }
  return (
      <Stack justifyContent='center' alignItems='center' mt='37px' p='20px'>
        <Typography fontWeight={700} 
        sx={{fontSize: { lg: '44px', xs: '30px'}}} 
        textAlign='center' mb='50px'>
          Awesome Exercises You<br/> Should Know
        </Typography>
        <Box position='relative' mb='72px'>
          <TextField
          sx={{
            input: {
              fontweight: '700',
              border: 'none',
              borderRadius: '6px'
            },
            width: { lg: '1170px', xs: '350px'},
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
          height='76px' value={search}
          onChange={(e)=> setsearch(e.target.value.toLowerCase())} 
          placeholder='Search Exercises' type='text'
          />
          <Button className='search-btn' 
          sx={{
            bgcolor: '#ff2625',
            color: 'white',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px'},
            fontSize: { lg: '20px', xs: '14px'},
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
          onClick={handleSearch}
          >Search</Button>
        </Box>
        <Box sx={{ position: 'relative', width: '100%', p: '20px'}}>
           <HorizontalScrollbar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts/>
        </Box>
      </Stack>
  )
}

export default SearchExercises