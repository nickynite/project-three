import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


// like function




function LikeBtn() {
    const [likes, setLikes] = useState(0);


    return <button className="like-button" title="Like this worry" aria-label="Like this worry" onClick={() => setLikes(likes +1)}><FontAwesomeIcon icon={ faHeart } className="heart-icon"/>{likes} </button>

}

export default LikeBtn;
