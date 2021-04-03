import logo from './logo.svg';
import styles from "./App.module.css";

import Layout from './hoc/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import XorMartContainer from './containers/XorMart';

function App() {
  return (
    <BrowserRouter> 
    <div>
      <Layout>
      <XorMartContainer />
      </Layout>
    </div>
    </BrowserRouter>
  );
}

export default App;
