import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


// like button function - stretch goal was to connect likes count to firebase, but was unsuccessful. 


function LikeBtn() {
    const [likes, setLikes] = useState(0);

    return <button className="likeButton" title="Like this worry" aria-label="Like this worry" onClick={(like) => setLikes(likes +1)}><FontAwesomeIcon icon={ faHeart } className="heartIcon"/>{likes} </button>
}

export default LikeBtn;
