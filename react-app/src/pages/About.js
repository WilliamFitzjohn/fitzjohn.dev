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
                <img className='me unselectabe' src='./imgs/Me.JPG'></img>
                <div className='about-me-desc'>
                    <div>
                        <h3>Hello, I'm William</h3>
                        <p>I’m an English software developer and I love to take pride in my work. Soon I'll graduate from university where I will continue to grow my career. In my free time I play games, hangout with friends, and work on side projects.</p>
                    </div>
                    <div className='degree-container'>
                        <img src='./imgs/UOGLogo.png'/>
                        <div>
                            <h3>Bachelor of Computing (Honours)</h3>
                            <p style={{'font-style': 'italic', 'margin-bottom':'5px'}}>2019-2023</p>
                            <p>Major in Computer Science, Minor in Economics</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='career-container'>
                <h1>Career</h1>
                <Job 
                    comp='OVC'
                    title='Software Developer'
                    year='2022'
                    img='OVCLogo.jpg'
                    desc={[
                    '• Developing web pages in react',
                    '• More to come soon...']}
                    imglink='https://animalhealthmetrics.org/'
                />
                <Job 
                    comp='Deloitte'
                    title='IT Co-op'
                    year='Summer 2022'
                    desc={[
                    '• Worked with Deloitte Datacenter Services to manage thousands of virtual machines.',
                    '• Joined an operations team to deploy VMs, troubleshoot servers, and delegate work.',
                    '• Developed scripts to gather data from VMs to measure KPIs for upper management.',
                    '• Engaged with the Deloitte Networks team to learn about enterprise networking.',
                    '• Assisted team members in building/racking servers in the data centers.']}
                    img='DeloitteLogo.png'
                    imglink='https://www2.deloitte.com/ca/en.html'
                    />
                <Job 
                    comp='Deloitte'
                    title='IT Co-op'
                    year='Summer 2021'
                    desc={[
                    '• Worked with Deloitte Datacenter Services to manage thousands of virtual machines.',
                    '• Joined an operations team to deploy VMs, troubleshoot servers, and delegate work.',
                    '• Developed scripts to gather data from VMs to measure KPIs for upper management.',
                    '• Engaged with the Deloitte Networks team to learn about enterprise networking.',
                    '• Assisted team members in building/racking servers in the data centers.']}
                    img='DeloitteLogo.png'
                    imglink='https://www2.deloitte.com/ca/en.html'
                    />
                <Job 
                    comp='Going Ductless'
                    title='HVAC Apprentice'
                    year='2017-2020'
                    desc={[
                        '• Developed effective communication skills and worked well in a team setting.',
                        '• Trained new employees up to organized and efficient company standards.',
                        '• Worked with a team to install heating and cooling in server rooms, offices, machine rooms and more.']}
                    img='GDLogo.png'
                    imglink='https://www.goingductless.ca'
                    />
            </section>
        </Container>
    );
}
  
export default About;
  