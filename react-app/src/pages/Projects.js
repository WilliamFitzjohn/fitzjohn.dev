import './styles/Projects.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import Project from '../components/Project'

function Projects() {
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
                <h2>Projects</h2>
            </section>
            <section className='bg-section unselectable'>
                <h1>Creator</h1>
                <h1>Engineer</h1>
                <h1>Developer</h1>
            </section>
            <section className='content-container'>
                <Project 
                    name='Discord Bot'
                    tools='Node.js, JavaScript'
                    desc='Contract work for an angel investing firm'
                />
                <Project 
                    name='Going Ductless Website'
                    tools='WordPress'
                    desc='Contract work for a previous employer'
                />
            </section>
        </Container>
    );
}
  
export default Projects;
  