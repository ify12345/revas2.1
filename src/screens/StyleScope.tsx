import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Typography } from '@mui/material'

export default function StyleScope() {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <div className="flex flex-col  p-20 space-y-20 w-1/2">
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <p className='underline text-red-500 text-3xl'>Typography</p>
        <Typography variant="h1" gutterBottom>
          h1. Heading
        </Typography>
        <Typography variant="h2" gutterBottom>
          h2. Heading
        </Typography>
        <Typography variant="h3" gutterBottom>
          h3. Heading
        </Typography>
        <Typography variant="h4" gutterBottom>
          h4. Heading
        </Typography>
        <Typography variant="h5" gutterBottom>
          h5. Heading
        </Typography>
        <Typography variant="h6" gutterBottom>
          h6. Heading
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="button" gutterBottom sx={{ display: 'block' }}>
          button text
        </Typography>
        <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
          caption text
        </Typography>
        <Typography variant="overline" gutterBottom sx={{ display: 'block' }}>
          overline text
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        <p className='underline text-red-500 text-3xl'>Buttons</p>
        <Button size="small" variant="outlined">
          Small
        </Button>
        <Button size="medium" variant="outlined">
          Medium
        </Button>
        <Button size="large" variant="outlined">
          Large
        </Button>
        <Button size="large" variant="contained">
          Primary
        </Button>
        <Button variant="outlined">Outlined</Button>
        <Button color="secondary">Secondary</Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <p className='underline text-red-500 text-3xl'>Form Control</p>
        <div>
          <TextField
            label="With normal TextField"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              },
            }}
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <FormHelperText id="outlined-weight-helper-text">
              Weight
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
        </div>
        <div>
          <TextField
            label="With normal TextField"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              },
            }}
            variant="filled"
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
            <FilledInput
              id="filled-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="filled-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <FormHelperText id="filled-weight-helper-text">
              Weight
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
            <FilledInput
              id="filled-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div>
          <TextField
            label="With normal TextField"
            id="standard-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">kg</InputAdornment>
                ),
              },
            }}
            variant="standard"
          />
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
            <Input
              id="standard-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <FormHelperText id="standard-weight-helper-text">
              Weight
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
        </div>
      </Box>
    </div>
  )
}
