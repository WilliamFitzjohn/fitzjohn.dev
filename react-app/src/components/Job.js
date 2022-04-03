
import './styles/Job.css'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { useState } from 'react';

function Job(props) {

    const [dropdown, setDropdown] = useState(false);

    function toggleMenu(){
        setDropdown(!dropdown);
    }

    function getDesc(){
        if(dropdown){
            return(
                <div className='job-desc-container'>
                    <p>{props.desc}</p>
                </div>
            );
        }else{return null;}
    }

    function getChevron(){
        if(dropdown){
            return(<BsChevronUp/>);
        }else{
            return(<BsChevronDown/>);
        }
    }

    return(
        <div className="job-container">
            <div className="job-header" onClick={toggleMenu}>
                <div className="job-title-left">
                    <h2>{props.comp}</h2>
                    <h2>{props.title}</h2>
                </div>
                <div className="job-title-right">
                    <h2>{props.year}</h2>
                    {getChevron()}
                </div>
            </div>
            {getDesc()}
        </div>
    );
}

export default Job;