
import './styles/Job.css'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { useState } from 'react';

function Job(props) {

    const [dropdown, setDropdown] = useState(false);

    function toggleMenu(){
        setDropdown(!dropdown);
    }

    function getImg(){
        if(props.img == null){
            return null;
        }else{
            return(
                <a href={props.imglink} target='_black'>
                    <img className='job-image unselectable' alt={props.comp} src={'imgs/' + props.img}/>
                </a>
            );
        }
    }

    function getDesc(){
        if(!props.desc){return null}
        return props.desc.map((description, index) => {
            return (
                <p className='job-desc-li' key={index}>{description}</p>
            )
        });
    }

    function getChevron(){
        if(dropdown){
            return(<BsChevronUp/>);
        }else{
            return(<BsChevronDown/>);
        }
    }

    function getDropdown(){
        if(!dropdown){return null}
        return(
            <div className='job-dropdown-container'>
                {getImg()}
                <div className='job-desc-container'>
                    {getDesc()}
                </div>
            </div>
        );
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
            {getDropdown()}
        </div>
    );
}

export default Job;