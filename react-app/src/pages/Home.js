import './styles/Home.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';

function Home() {

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

    function onDivClick(e){
        const transitionEle = document.getElementsByClassName('page-transition');
        for (let i = 0; i < transitionEle.length;i++){
          transitionEle[i].classList.add('transition-active');
        }
        setTimeout(() => {
            window.location.href = "/#/"+e.target.id;
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
                <p>Hello I'm</p>
                <h2>William Fitzjohn</h2>
            </section>
            <section className='router-section'>
                <div className='unselectable' onClick={onDivClick} id='Projects'>Projects</div>
                <div className='unselectable' onClick={onDivClick} id='About'>About</div>
                <div className='unselectable' onClick={onDivClick} id='Resume'>Resume</div>
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
