import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


// like button function - stretch goal was to connect likes count to firebase, but was unsuccessful. 


function LikeBtn(props) {
   const handleClick = () => {
    //  this function will increment the likes.
    console.log("like button click", props);
    props.incrementLikes(props.id);

   }

    return <button className="likeButton" title="Like this worry" aria-label="Like this worry" onClick={ handleClick }><FontAwesomeIcon icon={ faHeart } className="heartIcon"/>{props.likes} </button>
}

export default LikeBtn;
