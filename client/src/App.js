import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Feed from './pages/Feed'
import SideNav from './components/SideNav';
import Navbar from './components/Navbar'
import TagsBar from './components/TagsBar';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login'
import Publish from './pages/Publish';

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

const PostRoute = () => {
  return(
    <>
      <Navbar />
      <div className="grid grid-cols-layout ">
        <SideNav />
          <Publish />
        <TagsBar />
      </div>
    </>
  )
}


const App = () => {
  return (
    <div className="App font-inter">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/feed" />} />
          <Route path="/feed" element={<FeedRoutes />} />
          <Route path="/question/:id" element={<QuestionRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publish" element={<PostRoute />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
