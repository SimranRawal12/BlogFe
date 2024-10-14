import * as React from "react";
import Card from "@mui/material/Card";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CategoryIcon from "@mui/icons-material/Category";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useContext } from "react";
import MyCont from "../context/MyCont";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import DailyDigest from "./DailyDigest";
import axios from "axios";

import { useState, useEffect } from "react";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import { Navigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import "./MyBlogs.css";

// import SideBar from "./SideBar";

export default function MyBlogs() {
  const { formData, setFormData } = useContext(MyCont);
  const navigate = useNavigate();
  const { isLogin, setLogin } = useContext(MyCont);
  const [blogs, setBlogs] = React.useState([]);
  const [isDelete, setDelete] = React.useState(false);
  const [isEdit, setEdit] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authToken = localStorage.getItem("key");
  const PostId = queryParams.get("id");
  const userId = localStorage.getItem("id");

  console.log(isEdit, "hghgdz");

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      setLogin("SIGNOUT");
    }
  }, []);

  const [myPosts, setMyPosts] = useState([]);
  async function fetchBlogs() {
    try {
      const response = await axios.get("http://localhost:8000/Api/GetBlog");
      setBlogs(response.data);
      // console.log(response.data.category);
      // console.log(blogs[0].category)
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
  React.useEffect(() => {
    fetchBlogs();
  }, []);
  const handleClick = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      image: "",
    });
    navigate("/PostBlog");
  };

  const getUserBlogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/Api/MyBlogs/${userId}`
      );
      const data = response?.data;
      setMyPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlesetDelete = (e) => {
    e.preventDefault();
    setDelete(true);
  };
  const handlesetEdit = (e) => {
    e.preventDefault();
    setEdit(true);
  };
  const handleEdit = async (post,postId) => {
    setFormData({
      title: post.title,
      description: post.description,
      category: post.category,
      image: post.image,
    });
    console.log(postId);
    navigate(`/PostBlog/?id=${postId}`);
    // console.log(formData);
  };

  const handleDelete = async (postId) => {
    try {
      console.log(postId);
      await axios.delete(`http://localhost:8000/Api/DeleteBlog/${postId}`);
      setBlogs((blogs) => blogs.filter((blog) => blog.id !== postId));
      getUserBlogs();
    } catch (error) {
      console.error("There was an error deleting the row!", error);
    }
  };
  useEffect(() => {
    if (isEdit) {
      console.log(isEdit);
    }
  }, [isEdit]);
  useEffect(() => {
    if (isDelete) {
      console.log(isDelete);
    }
  }, [isDelete]);

  useEffect(() => {
    if (userId) {
      getUserBlogs();
    }
  }, []);
  const date = dayjs(myPosts.createdAt);
  const formattedDate = date.format("MMMM DD YYYY");
  return (
    <>
      <DailyDigest />
      <div style={{ display: "flex", height: "89vh", width: "300px" }}>
        <Sidebar id="leftsidebar" className="app">
          <Menu>
            <MenuItem className="menu1" icon={<MenuRoundedIcon />}>
              <h2 className="quick">QUICKLOOK</h2>
            </MenuItem>
            <MenuItem icon={<GridViewRoundedIcon />} className="labelColor">
              {" "}
              {myPosts.firstName}'s Profile{" "}
            </MenuItem>
            <SubMenu
              icon={<CategoryIcon />}
              className="labelColor"
              label="Categories"
              defaultOpen
            >
              {blogs?.map((blog, index) => {
                // console.log(blog);
                return <MenuItem key={index}> {blog.category} </MenuItem>;
              })}
            </SubMenu>
            <SubMenu
              icon={<ReadMoreIcon />}
              className="labelColor"
              label="Settings"
              defaultOpen
            >
              <MenuItem onClick={handleClick}> Post a Blog</MenuItem>
              <MenuItem onClick={handlesetDelete}> Delete a blog </MenuItem>
              <MenuItem onClick={handlesetEdit}>Edit a blog </MenuItem>
            </SubMenu>

            <SubMenu
              icon={<LibraryBooksIcon />}
              className="labelColor"
              label="Magazines"
              defaultOpen
            >
              <MenuItem> Cover Story </MenuItem>
              <MenuItem> Editor's Note </MenuItem>
              <MenuItem> Interview </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      </div>
      <div className="MainPage">
        <div className="header">
          <h2> Welcome {myPosts.firstName + " " + myPosts.lastName}</h2>
        </div>
        <Card className="MainBody" sx={{ maxWidth: 1000 }}>
          <h1 className="cardHead">My Posted Blogs</h1>
          {myPosts?.userBlogs?.map((Posts, index) => {
            return (
              <Card className="innerCard" key={index}>
                <CardMedia
                  component="img"
                  height="194"
                  image={`http://localhost:8000/static/${Posts.image}`}
                  alt="Paella dish"
                />

                <CardContent>
                  {isDelete && (
                    <IconButton   onClick={() => handleDelete(Posts.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                  )}
                  {isEdit && (
                    <IconButton  onClick={() => handleEdit(Posts,Posts.id)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <Typography className="Title">
                    <h4 className="title">{Posts.title}</h4>
                  </Typography>

                  <Typography>
                    <p className="desc">{Posts.description}</p>
                  </Typography>
                  <Typography>
                    <p className="footer">{formattedDate}</p>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Card>
      </div>
    </>
  );
}
