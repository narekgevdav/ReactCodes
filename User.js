import React from 'react';

import Avatar from 'react-avatar';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import '../user/user.css'
import Modal from 'react-responsive-modal';
import { blue } from '@material-ui/core/colors';
import firebase from "../Firebase/Firebase"
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            userName: "",
            userPhoto: "",
            file: "",
            imagePreviewUrl: "",
            open: false,
        }
    }
    

    componentDidMount=()=>{
        const storageRef = firebase.storage().ref();
     storageRef.child('profilePhotos/' +sessionStorage.getItem("myid")+"_avatar.jpg").getDownloadURL().then(function(url) {
      let photo = url
      
     sessionStorage.myphotourl= photo;
     this.setState({
        userName: sessionStorage.getItem("myname"),
        userId: sessionStorage.getItem("myid"),
        userPhoto: sessionStorage.getItem("myphotourl")
               })
  })
        
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                userPhoto: reader.result
            }, console.log(file));
        }

        reader.readAsDataURL(file)
    }
    readValue() {
        let x = sessionStorage.getItem("myname");
        let y = sessionStorage.getItem("myid");
        let z = sessionStorage.getItem("myphotourl");
        const storageRef = firebase.storage().ref();
        storageRef.child('profilePhotos/' +y+"_avatar.jpg").put(this.state.file)
        
        let photo='profilePhotos/' +y+"_avatar.jpg"
       
            const user = firebase.auth().currentUser;
            if(user !== null){
                user.updateProfile({
                    photoURL: photo
                })
            }
            
     storageRef.child(photo).getDownloadURL().then(function(url) {
      
      sessionStorage.myphotourl= url;
  })

          
       

       

        console.log(x, y, user.photoURL);
    }
    render() {
        const { open } = this.state;
        return (
            <div>
                <Avatar className="avatar" size="200"
                    src={this.state.userPhoto}
                />

                <input className="fileInput"
                    type="file" onChange={(e) => this._handleImageChange(e)}
                />
                <TextField
                    style={{ right: "250px" }}
                    disabled
                    //    onChange={mylogin}
                    label={this.state.userName}
                    name='name'
                    defaultValue=""
                />
                <div>{console.log(this.props.location.foundBook)}</div>
                <Button
                    style={{ left: '250px', top: '28px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => this.readValue()}
                >
                    Save
         </Button>

                <div class="row">
                    <div className="col-lg-5">
                        <div className="media">
                            <a className="pull-left" href="#">
                                <img className="media-object dp img-circle"
                                    src={this.state.userPhoto}
                                    style={{ width: "300px", height: "300px" }}></img>
                            </a>
                            <div class="media-body">
                            </div>
                        </div>
                    </div>
                </div>







                <div className="container">
                    <div className="row">
                        <div className="panel panel-default">
                            <div className="panel-heading">  <h4 >User Profile</h4></div>
                            <div className="panel-body">
                                <div className="col-md-4 col-xs-12 col-sm-6 col-lg-4">
                                    <div class="row">
                                        <div className="col-lg-5">
                                            <div className="media">
                                                <a className="pull-left" href="#">
                                                    <img className="media-object dp img-circle"
                                                        src={this.state.userPhoto}
                                                        style={{ width: "300px", height: "300px" }}></img>
                                                </a>
                                                <div class="media-body">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-8 col-xs-12 col-sm-6 col-lg-8" >
                                    <div className="container" >
                                        <h2>John Doe</h2>
                                        <p>an   <b> Employee</b></p>

                                    </div>
                                </div>

                                <ul class="container details" >
                                    <li><p><span className="glyphicon glyphicon-user one"
                                        style={{ width: "50px" }}></span>i.rudberg</p></li>
                                    <li><p><span className="glyphicon glyphicon-envelope one"
                                        style={{ width: "50px" }}></span>somerandom@email.com</p></li>
                                </ul>

                                <div className="col-sm-5 col-xs-6 tital " >Date Of Joining: 15 Jun 2016</div>
                            </div>
                        </div>
                    </div>
                </div>





                <div class="container">
                    <div class="d-flex justify-content-center h-100">
                        <div class="image_outer_container">
                            <div class="green_icon"></div>
                            <div class="image_inner_container">
                                <div class="row">
                                    <div className="col-lg-5">
                                        <div className="media">
                                            <a className="pull-left" href="#">
                                                <img className="media-object dp img-circle"
                                                    src={this.state.userPhoto}
                                                    style={{ width: "200px", height: "200px" }}></img>
                                            </a>
                                            <div class="media-body">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <div class="container">
                    <div class="d-flex justify-content-center h-100">
                        <div class="image_outer_container">
                            <div class="green_icon"></div>
                            <div class="image_inner_container">
                                <img src={this.state.userPhoto}>
                                </img></div>
                        </div>
                    </div>
                </div>



                <Avatar className="avatar" size="200"
                    src={this.state.userPhoto}
                />

                <input className="fileInput"
                    type="file" onChange={(e) => this._handleImageChange(e)}
                />

                <div>
                    <div class="container">
                        <div class="d-flex justify-content-center h-100">
                            <div class="image_outer_container">
                                <div class="green_icon"></div>
                                <div class="image_inner_container">
                                    <img className="media-object dp img-circle"
                                        onClick={this.onOpenModal} src={this.state.userPhoto}>
                                    </img></div>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.onOpenModal}>Open modal</button>
                    <Modal className="myModal" open={open} onClose={this.onCloseModal} center>
                        <img className="media-object dp img-circle"
                            src={this.state.userPhoto}
                            style={{ width: "400px", height: "400px" }}></img>
                    </Modal>
                </div>

            </div>
        );
    }
}

export default User