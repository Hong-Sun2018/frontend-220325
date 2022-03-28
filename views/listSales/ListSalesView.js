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
import ListResult from './ListResult';


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
});

const ListSalesView = () => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [minDateStr, setMinDateStr] = useState('');
  const [maxDateStr, setMaxDateStr] = useState('');
  const [minDate, setMinDate] = useState(new Date('2020-01-01'));
  const [maxDate, setMaxDate] = useState(new Date('2020-01-01'));
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState('C001');
  const [startDate, setStartDate] = useState(new Date('2020-01-01'));
  const [endDate, setEndDate] = useState(new Date('2020-01-01'));
  const [saleList, setSaleList] = useState([]);

  //////////////////////////// Loading initial data //////////////////////////////////
  useEffect(() => {
    getCityList();
    getMinAndMaxDate();
  }, []);

  const getCityList = () => {
    const url = api('GetCities');
    axios.get(url, { withCredentials: true }).then(res => {
      if (res && res.data) {
        //console.log(res.data.result);
        const cList = [];
        //console.log(h1List);
        for (const item of res.data.result) {
          //console.log('items: ', item[0]);
          cList.push(item[0]);
        }
        //console.log(h1List);
        setCityList(cList);
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
  const changeCity = (event) => {
    setCity(event.target.value);
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
    const url = `${api('ListSales')}?city=${city}&start_date=${getDateStr(startDate)}&end_date=${getDateStr(endDate)}`;
    axios.get(url, {withCredentials: true}).then(res => {
      if (res && res.data){
        console.log(res.data.result);
        setSaleList(res.data.result);
      }
    }).catch(err => {
      console.log(err);
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
              <InputLabel id={'category1-label'} >City</InputLabel>
              <Select labelId={'category1-label'} id={'city'} value={city} onChange={changeCity}>
                {cityList.length > 0 && cityList.map((item, index) => {
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
      <ListResult listSales={saleList}/>
    </Box>
  );
}

export default memo(ListSalesView)