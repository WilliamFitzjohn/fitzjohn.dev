
import './styles/Job.css'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';
import { BiBuildings } from 'react-icons/bi';
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

    function getSkills(){
        if(!props.skills || props.skills.length === 0){return null}
        return (
            <div className='job-skills-section'>
                <h4>Key Skills & Technologies</h4>
                <div className='job-skills-container'>
                    {props.skills.map((skill, index) => (
                        <span className='job-skill-badge' key={index}>{skill}</span>
                    ))}
                </div>
            </div>
        );
    }

    function getMetadata(){
        if(!props.location && !props.type){return null}
        return (
            <div className='job-metadata'>
                {props.location && (
                    <div className='job-metadata-item'>
                        <HiLocationMarker />
                        <span>{props.location}</span>
                    </div>
                )}
                {props.type && (
                    <div className='job-metadata-item'>
                        <BiBuildings />
                        <span>{props.type}</span>
                    </div>
                )}
            </div>
        );
    }

    function getChevron(){
        if(dropdown){
            return(<BsChevronDown className='job-chevron-selected'/>);
        }else{
            return(<BsChevronDown/>);
        }
    }

    function getDropdownClasses(){
        if(dropdown){
            return 'job-dropdown-container job-dropdown-container-selected';
        }else{
            return 'job-dropdown-container'
        }
    }

    function getDropdown(){
        return(
            <div className={getDropdownClasses()}>
                <div className='job-dropdown-left'>
                    {getImg()}
                    {getMetadata()}
                </div>
                <div className='job-dropdown-right'>
                    <div className='job-desc-container'>
                        {getDesc()}
                    </div>
                    {getSkills()}
                </div>
            </div>
        );
    }

    return(
        <div className="job-container">
            <div className="job-header clickable" onClick={toggleMenu}>
                <div className="job-title-left unselectable">
                    <h2>{props.comp}</h2>
                    <h2>{props.title}</h2>
                </div>
                <div className="job-title-right unselectable">
                    <h2>{props.year}</h2>
                    {getChevron()}
                </div>
            </div>
            {getDropdown()}
        </div>
    );
}

export default Job;