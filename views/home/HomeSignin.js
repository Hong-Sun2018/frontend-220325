import { Box, Button, Typography, TextField, Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setDialogMsg } from '../../redux/reducer/DialogReducer';
import axios from 'axios';
import api from '../../api'
import { setUserInfo } from '../../redux/reducer/UserInfoReducer';
import { useRouter } from 'next/router';
 
const useStyles = makeStyles(
  {
    root: {
      width: '60%',
      maxWidth: '400px',
      minWidth: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'yellow'
    },
    input: {
      width: '100%',
      marginBottom: '10px',
      marginTop: '10px',
    },
    buttonBox: {
      display: 'flex',
    },
    button: {
      display: 'block',
      marginTop: '10px',
      marginBottom: '10px',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
);

const HomeSignin = () => {

  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  } 

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.keyCode == 13){
      handleSignIn();
    }
  }

  const handleSignIn = () => {
    
    if (username.length == 0 || password.length == 0){
      dispatch(setDialogMsg('Username or password cannot be empty. '));
      return;
    }

    const url = api('SignIn');
    const reqBody = {
      username: username,
      password: password,
    };

    // console.log(reqBody);
    axios.post(url, reqBody, {withCredentials:true})
      .then((res) => {
        if(res.data){
          console.log(res.data)
          dispatch(setUserInfo(res.data));
          router.push('/');
        }
      })
      .catch((error) => {
        if (!error.response){
          dispatch(setDialogMsg('Server not responding, check internet connection.'));
        }
        else if (error.response.status == 401){
          dispatch(setDialogMsg('Incorrect username or password.'));
        
        }
        else {
          dispatch(setDialogMsg('Unknow error.'));
        }
      })
  }

  return (
    <Box className={classes.root}>
      <TextField className={classes.input} id={'username'} label={'Username'} variant={'filled'} 
        onChange={handleChangeUsername} size={'small'}
      />
      <TextField className={classes.input} id={'password'} label={'Password'} variant={'filled'} type={'password'} size={'small'}
        onChange={handleChangePassword} onKeyDown={handleKeyDown}
      />
      <Grid container alignItems={'center'} justifyContent={'center'} spacing={2}>
      <Grid item xs={12} sm={6}>
          <Button className={classes.button} sx={{ textTransform: 'none' }} variant={'contained'} onClick={handleSignIn}>
            Sign In
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link href={'/signup'}>
            <Button className={classes.button} sx={{ textTransform: 'none' }} variant={'outlined'} >
              Sign Up
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(HomeSignin);