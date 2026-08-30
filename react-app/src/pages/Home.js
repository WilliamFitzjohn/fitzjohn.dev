import './styles/Home.css'
import './styles/Common.css'
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BsLinkedin,BsGithub } from 'react-icons/bs';

function Home() {
    useEffect(() => {
        // Run the opening transition only once on mount.
        const transitionEle = document.getElementsByClassName('page-transition');
        const openTimer = setTimeout(() => {
            for (let i = 0; i < transitionEle.length; i++) {
                transitionEle[i].classList.remove('transition-active');
            }
            const timingTimer = setTimeout(() => {
                const pt1 = document.getElementsByClassName('pt-1')[0];
                const pt3 = document.getElementsByClassName('pt-3')[0];
                if (!pt1 || !pt3) {
                    return;
                }
                pt1.classList.remove('pt-1t');
                pt1.classList.add('pt-3t');
                pt3.classList.remove('pt-3t');
                pt3.classList.add('pt-1t');
            }, 500);

            return () => clearTimeout(timingTimer);
        }, 200);

        return () => clearTimeout(openTimer);
    }, []);

    function onDivClick(route){
        const transitionEle = document.getElementsByClassName('page-transition');
        for (let i = 0; i < transitionEle.length;i++){
          transitionEle[i].classList.add('transition-active');
        }
        setTimeout(() => {
            window.location.href = `/${route.toLowerCase()}`;
            //set timing to opposite direction
            let pt1 = document.getElementsByClassName('pt-1')[0];
            pt1.classList.remove('pt-3t');
            pt1.classList.add('pt-1t');
            let pt3 = document.getElementsByClassName('pt-3')[0];
            pt3.classList.remove('pt-1t');
            pt3.classList.add('pt-3t');
        }, 500);
    }


    return (
        <Container className='body-container'>
            <section className='title-section'> 
                <p>Hello I'm</p>
                <h2>William Fitzjohn</h2>
                <h3>Building bold tools, data apps, and digital experiences.</h3>
            </section>
            <section className='router-section'>
                <div className='router-section-div'>
                    <button className='unselectable clickable route-btn' onClick={() => onDivClick('Projects')}>Projects</button>
                </div>
                <div className='router-section-div'>
                    <button className='unselectable clickable route-btn' onClick={() => onDivClick('Tools')}>Tools</button>
                    <div></div>
                    <a href='https://www.github.com/WilliamFitzjohn' target='_blank' rel='noreferrer'>
                        <div className='unselectable clickable link-icon'><BsGithub/></div>
                    </a>
                </div>
                <div className='router-section-div'>
                    <button className='unselectable clickable route-btn' onClick={() => onDivClick('About')}>About</button>
                    <div></div>
                    <a href='https://www.linkedin.com/in/WilliamFitzjohn' target='_blank' rel='noreferrer'>
                        <div className='unselectable clickable link-icon'><BsLinkedin/></div>
                    </a>
                </div>
            </section>
            <section className='bg-section unselectable'>
                <h1>Creator</h1>
                <h1>Engineer</h1>
                <h1>Developer</h1>
            </section>
        </Container>
    );
}

export default Home;
