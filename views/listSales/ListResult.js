import { makeStyles } from '@mui/styles';
import { Box, Typography, Grid } from '@mui/material';
import { memo, useState, useEffect } from 'react';

const useStyles = makeStyles({
  resultContainer: {
    marginTop: '100px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    marginTop: '30px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    marginTop: '0px',
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  typo: {
    textAlign: 'center',
    margin: '10px'
  }
})

const ListResult = ({ listSales }) => {
  console.log('listSales__: ', listSales)
  const classes = useStyles();

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(listSales);
    console.log(listSales);
  }, [listSales])

  const round = (str) => {
    return parseInt(str)
  }

  const format = (str) => {
    if (str.toString().length===1){
      return `0${str}`;
    }
    else{
      return str;
    }
  }

  console.log('format___:   ', format('3'))

  return (
    <Box className={classes.resultContainer}>
      <Typography variant={'h4'}>
        Query Result
      </Typography>
      <Grid container alignItems={'center'} justifyContent={'center'}>
        <Grid item sm={12} xs={12}>
          <Box className={classes.headerContainer} >
            <Box className={classes.numberContainer} >
              <Typography variant={'h5'} color={'gray'}>
                city_id:
              </Typography>
            </Box>
            <Box className={classes.numberContainer} >
              <Typography variant={'h5'} color={'gray'}>
                hierar_1_id:
              </Typography>
            </Box>
            <Box className={classes.numberContainer} >
              <Typography variant={'h5'} color={'gray'}>
                yyyy-MM:
              </Typography>
            </Box>
            <Box className={classes.numberContainer} >
              <Typography variant={'h5'} color={'gray'}>
                Sum quantity:
              </Typography>
            </Box>
          </Box>
        </Grid>
        {listSales && listSales.length > 0 && listSales.map((item, index) => {

          return (
            <Grid item sm={12} xs={12} key={index}>
              <Box className={classes.container} >
                <Box className={classes.numberContainer} >
                  <Typography className={classes.typo} variant={'p'} >
                    {item[0]}
                  </Typography>
                </Box>
                <Box className={classes.numberContainer} >
                  <Typography className={classes.typo} variant={'p'} >
                    {item[1]}
                  </Typography>
                </Box>
                <Box className={classes.numberContainer} >
                  <Typography className={classes.typo} variant={'p'} >
                    {`${item[2]}-${format(item[3])}`}
                  </Typography>
                </Box>
                <Box className={classes.numberContainer} >
                  <Typography className={classes.typo} variant={'p'} >
                    {round(item[4])}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
        <Grid item sm={4} xs={12}>
          <Box className={classes.numberContainer} >
            <Typography className={classes.typo} variant={'h6'} >

            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ListResult;