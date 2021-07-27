// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const IntroText = () => {
    return (
        <div className="introText">

            <h1>What are your worries?</h1> 
            <h2>Everyone has worries, but when we're experiencing anxiety we often feel alone.</h2>
            <h2>Worry wart is a place where you can name your anxiety, share it anonymously, and empathize with the worries of others.</h2>
            <h3>See others' worries and let go of yours.</h3>
            
        <a href="#myForm">
            <FontAwesomeIcon icon={ faChevronDown } className="arrow-down"/>
        </a>
    </div>
    )
}

export default IntroText;