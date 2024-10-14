import React from "react";
import { useContext } from "react";
import Swal from "sweetalert2";
import DailyDigest from "./DailyDigest";
import MyCont from "../context/MyCont";
// import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@material-ui/core/Typography";
import "./AdminPanel.css";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import DailyDigest from "./DailyDigest";

export default function AdminPanel() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Id = queryParams.get("id");
  // const Id = queryParams.get(id);
  // console.log(Id)
  const navigate = useNavigate();
  const { setIsOpen, isOpen } = useContext(MyCont);
  const { isLogin, setLogin } = useContext(MyCont);
  const { formData, setFormData } = useContext(MyCont);
  const authToken = localStorage.getItem("key");
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      setLogin("SIGNOUT");
    }
  }, []);

  // useEffect(() => {
  //   if (blogId) {
  //     const response = axios
  //       .get(`http://localhost:8000/Api/Description/${blogId}`)
  //       .then((response) => {
  //         setFormData(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching blog data:", error);
  //       });
  //   }
  // }, [blogId]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    if (Id) {
      // console.log(formData);
      try {
        const response = await axios.put(
          `http://localhost:8000/Api/Update/${Id}`,
          formData
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log(formData)
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          position: "center",
          icon: "fail",
          title: "Error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      const data = new FormData();
      data.append("image", formData?.image);
      data.append("firstName", formData?.firstName);
      data.append("title", formData?.title);
      data.append("description", formData?.description);
      data.append("category", formData?.category);
      data.append("lastName", formData?.lastName);
      data.append("userId", id);
      try {
        const response = await axios.post(
          "http://localhost:8000/Api/PostBlog",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log(formData)
        navigate("/");
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          position: "center",
          icon: "fail",
          title: "Error",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  // console.log({isOpen});
  return (
    <>
      <DailyDigest />
      <div className="Container">
        <div className="formBox">
          <br />
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h1 className="heading ">Write Your Blog Here!!</h1>
            <form
              className="InputForm"
              action="/PostBlog"
              method="POST"
              encType="multipart/form-data"
            >
              <Grid container spacing={5}>
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    variant="outlined"
                    value={formData.description}
                    // multiline // Allow multi-line input
                    // rows={10}
                    onChange={handleChange}
                    type="text"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="category"
                    name="category"
                    label="Category"
                    variant="outlined"
                    value={formData.category}
                    onChange={handleChange}
                    type="text"
                    select
                  >
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Entertainment">Entertainment</MenuItem>
                    <MenuItem value="LifeStyle">LifeStyle</MenuItem>
                    <MenuItem value="WildLife">WildLife</MenuItem>
                    <MenuItem value="Internet">Internet</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    id="image"
                    name="image"
                    label="Upload Image"
                    variant="outlined"
                    // value={formData.image}
                    onChange={handleFileChange}
                    type="file"
                    // placeholder=""
                    InputProps={{
                      inputProps: {
                        placeholder: "", // Set placeholder to empty string
                      },
                      startAdornment: (
                        <InputAdornment position="start">Upload</InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: { color: "#1976d2" }, // Change the color of the label
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </div>
        {/* } */}
      </div>
    </>
  );
}
