import React from "react";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import { Link } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// import firebase from 'firebase/app'
// import 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'

import firebase from "../Firebase/Firebase";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random/?books)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  close: {
    padding: theme.spacing(0.5)
  }
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const [name, setName] = useState();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [verifyPassword, setVerifyPassword] = useState();
  const [open, setOpen] = React.useState();
  const [err, setErr] = useState();

  function myname(event) {
    setName(event.target.value);
  }
  function mylogin(event) {
    setLogin(event.target.value);
  }
  function mypass(event) {
    setPassword(event.target.value);
  }
  function myverifypass(event) {
    setVerifyPassword(event.target.value);
  }
  function showError() {
    setOpen(true);
  }
  function handlechangehistoryToHome() {
    props.history.push({ pathname: "/" });
  }
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }
  function handleKeyPress(e) {
    if (e.charCode === 13) {
      signup();
    }
  }
  function signup() {
    if (!name) {
      setErr("Please Enter Your Name");
      showError();
    } else if (!login) {
      setErr("Please Enter Your Email");
      showError();
    } else if (password !== verifyPassword) {
      setErr("Passwords Don't Match");
      showError();
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(login, password)
        .then(() => {
          if (firebase.auth().currentUser !== null) {
            firebase.auth().currentUser.updateProfile({
              displayName: name
            });
            const db = firebase.firestore();
            const userinfo = db.collection("userinfo").doc(user.uid);

            userinfo.set({
              all: [],
              read: [],
              willread: [],
              reading: []
            });
          }
          handlechangehistoryToHome();
        })
        .catch(function(error) {
          console.log(error.message);
          setErr(error.message);
          setOpen(true);
        });
    }
  }
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={myname}
                onKeyPress={handleKeyPress}
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={mylogin}
                onKeyPress={handleKeyPress}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                n
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={mypass}
                onKeyPress={handleKeyPress}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={myverifypass}
                onKeyPress={handleKeyPress}
                name="verifyPassword"
                label="Verify Password"
                type="password"
                id="verifyPassword"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                onClick={signup}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign up
              </Button>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                  "aria-describedby": "message-id"
                }}
                message={<span id="message-id">{err}</span>}
                action={[
                  <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                ]}
              />

              {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                </Link>
                            </Grid>
                            <Grid item>
                                <Link to='/login' >
                                    Have an account</Link>
                            </Grid>
                        </Grid> */}
              <Box mt={5} />
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
