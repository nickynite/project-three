// import from react
import { useState, useEffect } from 'react';
// import firebase
import firebase from '../firebase.js';
// import styles
import "../styles/App.css";
// import components
import Logo from "./Logo.js";
import IntroText from "./IntroText.js";
import LikeBtn from './LikeBtn.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



function App() {

  // Initialize state
const [ worryList, setWorryList ] = useState([]);
const [ userInput, setUserInput ] = useState("");

// a variable that holds a reference to the database
const dbRef = firebase.database().ref();


// useEffect for my Firebase value listener
useEffect( () => {
  dbRef.on('value', (response) => {
    const data = response.val();
    // console.log(data);
    const newState = [];
  
  for (let key in data) {

    // creating an object with key + name(worry), and then push the object into newState empty array.
    const worryObject = {
      key: key,
      name: data[key].userWorry,
      likes: 4
    }
    newState.push(worryObject);
    console.log(worryObject.likes);

  }  
    setWorryList(newState);
  })
}, [])

// will run anytime there is a change in the input this event is attached to
const handleChange = (event) =>{
  // Update the state of our app component to the current value of the input field, handleChange is attached down below on the input of the form.
  setUserInput(event.target.value);
}

// This function is attached to the input button of the form
const handleClick = (event) => {
  event.preventDefault();
  console.log("this form was submitted!");

// creating a reference to the database
  const dbRef = firebase.database().ref();

//  Pushing the value that userInput has to the database
const worryObject = { userWorry : userInput, likes : 4 }
  // dbRef.push(userInput);
  dbRef.push(worryObject);
  console.log(worryObject.likes);
// resetting the state to an empty string
  setUserInput("");
}



// a function for removing list items
const handleRemove = (key) => {
// Create a reference to our Firebase database
const dbRef = firebase.database().ref();
// Go get the specific node (ie the property) which we want to delete in Firebase and REMOVE IT.
dbRef.child(key).remove();
}





// // A function that will dislay an error message if nothing is entered
// const handleError = () => {
//   setErrorMessage("Please release your worry");
// }

// // A function that submits users input to firebase
// const handleSubmit = () => {
//   userInput ? acceptSubmit() : handleError()
//   setUserInput("");
// }

// // a function that pushes the users post to database
// const acceptSubmit = () => {
//   dbRef.push(userInput);
//   setErrorMessage("");
// }


  return (

    <div className="App">
      <div className="wrapper">
        <header>
          <Logo />
          <IntroText />
        </header>  
      </div>  

{/* FORM BEGINS HERE */}
  <div id="myForm" className="myForm">
    <h2>Submit a worry to release it into the ether</h2>
        <form action="submit" id ="form" onSubmit={ handleClick }>
          <label htmlFor="yourWorry"></label>
          <input
          type="text"
          id="yourWorry"
          placeholder="I'm worried about..."
          maxLength="50"
          onChange={ handleChange }
          value={ userInput } />
        </form>

        <button className="submitWorry" onClick={ handleClick }>Submit</button>
  </div>

    
  <div className="worryListContainer">
        <ul>
          { worryList.map((worry) => {
            return (
              <div key={ worry.key }>
                <li>
                <button className="RemoveBtn" title="Let go of this worry" aria-label="Let go of this worry" onClick={ () => handleRemove(worry.key) }><FontAwesomeIcon icon={ faTimes } className="RemoveIcon"/></button>
                  <p>{ worry.name }</p>
                  
                  <LikeBtn />
                </li>
              </div>  
            )
          })}
        </ul>
  </div>

  <footer> Created at Juno College 2021 </footer> 
  

</div>
  )
};

export default App;
