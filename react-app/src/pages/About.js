import './styles/About.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';
import { BsBoxArrowInLeft } from 'react-icons/bs';

function About() {
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
                <h2>About</h2>
            </section>
            <section className='bg-section unselectable'>
                <h1>Creator</h1>
                <h1>Engineer</h1>
                <h1>Developer</h1>
            </section>
            <section className='about-me-container'>
                <img className='me' src='./imgs/Me.JPG'></img>
                <div>
                    <h3>Hello, I'm William</h3>
                    <p>I’m an English software developer that loves to build stuff :)</p>
                </div>
            </section>
            <section className='career-container'>
                <h1>Career</h1>
            </section>
        </Container>
    );
}
  
export default About;
  