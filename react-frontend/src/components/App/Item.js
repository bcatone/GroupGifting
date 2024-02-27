import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import Data from "./TestData.json";

const Item = () => {
  const params = useParams();
  const id = Number(params.id);
  const data = Data;
  const selectedItem = data.find((item) => item.id === id);

  console.log(selectedItem);

  const [mainImage, setMainImage] = useState("");
  const [commentForm, setCommentForm] = useState(false); // Added missing state

  useEffect(() => {
    setMainImage(selectedItem.images[0]);
  }, [selectedItem.images]); // Added dependency array

  const commentBox = useRef(null); // Added missing useRef

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleCommentClick = async () => {
    await setCommentForm((prevCommentForm) => !prevCommentForm);
    scrollToSection(commentBox);
  };

  const handleCommentChange = (event) => {
    // Handle comment change
  };

  const handleCommentSubmit = () => {
    // Handle comment submit
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
          width: "50vw",
          marginTop: "1em",
        }}
      >
        <h1 style={{ textAlign: "center" }}>{selectedItem.title}</h1>
        <div style={{ textAlign: "center" }}>
          <img
            id="yarnpic"
            src={mainImage}
            alt="main picture"
            style={{ maxWidth: "100%" }} // Remove margin on image
          />
        </div>
        <div className="small-image-box">
          {selectedItem.images.map((image) => (
            <img
              key={image}
              src={image}
              className="smallpic"
              onClick={() => handleImageChange(image)}
            />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            component="h4"
            sx={{ marginY: 0, marginBottom: "1em", marginTop: "1em" }}
          >
            {selectedItem.description}
          </Typography>
          <Typography variant="body1" component="p" sx={{ marginY: 0 }}>
            Deadline:
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{ marginY: 0, color: "green" }}
          >
            {selectedItem.deadline}
          </Typography>
        </div>
      </div>
      <div
        style={{ marginTop: "2em", marginBottom: "1em", textAlign: "center" }}
      >
        <Typography variant="h5">Comments:</Typography>
        {/* Add user's comments for the item here: */}
        <div className="btn-margin-bottom">
          {" "}
          <Button onClick={handleCommentClick}>Add a Comment</Button>{" "}
          {commentForm === true ? (
            <div ref={commentBox} className="commentBox">
              <p>Your comment must be at least 10 characters.</p>
              {/* Your comment is currently x character */}
              <textarea
                rows={10}
                cols={50}
                name="text"
                // value={comment.text}
                // onChange={handleCommentChange}
                type="text"
                className="cBox margB1"
              />
              <Button
                style={{ marginTop: "1em", marginBottom: "1em" }}
                // onClick={handleCommentSubmit}
              >
                Submit
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Item;
