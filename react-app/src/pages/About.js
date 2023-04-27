import './styles/About.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import Job from '../components/Job'

function About() {
    

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
                <h2>About</h2>
            </section>
            <section className='bg-section unselectable'>
                <h1>Creator</h1>
                <h1>Engineer</h1>
                <h1>Developer</h1>
            </section>
            <section className='about-me-container'>
                <img className='me unselectabe' alt="It's me!" src='./imgs/Me.JPG'></img>
                <div className='about-me-desc'>
                    <div>
                        <h3>Hello, I'm William</h3>
                        <p>I’m an English software developer and I love to take pride in my work. My long term goal is to have an exciting career in software development. Soon I'll graduate from university where I will continue to grow my career. In my free time I play games, hangout with friends, and work on side projects.</p>
                    </div>
                    <div className='degree-container'>
                        <img alt='University of Guelph' src='./imgs/UOGLogo.png'/>
                        <div>
                            <h3>Bachelor of Computing (Honours)</h3>
                            <p style={{'fontStyle': 'italic', 'marginBottom':'5px'}}>University of Guelph [2019-2023]</p>
                            <p>Major in Computer Science, Minor in Economics & Finance</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='career-container'>
                <h1>Career</h1>
                <Job 
                    comp='Bell'
                    title='Developer, Cloud Engineering'
                    year='Apr 2023 - Current'
                    desc={[
                        '• Automating cloud workflows to reduce incident response time.',
                        ]}
                    img='BellLogo.jpg'
                    imglink='https://www.bell.ca/'
                />
                <Job 
                    comp='Flex Consulting Services'
                    title='Co-Founder'
                    year='Jan 2023 - Current'
                    desc={[
                        '• Supplying clients with high quality software.',
                        ]}
                    img='FlexLogoWhite492.png'
                    imglink='https://flexconsulting.ca/'
                />
                <Job 
                    comp='Global Burden of Animal Diseases'
                    title='Software Developer'
                    year='Apr 2022 - Apr 2023'
                    desc={[
                        '• Managed the software development life cycle by designing 10+ Git CI/CD pipelines to streamline development.',
                        '• Built AWS infrastructure to support high-traffic web applications, utilized ECS and Load Balancers to deploy Docker containers, resulting in a reliable and scalable website infrastructure.',
                        '• Developed cloud-based analytical dashboards for visualizing data to monitor KPI\'s.',
                    ]}
                    img='GBADsLogo.jfif'
                    imglink='https://animalhealthmetrics.org/'
                />
                <Job 
                    comp='Deloitte'
                    title='IT Co-op - Solutions Delivery'
                    year='May 2022 - Aug 2022'
                    desc={[
                    '• Supported management on 5+ projects resulting in time savings of ~$2300 hours of labour-intense work annually.',
                    '• Leveraged automations to reduce bottle-necks in business pipelines, resulting in time-savings and less down-time.',
                    '• Assisted in the architecture and design of robotic processes with a focus on reliability using best practices.']}
                    img='DeloitteLogo.png'
                    imglink='https://www2.deloitte.com/ca/en.html'
                    />
                <Job 
                    comp='Deloitte'
                    title='IT Co-op - Data Centre Services'
                    year='May 2021 - Aug 2021'
                    desc={[
                    '• Developed software to monitor 1000s of VMs (Virtual Machines) to deliver KPIs for management.',
                    '• Collaborated with Deloitte Data Centre Services to oversee 100s of servers, supporting client-facing service lines.',
                    '• Delegated tasks to other teams and co-workers as part of an operations team.',
                    '• Engaged with the Deloitte Networks team to learn about enterprise networking.',
                    '• Assisted team members in building/racking servers in the data centers.']}
                    img='DeloitteLogo.png'
                    imglink='https://www2.deloitte.com/ca/en.html'
                    />
                <Job 
                    comp='Going Ductless'
                    title='HVAC Apprentice'
                    year='Jun 2017 - Aug 2020'
                    desc={[
                        '• Developed effective communication skills and worked well in a team setting.',
                        '• Trained new employees up to organized and efficient company standards.',
                        '• Worked with a team to install heating and cooling in server rooms, offices, machine rooms and more.']}
                    img='GDLogoBlue.png'
                    imglink='https://www.goingductless.ca'
                    />
            </section>
        </Container>
    );
}
  
export default About;
  