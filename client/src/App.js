import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Feed from './pages/Feed'
import SideNav from './components/SideNav';
import Navbar from './components/Navbar'
import TagsBar from './components/TagsBar';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login'
const FeedRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-layout ">
        <SideNav />
          <Routes>
            <Route path='/' element={<Feed />} />
          </Routes>
          <TagsBar />
      </div>
    </>
  )
}

const QuestionRoute = () => {
  console.log("called this rn")
  return (
    <>
      <Navbar />

      <div className="grid grid-cols-new-layout ">
        <SideNav />
        <SinglePost />
      </div>
    </>
  )
}


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/feed" />} />
          <Route path="/feed" element={<FeedRoutes />} />
          <Route path="/question/:id" element={<QuestionRoute />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
