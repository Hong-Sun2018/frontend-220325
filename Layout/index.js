import Header from './Header/';
// import Footer from "./Footer/Footer";
import DialogBox from '../components/DialogBox';
import { memo } from 'react';

 
const Layout = ({children}) => {

  return (
    <>
        <Header />
        { children }
        <DialogBox />
    </>
  );
}

export default memo(Layout);