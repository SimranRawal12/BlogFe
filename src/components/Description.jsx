import React from "react";
import DailyDigest from "./DailyDigest";
import "./Description.css";
import { useContext, useState, useEffect } from "react";
import MyCont from "../context/MyCont";
import axios from "axios";
import { useParams } from "react-router-dom";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Description() {
  const { blogs, setBlogs } = useContext(MyCont);
  const { isId } = useParams();
  const [desc, setdesc] = useState({
    category: "",
    description: "",
    firstName: "",
    image: "",
    lastName: "",
    title: "",
  });
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/Api/Description/${isId}`
        );

        const data = response?.data;
        setdesc({
          category: data.category,
          description: data.description,
          firstName: data.firstName,
          image: data.image,
          lastName: data.lastName,
          title: data.title,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <DailyDigest />
      <h1 className="data">
        <Card  className="card" >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {desc.firstName?.charAt(0)}
              </Avatar>
            }
            title={desc.firstName}
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="500"
            image={`http://localhost:8000/static/${desc.image}`}
            alt={desc.firstName}
          />
          <CardContent>
            <Typography className="title" variant="body2" color="text.secondary">
              {desc.title}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Description:</Typography>
              <Typography paragraph>{desc.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </h1>
    </div>
  );
}
