
import './styles/Certification.css'
import { BsLink45Deg } from 'react-icons/bs';

function Certification(props) {

    function getLinkIcon() {
        if (props.url) {
            return (
                <BsLink45Deg />
            );
        }
        return (
            <div className="certification-link-placeholder"></div>
        );
    };

    // Determine clickable class
    const clickable = props.url ? 'clickable' : '';

    // Handle click to open link
    function handleClick() {
        if (props.url) {
            window.open(props.url, '_blank', 'noopener,noreferrer');
        }
    }

    return(
        <div className="certification-container" onClick={handleClick} style={props.url ? { cursor: 'pointer' } : {}}>
            <div className={`certification-header ${clickable}`}>
                <div className="certification-title-left unselectable">
                    <h2>{props.org}</h2>
                    <h2>{props.title}</h2>
                </div>
                <div className="certification-title-right unselectable">
                    <h2>{props.date}</h2>
                    {getLinkIcon()}
                </div>
            </div>
        </div>
    );
}

export default Certification;