import './styles/Projects.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import Project from '../components/Project'

function Projects() {

    // On Load Transition
    const transitionEle = document.getElementsByClassName('page-transition');
    setTimeout(() => {
        // Open page transition
        for (let i = 0; i < transitionEle.length;i++){
            transitionEle[i].classList.remove('transition-active');
        }
        setTimeout(() => {
            //set timing to opposite direction
            let pt1 = document.getElementsByClassName("pt-1")[0];
            pt1.classList.remove('pt-1t');
            pt1.classList.add('pt-3t');
            let pt3 = document.getElementsByClassName("pt-3")[0];
            pt3.classList.remove('pt-3t');
            pt3.classList.add('pt-1t');
        },500);
    }, 200);

    function backClick(){
        const transitionEle = document.getElementsByClassName('page-transition');
        for (let i = 0; i < transitionEle.length;i++){
          transitionEle[i].classList.add('transition-active');
        }
        setTimeout(() => {
            window.location.href = "/#/";
            //set timing to opposite direction
            let pt1 = document.getElementsByClassName("pt-1")[0];
            pt1.classList.remove('pt-3t');
            pt1.classList.add('pt-1t');
            let pt3 = document.getElementsByClassName("pt-3")[0];
            pt3.classList.remove('pt-1t');
            pt3.classList.add('pt-3t');
        }, 500);
    }

    return (
        <Container className='body-container'>
            <section className='title-section'>
                <div onClick={backClick} className='clickable'>
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
            <section className='content-container projects-container'>
                <Project 
                    img='fitzjohnweddings.png'
                    name='Fitzjohn Weddings'
                    tools='Svelte, Nginx, Docker, Amazon S3'
                    desc='A wedding website hosting service with templates and configuration files.'
                    />
                <Project 
                    img='RFP_Gator_Logo.jpg'
                    name='RFP Gator'
                    tools='React, PocketBase, PlayWright, Docker'
                    desc='An RFP aggregation platform for monitoring canadian university projects.'
                    link='https://rfpgator.fitzjohn.dev/'
                    />
                <Project 
                    img='TwitchAlertLogo.png'
                    name='TwitchAlert'
                    tools='Twitch API, Node.js'
                    desc='A MagicMirror module to notify you when your favourite streamers are live.'
                    link='https://github.com/WilliamFitzjohn/MMM-TwitchAlert'
                    />
                <Project 
                    img='PersonalWebLogoYellow.png'
                    name='Portfolio Website'
                    tools='React, HTML, Node.js'
                    desc='Simple portfolio website built from scratch to show myself off.'
                    link='https://github.com/WilliamFitzjohn/fitzjohn.dev'
                />
                <Project 
                    img='UniSearchLogo.ico'
                    name='UniSearch'
                    tools='React, Flask, Python, Node.js'
                    desc='A group project that scrapes the UofGuelph / UWaterloo course databases and allows users to search and graph courses.'
                />
                <Project 
                    img='GDLogoBlue.png'
                    name='Going Ductless Site'
                    tools='WordPress'
                    desc='Contract work for a previous employer to show off their business.'
                    link='https://goingductless.ca/'
                />
                <Project 
                    img='GroveLogo.png'
                    name='Youth Wellness App'
                    tools='Figma'
                    desc='Lead a design team to gather requirements from a client and create a high fidelity prototype for a mobile app targeted at a young audience.'
                    link='https://www.figma.com/file/WFZ6smd6tG8umbb02EZVqB/'
                />
                <Project 
                    img='QuizBotLogo.png'
                    name='QuizBot'
                    tools='JavaScript, Node.js'
                    desc='Contract work for an angel investing firm to deliver course content to their clients. The discord chat bot was built using entirely Node.js'
                />
                <Project 
                    img='GPXLogo.png'
                    name='GPX Data Viewer'
                    tools='HTML, Node.js, Express.js, C, MySQL'
                    desc='A full stack CRUD web app that works with GPX files that track GPS coordinates. Backend coded in C, frontend in JavaScript, HTML, CSS. Linked to a MySQL database.'
                />
                <Project 
                    img='PXORLogo.png'
                    name='PurpleXOR'
                    tools='Java'
                    desc='A Minecraft mod using the Forge API which added new items and blocks into the game. This was my first programming project at age 13.'
                />
            </section>
        </Container>
    );
}
  
export default Projects;
  