import ContextState from "./context/ContextState";
import MyCont from "./context/MyCont";
import DailyDigest from "./components/DailyDigest";
import BlogCards from "./components/BlogCards";
import Description from "./components/Description"
import SideBar from "./components/SideBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useContext } from "react";
// import SignUp from "./components/SignUp";
// import Parent from "./Parent";
import AdminPanel from "./components/AdminPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import MyBlogs from "./components/MyBlogs";


function App() {

  return (
    <Router>
      <ContextState>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/PostBlog" element={<AdminPanel />}/>
          <Route path="/login" element = {<SignIn/>} />
          <Route path="/SignUp" element = {<SignUp/>} />
          <Route path="/MyBlogs" element = {<MyBlogs/>} />
          <Route path="/Description/:isId" element={<Description />} />
          <Route path="*" element={<h1>404 Page not found</h1>} />
        </Routes>
      </ContextState>
    </Router>
  );
}
function Home() {
  const { isSignUp,setSignUp} = useContext(MyCont);
  return (
    <>
       {/* {isSignUp && <SignUp/>} */}
      <DailyDigest />
      <SideBar/>
      <BlogCards />
    </>
  );
}
export default App;
