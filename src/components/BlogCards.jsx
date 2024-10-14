import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./BlogCards.css";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DailyDigest from "./DailyDigest";
import MyCont from "../context/MyCont";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";


export default function RecipeReviewCard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isIndex, setIsIndex] = useState(null);
  const { formData, setFormData } = useContext(MyCont);
  const Name = localStorage.getItem('Name')
  const [expanded, setExpanded] = React.useState(false);
  const [blogs, setBlogs] = React.useState([]);
  const {filterCategory,setFilterCategory}=useContext(MyCont);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get(`http://localhost:8000/Api/GetBlog?category=${filterCategory}`);
        setBlogs(response.data); 
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchBlogs(); 
  }, [filterCategory]); 

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setIsIndex(index);
    // navigate(`/Description/${blogs[index].id}`);
  };
  const handleClick1 = async (type) => {
    if (type === "edit") {
      const Qid = blogs[isIndex].id;
      navigate(`/PostBlog?id=${Qid}`);
    } else {
      navigate("/PostBlog");
    }
  };

  const handleViewClick = () => {
    handleClose();
    navigate(`/Description/${blogs[isIndex].id}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {/* <DailyDigest/> */}
      <div className="Feed">
        <div className="cards">
          <h1 className="heading1">FEATURED</h1>
          {blogs?.map((blog, index) => {
            return (
              <Card
                key={index}
                className="PartCard"
                sx={{  marginBottom: "20px" }}
              >
                {/* <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {blog.firstName?.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <Tooltip title="settings">
                      <IconButton aria-label="settings">
                        <MoreVertIcon onClick={(e) => handleClick(e, index)} />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleViewClick}>View</MenuItem>
                        <MenuItem onClick={(e) => handleClick1("edit")}>
                          Update
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                    </Tooltip>
                  }
                  title={blog.firstName}
                  subheader="September 14, 2016"
                /> */}
                <CardMedia
                  component="img"
                  height="194"
                  image={`http://localhost:8000/static/${blog.image}`}
                  alt="Paella dish"
                />
                {/* {console.log(blog)} */}
                <CardContent>
                  <Typography>
                    <h4 className="title">{blog.title}</h4>
                  </Typography>
                  <Typography>
                    <p className="desc">{blog.description}</p>
                  </Typography>
                  <Typography>
                    <p className="footer">{Name}|12 September 2019</p>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
