/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const CLIENT_ID = "8af09710ed01df4fceb0";

function App() {
  const[rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({})


useEffect(() => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const codeParam = urlParams.get("code");
  console.log(codeParam);


  if(codeParam && (localStorage.getItem("accessToken") === null)) {
    async function getAccessToken () {
      await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
        method: "GET"
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        if(data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          setRerender(!rerender);
        }

      })
    }
    getAccessToken();
  }

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

async function getUserData() {
  await fetch("http://localhost:4000/getUserData", {
    method: "GET",
    headers: {
      "Authorization" :"Bearer " +localStorage.getItem("accessToken") 
    }
  }).then((response) => {
    return response.json();
}).then((data) => {
  console.log(data);
  setUserData(data);

})
}


  function loginWithGithub() {
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  }

  return (
    <div className="App">
      <header className="App-header">
        {localStorage.getItem("accessToken")?
        <>
         <h1> Github Analytical Dashboard</h1>
         <button onClick={() => {localStorage.removeItem("accessToken"); setRerender(! rerender);}}>
          Logout
         </button>
         <h3>
          Get User Data from Github api
         </h3>
         <button onClick={getUserData}>Get Data </button>
         {Object.keys(userData).length !== 0 ?
         <>
          <h4> Hey There {userData.login}</h4>
      
         </>
         :
         <>
         </>
         }
        </>
        :
         <>
         <h3> User is not logged in</h3>
         <button onClick={loginWithGithub}>
          Sign-in with Github
         </button>
         </>
         }
      </header>
    </div>
);
}

export default App;
