import { Box, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'right',
    },
    links: {
      marginRight: '20px',
    }
  }
);

const navLinks = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Total Sales',
    link:'/total-sales'
  },
  {
    title: 'List Sales',
    link:'/list-sales'
  },
];

const NavBar = () => {

  const classes = useStyles();

  return (

    <Box className={classes.root}>
      {navLinks.map((item, index) => {
        return(
          <Box key={index} className={classes.links}>
            <Link key={index} href={item.link}>
              {item.title}
            </Link>
          </Box>
        );
      })}
    </Box>
  );
}

export default NavBar;