import axios from 'axios';
import api from '../../../api';
import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setDialogMsg } from '../../../redux/reducer/DialogReducer';

const useStyles = makeStyles({
  root:{
    width: '100%',
  },
  container: {
    width: '200px',
    height: '250px',
    boxShadow: '5px 5px 5px #cccccc',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '30px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px',
    borderRadius: '10px',
    borderColor: '#cccccc'
  }
});

const StatisticsCard = ({type}) => {

  const classes = useStyles();
  const [number, setNumber] = useState(0);
  const dispatch = useDispatch();
  const keyGetNum = '';
  const keyClear = '';
  const keyRead = '';

  if (type == 'Product') {
    keyGetNum = 'GetProdNumMysql';
    keyRead = 'ReadProdFromFile';
    keyClear = 'ClearProd';
  }
  else if (type == "Sale"){
    keyGetNum = 'GetSaleNumMysql';
    keyRead = 'ReadSaleFromFile';
    keyClear = 'ClearSale';
  }
  else {
    keyGetNum = 'GetStoreNumMysql';
    keyRead = 'ReadStoreFromFile';
    keyClear = 'ClearStore';
  }  

  useEffect(() => {
    getNum();
  }, []);

  const getNum = () => {
    const url = api(keyGetNum);
    axios.get(url, {withCredentials: true}).then(res => {
      if (res && res.data){
        // console.log(res.data)
        setNumber(res.data.count);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const handleRead = () => {
    const url = api(keyRead);
    axios.post(url, {}, {withCredentials: true}).then(res => {
      if (res && res.data){
        //console.log(res.data);
        getNum();
        dispatch(setDialogMsg(res.data.msg));
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const handleClear = () => {
    const url = api(keyClear);
    axios.delete(url, {withCredentials: true}).then(res => {
      if (res && res.data){
        //console.log(res.data);
        getNum();
        dispatch(setDialogMsg(res.data.msg));
      }
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.container} >
        <Typography variant={'h6'} color={'gray'}>{`Number of ${type}s:`}</Typography>
        <Box sx={{width: '100%'}}>
          <hr />
        </Box>
        <Typography variant={'h3'} sx={{margin: '30px'}}>{number}</Typography>
        <Box sx={{width: '100%', margin: '10px'}}>
          <hr />
        </Box>
        <Box sx={{width: '100%', marginBottom: '10px'}}>
          <Button variant={'contained'} sx={{textTransform:'none'}} onClick={handleRead}>Read From File</Button>
        </Box>
        <Box sx={{width: '100%', marginBottom: '10px'}}>
          <Button variant={'contained'} color={'error'} sx={{textTransform:'none'}} disabled={type == 'Sale'} onClick={handleClear}>&nbsp;&nbsp;&nbsp;&nbsp;Delete All&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
        </Box>
      </Box>
    </Box>
    
  );
}

export default memo(StatisticsCard);