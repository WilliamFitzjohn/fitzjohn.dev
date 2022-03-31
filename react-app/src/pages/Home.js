import './styles/Home.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';

function Home() {

    function onDivClick(e){
        window.location.href = "/"+e.target.id;
    }


    return (
        <Container>
            <section className='title-section'>
                <p>Hello I'm</p>
                <h2>William Fitzjohn</h2>
            </section>
            <section className='router-section'>
                <div className='unselectable' onClick={onDivClick} id='Projects'>Projects</div>
                <div className='unselectable' onClick={onDivClick} id='About'>About</div>
                <div className='unselectable' onClick={onDivClick} id='Resume'>Resume</div>
            </section>
            <section className='bg-section'>

            </section>
        </Container>
    );
}

export default Home;
