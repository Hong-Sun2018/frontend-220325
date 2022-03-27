import Head from 'next/head';
// import Image from 'next/image';
import { Box } from '@mui/material';
import { memo } from 'react';
import PageContainer from '../components/PageContainer';
import HomeSignin from '../views/home/HomeSignin';
import HomeStatistics from '../views/home/HomeStatistics';
import { useSelector } from 'react-redux';

const Home = () => {

  const { username, user_id} = useSelector(state => state.userInfo.value);

  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <PageContainer pageTitle={'MySQL'}>
          {(username && username.length !== 0) ? <HomeStatistics /> :  <HomeSignin /> }
        </PageContainer>
      </Box>
    </div>
  )
}

export default memo(Home);