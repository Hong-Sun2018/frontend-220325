import Layout from '../Layout';
import { Provider as StoreProvider } from 'react-redux';
import store from '../redux/Store';
import LoginProvider from '../components/LoginProvider';
import { Box } from '@mui/material';

const MyApp = ({ Component, pageProps }) => {
  return (
    <StoreProvider store={store} >
      <LoginProvider>
        <Layout >
          <Box sx={{ boxShadow: 3, marginBottom: '4px' }}>
            <Component {...pageProps} />
          </Box> 
        </Layout>
      </LoginProvider>
    </StoreProvider>
  );
}

export default MyApp;