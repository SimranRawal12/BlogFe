import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./SideBar.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CategoryIcon from "@mui/icons-material/Category";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MyCont from "../context/MyCont";
import { useContext } from "react";
import axios from "axios";
import { CardActionArea } from "@mui/material";
export default function SideBar() {
  const [recentblogs, setrecentBlogs] = React.useState([]);
  const [blogs, setBlogs] = React.useState([]);
  const { setFilterCategory } = useContext(MyCont);
  React.useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get("http://localhost:8000/Api/GetBlog?category=");
        setBlogs(response.data);
        // console.log(response.data.category);
        // console.log(blogs[0].category)
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchBlogs();
  }, []);
  React.useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/Api/recent-blogs"
        );
        setrecentBlogs(response.data);
      } catch (error) {
        console.error("Error fetching recent blogs:", error);
      }
    };

    fetchRecentBlogs();
  }, []);

  const setCategory = (category) => {
    setFilterCategory(category);
  };

  return (
    <>
      <div style={{ display: "flex", height: "89vh", width: "300px" }}>
        <Sidebar id="leftsidebar" className="app">
          <Menu>
            <MenuItem className="menu1" icon={<MenuRoundedIcon />}>
              <h2 className="quick">QUICKLOOK</h2>
            </MenuItem>
            <MenuItem icon={<GridViewRoundedIcon />} className="labelColor">
              {" "}
              Dashboard{" "}
            </MenuItem>
            <SubMenu
              icon={<ReadMoreIcon />}
              className="labelColor"
              label="Recommendations"
              defaultOpen
            >
              <MenuItem> Food </MenuItem>
              <MenuItem>Nature is Peace </MenuItem>
              <MenuItem> Parrots </MenuItem>
            </SubMenu>
            <SubMenu
              icon={<CategoryIcon />}
              className="labelColor"
              label="Categories"
              defaultOpen
            >
              {/* {blogs?.map((blog, index) => {
                // console.log(blog);
                return <MenuItem key={index}> {blog.category} </MenuItem>;  
              })} */}
              {[...new Set(blogs?.map((blog) => blog.category))].map(
                (category, index) => {
                  return (
                    <MenuItem key={index} onClick={() => setCategory(category)}>
                      {category}
                    </MenuItem>
                  );
                }
              )}
            </SubMenu>
            {/* <SubMenu
              icon={<LibraryBooksIcon />}
              className="labelColor"
              label="Magazines"
              defaultOpen
            >
              <MenuItem> Cover Story </MenuItem>
              <MenuItem> Editor's Note </MenuItem>
              <MenuItem> Interview </MenuItem>
            </SubMenu> */}
          </Menu>
        </Sidebar>
      </div>
      <div
        className="rightsidebar"
        id="right"
        style={{ display: "flex", height: "89vh" }}
      >
        <Sidebar className="app" id="rightbar">
          <Menu>
            <MenuItem className="menu1">
              <h2 className="quick">TOP STORIES</h2>
            </MenuItem>
            {recentblogs.map((recentblog, index) => (
              <Card key={index} className="card1" sx={{ maxWidth: 400 }}>
                <CardActionArea>
                  <CardMedia
                    className="sideBarImage"
                    component="img"
                    height="140"
                    image={`http://localhost:8000/static/${recentblog.image}`}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {recentblog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {recentblog.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
