import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import AlertBox from './components/Alert';

import { useEffect, useState } from 'react';


// set login token 
// const setUserLogin = (token)=>{
//   setLoginToken(token);
// }
function App() {
  //get user login token
  let userToken = localStorage.getItem('loginToken') || '';
  const [loginToken, setLoginToken] = useState(userToken);
  
  // set user name after login
  let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
  const [userName , setUserName] = useState('');
  const [userImage , setUserImage] = useState('');

  //logout user 
  const logOutUser = ()=>{
    localStorage.removeItem('loginToken');
    setLoginToken('');
  }
  // on page load check user is login with valid detail
  const usersToken = JSON.parse(localStorage.getItem('users')) || [];
  const userLogin = (token) =>{ 
    if(loginToken){
      if(usersToken.indexOf(token) == '-1'){
        setLoginToken('');
        localStorage.removeItem('loginToken');
      }
    }
  }
  useEffect(()=>{
    userLogin(loginToken);
    if(loginToken){
      for(let i = 0; i < allUsers.length; i++){
        const userAuth = allUsers[i];
        if(userAuth.loginToken === loginToken){
            setUserName(userAuth.username);
            setUserImage(userAuth.image);
            break;
        }
      }
    }
    
  },[loginToken]);

  

  const [alert, setAlert] = useState();
  const showAlert =(variant, message)=>{
    setAlert({variant : variant, message : message});
    setTimeout(()=>{setAlert(false)},2500)
  }
  return (
    <>
    <Navbar loginToken={loginToken} logOutUser={logOutUser} username = {userName} userImage={userImage}/>
      <AlertBox alert={alert} />
      {loginToken ? <Blog showAlert={showAlert} loginToken = {loginToken}/> : <SignIn loginToken={loginToken} setLoginToken={setLoginToken} setUserName = {setUserName} setUserImage = {setUserImage} showAlert={showAlert}/>}
    <Footer/>
    </> 
  );
}

export default App;
