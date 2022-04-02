import './styles/Resume.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';
import { BsBoxArrowInLeft } from 'react-icons/bs';

function Resume() {
    function backClick(){
        window.location.href = "/";
    }

    return (
        <Container className='body-container'>
            <section className='title-section'>
                <div onClick={backClick}>
                    <BsBoxArrowInLeft/>
                    <p className='unselectable'>Back</p>
                </div>
                <h2>Resume</h2>
            </section>
            <section className='bg-section unselectable'>
                <h1>Creator</h1>
                <h1>Engineer</h1>
                <h1>Developer</h1>
            </section>
            <section className='content-container'>

            </section>
        </Container>
    );
}
  
export default Resume;
  