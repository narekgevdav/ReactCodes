import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import firebase from "../Firebase/Firebase";


const ITEM_HEIGHT = 48;

export default function BookMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = firebase.auth().currentUser;
  const db = firebase.firestore();
  const location = props.status.params.key;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleRead() {
    console.log(props.status)
    const userinfo = db.collection("userinfo").doc(user.uid);
    userinfo.update({
      all: firebase.firestore.FieldValue.arrayUnion(props.ISBN),
      read: firebase.firestore.FieldValue.arrayUnion(props.ISBN)
    });
    if (location === "reading") {
      userinfo.update({
        reading: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    if (location === "willread") {
      userinfo.update({
        willread: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    setAnchorEl(null);
  }
  function handleWillRead() {
    const userinfo = db.collection("userinfo").doc(user.uid);
    userinfo.update({
      all: firebase.firestore.FieldValue.arrayUnion(props.ISBN),
      willread: firebase.firestore.FieldValue.arrayUnion(props.ISBN)
    });
    if (location === "reading") {
      userinfo.update({
        reading: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    if (location === "read") {
      userinfo.update({
        read: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    setAnchorEl(null);
  }
  function handleReading() {
    const userinfo = db.collection("userinfo").doc(user.uid);
    userinfo.update({
      all: firebase.firestore.FieldValue.arrayUnion(props.ISBN),
      reading: firebase.firestore.FieldValue.arrayUnion(props.ISBN)
    });
    if (location === "read") {
      userinfo.update({
        read: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    if (location === "willread") {
      userinfo.update({
        willread: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    setAnchorEl(null);
  }
  function handleRemove() {
    const userinfo = db.collection("userinfo").doc(user.uid);
    if (location === "read") {
      userinfo.update({
        all: firebase.firestore.FieldValue.arrayRemove(props.ISBN),
        read: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    if (location === "willread") {
      userinfo.update({
        all: firebase.firestore.FieldValue.arrayRemove(props.ISBN),
        willread: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    if (location === "reading") {
      userinfo.update({
        all: firebase.firestore.FieldValue.arrayRemove(props.ISBN),
        reading: firebase.firestore.FieldValue.arrayRemove(props.ISBN)
      });
    }
    setAnchorEl(null);
  }

  return (
    location != "all" && (
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          {location !== "read" && (
            <MenuItem key={"read"} selected={false} onClick={handleRead}>
              Read
            </MenuItem>
          )}
          {location !== "willread" && (
            <MenuItem
              key={"willRead"}
              selected={false}
              onClick={handleWillRead}
            >
              Will Read
            </MenuItem>
          )}
          {location !== "reading" && (
            <MenuItem key={"reading"} selected={false} onClick={handleReading}>
              Reading Now
            </MenuItem>
          )}
          {location !== "else" && (<MenuItem key={"remove"} selected={false} onClick={handleRemove}>
            Remove from my library
          </MenuItem>
          )}
        </Menu>
      </div>
    )
  );
}
