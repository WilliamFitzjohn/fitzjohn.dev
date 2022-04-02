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
                    img='PersonalWebLogo.png'
                    name='Portfolio Website'
                    tools='React, HTML, CSS'
                    desc='A small website to show myself off.'
                />
                <Project 
                    img='UniSearchLogo.ico'
                    name='UniSearch'
                    tools='React, Flask, Python, Node.js'
                    desc='A group project that scrapes the UofGuelph / UofWaterloo course databases and allows users to search and graph courses.'
                />
                <Project 
                    img='GDLogo.png'
                    name='Going Ductless Website'
                    tools='WordPress'
                    desc='Contract work for a previous employer to show off their business'
                />
                <Project 
                    img='QuizBotLogo.png'
                    name='QuizBot'
                    tools='Node.js, JavaScript'
                    desc='Contract work for an angel investing firm to deliver course content to their clients. The discord chat bot was built using entirely Node.js'
                />
                <Project 
                    img='GPXLogo.png'
                    name='GPX Data Viewer'
                    tools='HTML, JavaScript, Node.js, C, MySQL'
                    desc='A full stack CRUD web app that works with GPX files that track GPS coordinates. Backend coded in C, frontend in JavaScript, HTML, CSS. Linked to a MySQL database.'
                />
                <Project 
                    img=''
                    name='PurpleXOR'
                    tools='Java'
                    desc='A Minecraft mod using the Forge API which added new items and blocks into the game. This was my first programming project at age 13.'
                />
                {/* 
                <Project 
                    img=''
                    name=''
                    tools=''
                    desc=''
                />
                */}
            </section>
        </Container>
    );
}
  
export default Projects;
  