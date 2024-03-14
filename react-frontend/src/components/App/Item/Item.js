import React, { useState, useEffect, useRef } from "react";
import { Typography, Dialog, DialogContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchItemById } from "../../../redux/slices/itemSlice";
import CommonButton from "../Common/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../Common/categories";
import CategoryButton from "../Common/CategoryButton";

const Item = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch();
  const commentBox = useRef(null);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({
    title: "",
    category: "",
    location: "",
    status: "",
    recipent_id: "",
    suggested_donation_amount: "",
    is_public: false,
    deadline: "",
    created_at: "",
    updated_at: "",
    images: [],
  });

  const category = categories.find((cat) => cat.name === item.category);

  ////// To Do
  // get comment data
  /// add post request etc. for comment from here
  /// add functionality to make user be able to request item and reflect on backend and on here

  useEffect(() => {
    const fetchEntry = async () => {
      const result = await dispatch(fetchItemById(id));
      setItem(result.payload);
    };

    fetchEntry();
  }, [id, dispatch]);

  const [mainImage, setMainImage] = useState(
    "https://www.traceyroad.com/wp-content/plugins/elementor/assets/images/placeholder.png"
  );
  const [commentForm, setCommentForm] = useState(false); // Added missing state

  useEffect(() => {
    if (item.images) {
      setMainImage(item.images[0]);
    }
  }, [item.images]); // Added dependency array

  const auth = useSelector((state) => state.auth);

 
  const userZip = useSelector((state) => state.auth.user.zip);

  console.log(userZip)

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

    // want this to only happen the first time the button is clicked
    scrollToSection(commentBox);
  };

  const handleCommentChange = (event) => {
    // Handle comment change
  };

  const handleCommentSubmit = () => {
    // Handle comment submit
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TimeDisplay = ({ timeObject }) => {
    return item.time_until_deadline ? (
      <>
        {Object.entries(timeObject).map(
          ([unit, value]) =>
            value > 0 &&
            unit !== "seconds" && (
              <div key={unit} style={{ marginRight: ".5em" }}>
                {value === 1
                  ? `${value} ${unit.slice(0, -1)}`
                  : `${value} ${unit}`}
              </div>
            )
        )}
      </>
    ) : null;
  };

  return (
    <>
      <div>
        <h1 className="center">{item.title}</h1>
        <div className="center">
          <img
            id="yarnpic"
            className="big_img"
            src={
              mainImage ||
              "https://www.traceyroad.com/wp-content/plugins/elementor/assets/images/placeholder.png"
            }
            alt="main picture"
            style={{ maxWidth: "100%" }}
            onClick={handleOpen}
          />
        </div>
        <div>
          <Dialog open={open} onClose={handleClose} maxWidth="auto">
            <DialogContent>
              <img
                src={
                  mainImage ||
                  "https://www.traceyroad.com/wp-content/plugins/elementor/assets/images/placeholder.png"
                }
              ></img>
            </DialogContent>
          </Dialog>
        </div>
        <div className="small-image-box">
          {item.images?.map((image) => (
            <img
              key={image}
              src={image}
              className="smallpic"
              onClick={() => handleImageChange(image)}
            />
          ))}
        </div>
        <div className="center">
          {category && category.color && (
            <CategoryButton
              backgroundColor={category.color}
              disableHover="true"
            >
              {item.category}
            </CategoryButton>
          )}
          <Typography
            variant="h5"
            component="h4"
            sx={{ marginY: 0, marginBottom: "1em", marginTop: "1em" }}
          >
            {item.description}
          </Typography>
          <Typography variant="body1" component="p" sx={{ marginY: 0 }}>
            Listing ends in:
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              marginY: 0,
              color: "green",
              marginBottom: "1em",
              display: "flex",
            }}
          >
            <TimeDisplay timeObject={item.time_until_deadline} />
          </Typography>
        </div>
      </div>
      <div className="right">
        <CommonButton>Request Item</CommonButton>
      </div>

      <div
        style={{
          marginTop: "2em",
          marginBottom: "1em",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "1em" }}>
          Comments:
        </Typography>
        {/* Add user's comments for the item here: */}
        <div className="btn-margin-bottom">
          {" "}
          {commentForm === false && auth.isAuthenticated ? (
            <CommonButton onClick={handleCommentClick}>
              Add a Comment
            </CommonButton>
          ) : null}
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
              <CommonButton
                style={{ marginTop: "1em", marginBottom: "1em" }}
                // onClick={handleCommentSubmit}
              >
                Submit
              </CommonButton>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Item;
