// import from react
import { useState, useEffect } from 'react';

// import Font Awesome Icons and Sweet Alert2
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

// import firebase
import firebase from '../firebase.js';
// import styles
import "../styles/App.css";
// import components
import Logo from "./Logo.js";
import IntroText from "./IntroText.js";
import LikeBtn from './LikeBtn.js';
import Footer from './Footer.js';


function App() {

  // Initialize state
const [ worryList, setWorryList ] = useState([]);
const [ userInput, setUserInput ] = useState("");


// useEffect for my Firebase value listener
useEffect( () => {

  // A variable that holds a reference to the database
  const dbRef = firebase.database().ref();

  dbRef.on('value', (response) => {
    const data = response.val();
    const newState = [];
    console.log(data)

    for (let key in data) {

      // Creating an object with key + name(worry), and then push the object into newState empty array.
      const worryObject = {
        key: key,
        worryText: data[key].worryText,
        likes: data[key].likes
      }
      
      newState.push(worryObject);
    } 

    setWorryList(newState);
  })
}, [])

// Will run anytime there is a change in the input this event is attached to
const handleChange = (event) =>{
  // Update the state of our app component to the current value of the input field, handleChange is attached down below on the input of the form.
  setUserInput(event.target.value);
}

// This function is attached to the input button of the form
const handleSubmit = (event) => {

  event.preventDefault();

  // Error handling with Sweet Alert2 alert box
  if (userInput === "") {
    return (
      Swal.fire({
        title: "Oh no!",
        text:"You forgot to type in your worry!",
        confirmButtonText: "OK",
        confirmButtonColor: "#ee7249",
      })
    )
  } else {
    
    console.log("this form was submitted!");
    // creating a reference to the database
      const dbRef = firebase.database().ref();
  //  Pushing the value that userInput has to the database
  const worryObject = { worryText : userInput, likes : 0 }
    // dbRef.push(userInput);
    dbRef.push(worryObject);
  // resetting the state to an empty string
    setUserInput("");
  }
}

const incrementLikes = (key) => {
  const likesRef = firebase.database().ref(`${ key }/likes`); 

  likesRef.set(firebase.database.ServerValue.increment(1))

}

// a function for removing list items
const handleRemove = (key) => {
  // Create a reference to our Firebase database
  const dbRef = firebase.database().ref();
  // Go get the specific node (ie the property) which we want to delete in Firebase and REMOVE IT.
  dbRef.child(key).remove();
}


// Output of the app
  return (
    <div className="App">
      <div className="wrapper">
        <header>
          <Logo />
          <IntroText />
        </header>  
      </div>  

{/* Form begins here */}
  <div id="myForm" className="myForm">
    <h2>Submit a worry to release it into the ether</h2>
        <form id ="form" onSubmit={ handleSubmit }>
          <label htmlFor="yourWorry"></label>
          <input
          type="text"
          id="yourWorry"
          placeholder="I'm worried about..."
          maxLength="50"
          onChange={ handleChange }
          value={ userInput } />
          <button className="submitWorry" type="submit">Submit</button>
        </form>      
  </div>

    {/* Container for user input */}
  <div className="worryListContainer">
        <ul>
          { worryList.map((worry) => {
            return (
              <div key={ worry.key }>
                <li>
                <button className="RemoveBtn" title="Let go of this worry" aria-label="Let go of this worry" onClick={ () => handleRemove(worry.key) }><FontAwesomeIcon icon={ faTimes } className="RemoveIcon"/></button>
                  <p>{ worry.worryText }</p>

                  <LikeBtn  likes={ worry.likes } incrementLikes={ incrementLikes } id={ worry.key }/>
                </li>
              </div>  
            )
          })}
        </ul>
  </div>

  <Footer />

</div>
)
};

export default App;

 