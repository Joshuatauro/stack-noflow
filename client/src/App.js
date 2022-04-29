import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Feed from './pages/feed'
import SideNav from './components/SideNav';
import Navbar from './components/Navbar'
import TagsBar from './components/TagsBar';
const FeedRoutes = () => {
  return (
    <div className="grid grid-cols-layout ">
      <SideNav />
        <Routes>
          <Route path='/' element={<Feed />} />
        </Routes>
        <TagsBar />
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/feed" />} />
          <Route path="/feed" element={<FeedRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
