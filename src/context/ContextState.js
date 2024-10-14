import React from "react";
import MyCont from "./MyCont";
import { useState } from "react";

export default function ContextState(props) {
  const [isOpen, setIsOpen] = useState("false");
  const [blogs, setBlogs] = React.useState([]);
  const [isSignUp,setSignUp] = React.useState(false)
  const [filterCategory,setFilterCategory]=React.useState("")
  const [isLogin,setLogin]=useState("SignIn");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    description: "",
    category: "",
    image: "",
  });
  return (
    <MyCont.Provider value={{ isOpen, setIsOpen, blogs, setBlogs,formData,setFormData,isSignUp,setSignUp ,isLogin,setLogin,filterCategory,setFilterCategory}}>
      {props.children}
    </MyCont.Provider>
  );
}
