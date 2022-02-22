import {isMobile} from 'react-device-detect';
import './App.css';
import "antd/dist/antd.css";
import MainDesktopPage from './pages/MainDesktopPage/MainDesktopPage';
import MainMobilePage from './pages/MainMobilePage/MainMobilePage';

function App() {
    if (isMobile) {
      return <div> <MainMobilePage /> </div>
    }
    return <div> <MainDesktopPage /> </div>
  
  }


export default App;
