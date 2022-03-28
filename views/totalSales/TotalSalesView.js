import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import api from '../../api';
import { makeStyles } from '@mui/styles';
import { Box, Grid, InputLabel, Select, MenuItem, Typography, FormControl } from '@mui/material';
import { Button, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useDispatch } from 'react-redux';
import { setDialogMsg } from '../../redux/reducer/DialogReducer';



const useStyles = makeStyles({
  root: {
    width: '80%',
    // minWidth: '800px',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  select: {
    width: '245px'
  },
  resultContainer: {
    marginTop: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    marginTop: '30px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  typo: {
    textAlign: 'center',
    margin:'30px'

  }
});

const TotalSalesView = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [minDateStr, setMinDateStr] = useState('');
  const [maxDateStr, setMaxDateStr] = useState('');
  const [minDate, setMinDate] = useState(new Date('2020-01-01'));
  const [maxDate, setMaxDate] = useState(new Date('2020-01-01'));
  const [h1List, setH1List] = useState([]);
  const [h1, setH1] = useState('H01');
  const [startDate, setStartDate] = useState(new Date('2020-01-01'));
  const [endDate, setEndDate] = useState(new Date('2020-01-01'));
  const [sumQuantity, setSumQuantity] = useState('0');
  const [sumRevenue, setSumRevenue] = useState('0')

  //////////////////////////// Loading initial data //////////////////////////////////
  useEffect(() => {
    getHierarchy1List();
    getMinAndMaxDate();
  }, []);

  const getHierarchy1List = () => {
    const url = api('GetH1List');
    axios.get(url, { withCredentials: true }).then(res => {
      if (res && res.data) {
        //console.log(res.data.result);
        const h1List = [];
        //console.log(h1List);
        for (const item of res.data.result) {
          //console.log('items: ', item[0]);
          h1List.push(item[0]);
        }
        //console.log(h1List);
        setH1List(h1List);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  const getMinAndMaxDate = () => {
    const url = api('GetMinMaxDate');
    axios.get(url, { withCredentials: true }).then(res => {
      if (res && res.data) {
        //console.log(res.data.result[0]);
        setMinDate(new Date(res.data.result[0][0]));
        setStartDate(new Date(res.data.result[0][0]));
        setMinDateStr(res.data.result[0][0]);
        setMaxDate(new Date(res.data.result[0][1]));
        setEndDate(new Date(res.data.result[0][1]));
        setMaxDateStr(res.data.result[0][1]);
        //console.log('maxDataStr', maxDateStr)
      }
    }).catch(err => {
      console.log(err);
    });
  }

  /////////////////////////// Event handeler /////////////////////////////
  const changeH1 = (event) => {
    setH1(event.target.value);
  }

  const changeStartDate = (newValue) => {
    if (newValue >= minDate && newValue <= maxDate && newValue <= endDate ){
      setStartDate(newValue);
    } else {
      //console.log(minDateStr)
      dispatch(setDialogMsg(`pick date between ${minDateStr} and ${maxDateStr}`))
    }
  }

  const changeEndDate = (newValue) => {
    if (newValue >= minDate && newValue <= maxDate && newValue >= startDate ){
      setEndDate(newValue)
    } else {
      //console.log(minDateStr)
      dispatch(setDialogMsg(`pick date between ${minDateStr} and ${maxDateStr}`))
    }
  }

  const handleQuery = () => {
    setSumQuantity('Loading...');
    setSumRevenue('Loading...')
    const url = `${api('GetSum')}?h1=${h1}&start_date=${getDateStr(startDate)}&end_date=${getDateStr(endDate)}`;
    axios.get(url, {withCredentials: true}).then(res => {
      if (res && res.data){
        console.log(res.data);
        setSumQuantity(res.data.result[0][0]);
        setSumRevenue(res.data.result[0][1]);
      }
    }).catch(err => {
      console.log(err);
      setSumQuantity('0');
      setSumRevenue('0');
      dispatch(setDialogMsg('Error..'))
    })
  }

  const getDateStr = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`
  }

  return (
    <Box className={classes.root}>
      <Grid container alignItems={'center'} justifyContent={'center'} spacing={4}>
        <Grid item md={3} sm={12} xs={12}>
          <Box className={classes.container}>
            <FormControl variant={'standard'} className={classes.select}>
              <InputLabel id={'category1-label'} >Hierarchy1</InputLabel>
              <Select labelId={'category1-label'} id={'h1'} value={h1} onChange={changeH1}>
                {h1List.length > 0 && h1List.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <Box className={classes.container}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="yyyy-MM-dd"
                value={startDate}
                onChange={changeStartDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <Box className={classes.container}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="yyyy-MM-dd"
                value={endDate}
                onChange={changeEndDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item md={3} sm={12} xs={12}>
          <Box className={classes.container}>
            <Button variant={'contained'} sx={{textTransform: 'none', width: '150px'}} onClick={handleQuery}>
              Query
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* ////////////////////////////// Result Display /////////////////////////////*/}
      <Box className={classes.resultContainer}>
        <Typography variant={'h4'}>
          Query Result
        </Typography>
        <Grid container alignItems={'center'} justifyContent={'center'}>
          <Grid item sm={4} xs={12}>
            <Box className={classes.numberContainer} >
              <Typography variant={'h5'} color={'gray'}>
                Total Quantity: 
              </Typography>
              <Typography className={classes.typo} variant={'h6'} >
                &nbsp;{sumQuantity}&nbsp;
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={4} xs={12}>
          <Box className={classes.numberContainer} >
            <Typography variant={'h5'} color={'gray'}>
                Total Revenue: 
              </Typography>
              <Typography className={classes.typo}  variant={'h6'} >
                &nbsp;{sumRevenue}&nbsp;
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default memo(TotalSalesView)