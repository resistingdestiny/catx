// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports

// ** Icon Imports



const CardStatsHorizontal = props => {
  // ** Props

  return (
    <Card>
      <CardContent sx={{ py: theme => `${theme.spacing(4.125)} !important` }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
         
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant='h6'>27</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                
                <Typography variant='caption' >
                 4
                </Typography>
              </Box>
            </Box>
            <Typography variant='caption'>Title</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardStatsHorizontal