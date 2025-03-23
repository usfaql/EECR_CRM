import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import { Route, Router, Routes } from 'react-router-dom';
import RepairOrder from './RepairOrder/RepairOrder';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/repair-orders' element={<RepairOrder/>}/>
      </Routes>
    </div>
  );
}

export default App;
