import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Feed from './pages/feed'
import SideNav from './components/SideNav';
import Navbar from './components/Navbar'
import TagsBar from './components/TagsBar';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login'
import Publish from './pages/Publish';
import Signup from './pages/Signup';
import User from './pages/User';
import Users from './pages/Users'
import TagQuestions from './pages/TagQuestions';
import SearchQuestions from './pages/SearchQuestions';
const FeedRoutes = () => {
  return (
    <div className=''>
      <Navbar />
      <div className="grid lg:grid-cols-layout max-w-[1600px] m-auto ">
        <SideNav tab={1}/>
          <Routes>
            <Route path='/' element={<Feed />} />
          </Routes>
          <TagsBar />
      </div>
    </div>
  )
}

const QuestionRoute = () => {
  return (
    <>
      <Navbar />
      <div className="grid lg:grid-cols-new-layout max-w-[1600px] m-auto ">
        <SideNav tab={1} />
        <SinglePost />
      </div>
    </>
  )
}

const PublishRoute = () => {
  return(
    <>
      <Navbar />
      <div className="grid lg:grid-cols-layout max-w-[1600px] m-auto ">
        <SideNav />
          <Publish />
        <TagsBar />
      </div>
    </>
  )
}

const UserRoute = () => {
  return(
    <>
      <Navbar/>
      <div className="grid lg:grid-cols-layout max-w-[1600px] m-auto ">
        <SideNav tab={3} />
          <User />
        <TagsBar />
      </div>
    </>
  )
}

const UsersRoute = () => {
  return (
    <>
      <Navbar/>
      <div className="grid grid-cols-layout ">
        <SideNav tab={3} />
          <Users />
        <TagsBar />
      </div>
    </>
  )
}

const TagRoute = () => {
  return(
    <>
    <Navbar />
    <div className="grid lg:grid-cols-layout max-w-[1600px] m-auto ">
      <SideNav tab={1} />
        <Routes>
          <Route path='/' element={<TagQuestions />} />
        </Routes>
        <TagsBar />
    </div>
  </>
  )
}

const SearchRoute = () => {
  return(
    <>
    <Navbar />
    <div className="grid lg:grid-cols-layout max-w-[1600px] m-auto ">
      <SideNav tab={1} />
        <Routes>
          <Route path='/' element={<SearchQuestions />} />
        </Routes>
        <TagsBar />
    </div>
  </>
  )
}


const App = () => {
  return (
    <div className="App font-inter dark:bg-dark ">
      <div className="App font-inter dark:bg-dark ">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/feed" />} />
          <Route path="/feed" element={<FeedRoutes />} />
          <Route path="/question/:id" element={<QuestionRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/publish" element={<PublishRoute />} />
          <Route path="/user/:username" element={<UserRoute />} />
          <Route path="/users" element={<UsersRoute />} />
          <Route path="/tag/:tagName" element={<TagRoute />} />
          <Route path="/search" element={<SearchRoute />} />
        </Routes> 
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
