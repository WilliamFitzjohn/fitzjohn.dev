import './styles/About.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import Job from '../components/Job'

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
                <Job 
                    comp='OVC'
                    title='Software Developer'
                    year='2022'
                />
                <Job 
                    comp='Deloitte'
                    title='IT Co-op'
                    year='Summer 2022'
                    />
                <Job 
                    comp='Deloitte'
                    title='IT Co-op'
                    year='Summer 2021'
                    desc='• Worked with Deloitte Datacenter Services to manage thousands of virtual machines used by Deloitte Canada and Chile.
                    • Joined an operations team to deploy VMs, troubleshoot servers, and delegate work to other teams.
                    • Developed scripts to gather data from thousands of virtual machines to measure KPIs for upper management.
                    • Engaged with the Deloitte Networks team to learn about enterprise networking and how it applies to all tech disciplines.
                    • Assisted team members in building/racking servers in the data centers.
                    • Learned a lot about virtualization, and general daily IT operations.'
                />
                <Job 
                    comp='Going Ductless'
                    title='HVAC Apprentice'
                    year='2017-2020'
                />
            </section>
        </Container>
    );
}
  
export default About;
  