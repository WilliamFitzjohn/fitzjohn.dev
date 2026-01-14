
import './styles/About.css'
import './styles/Common.css'
import { Container } from 'react-bootstrap';
import { BsBoxArrowInLeft } from 'react-icons/bs';
import Job from '../components/Job'
import CareerTimeline from '../components/CareerTimeline'
import Certification from '../components/Certification'
import { useEffect } from 'react';

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

    // Flashlight effect for profile image
    useEffect(() => {
        const img = document.getElementById('about-me-img');
        const canvas = document.getElementById('me-flashlight-canvas');
        if (!img || !canvas) return;

        let ctx = canvas.getContext('2d');
        let imgObj = new window.Image();
        imgObj.src = img.src;

        function resizeCanvas() {
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.style.width = img.width + 'px';
            canvas.style.height = img.height + 'px';
        }

        // Draw a blurred flashlight using a radial gradient alpha mask
        function drawFlashlight(x, y, radius = 90, blur = 20) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw the color image
            ctx.save();
            ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);
            // Create a radial gradient alpha mask
            let grad = ctx.createRadialGradient(x, y, Math.max(1, radius - blur), x, y, radius);
            grad.addColorStop(0, 'rgba(0,0,0,1)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            // Draw the mask
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.globalCompositeOperation = 'destination-over';
            // Draw grayscale image underneath
            ctx.filter = 'grayscale(1)';
            ctx.drawImage(imgObj, 0, 0, canvas.width, canvas.height);
            ctx.filter = 'none';
            ctx.restore();
        }

        function handleMove(e) {
            const rect = img.getBoundingClientRect();
            let x, y;
            if (e.touches && e.touches.length) {
                x = e.touches[0].clientX - rect.left;
                y = e.touches[0].clientY - rect.top;
            } else {
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;
            }
            drawFlashlight(x, y);
        }

        function handleLeave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function setup() {
            resizeCanvas();
            img.addEventListener('mousemove', handleMove);
            img.addEventListener('mouseleave', handleLeave);
            img.addEventListener('touchmove', handleMove);
            img.addEventListener('touchend', handleLeave);
        }

        if (img.complete) {
            setup();
        } else {
            img.onload = setup;
        }

        window.addEventListener('resize', resizeCanvas);

        return () => {
            img.removeEventListener('mousemove', handleMove);
            img.removeEventListener('mouseleave', handleLeave);
            img.removeEventListener('touchmove', handleMove);
            img.removeEventListener('touchend', handleLeave);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

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
                <div className='me-img-container'>
                    <img
                        className='me unselectabe'
                        alt="It's me!"
                        src='./imgs/Me.JPG'
                        id='about-me-img'
                        style={{ display: 'block' }}
                    />
                    <canvas
                        id='me-flashlight-canvas'
                        className='me-flashlight-canvas'
                        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                    />
                </div>
                <div className='about-me-desc'>
                    <div>
                        <h3>Hello, I'm William</h3>
                        <p>I’m an English-Canadian Solutions Architect & Software Developer and I love to take pride in my work. My long term goal is to have an exciting career in cloud engineering. I've gained a breadth of experience by owning a business, working in various software development roles, and collaborating on innovative projects. At home, I enjoy tinkering with my homelab.</p>
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
            <section className='career-container pb-4'>
                <h1>Career</h1>
                <CareerTimeline jobs={[
                    {
                        comp: 'Manulife',
                        title: 'Cloud Engineer',
                        year: 'January 2026 - Current',
                        img: 'ManulifeLogo.svg',
                        imglink: 'https://www.manulife.ca//'
                    },
                    {
                        comp: 'Bell',
                        title: 'Software Developer, Cloud Engineering',
                        year: 'Apr 2023 - January 2026',
                        img: 'BellLogo.jpg',
                        imglink: 'https://www.bell.ca/'
                    },
                    {
                        comp: 'Flex Consulting Solutions',
                        title: 'Co-Founder',
                        year: 'Jan 2023 - August 2024',
                        img: 'FlexLogoWhite492.png',
                        imglink: 'https://flexconsulting.ca/'
                    },
                    {
                        comp: 'GBADs Informatics',
                        title: 'Software Developer',
                        year: 'Apr 2022 - Apr 2023',
                        img: 'GBADsLogo.jpg',
                        imglink: 'https://animalhealthmetrics.org/'
                    },
                    {
                        comp: 'Deloitte',
                        title: 'IT Co-op - Intelligent Automation',
                        year: 'May 2022 - Aug 2022',
                        img: 'DeloitteLogo.png',
                        imglink: 'https://www2.deloitte.com/ca/en.html'
                    },
                    {
                        comp: 'Deloitte',
                        title: 'IT Co-op - Technology & Infrastructure',
                        year: 'May 2021 - Aug 2021',
                        img: 'DeloitteLogo.png',
                        imglink: 'https://www2.deloitte.com/ca/en.html'
                    }
                ]} />
                <Job 
                    comp='Manulife'
                    title='Cloud Engineer'
                    year='January 2026 - Current'
                    desc={[
                        '• Engineering...',
                        '• Building...',
                        '• Designing...'
                        ]}
                    img='ManulifeLogo.svg'
                    imglink='https://www.manulife.ca//'
                />
                <Job 
                    comp='Bell'
                    title='Software Developer, Cloud Engineering'
                    year='Apr 2023 - January 2026'
                    location='Waterloo, ON'
                    type='Full-time'
                    desc={[
                        '• Reduced troubleshooting labor by +2,000 hours per month by leading front-end development for a custom mission-critical automation and monitoring platform, streamlining network diagnostics and repairs.',
                        '• Improved disaster recovery time by 98% with auto-scaling fastweb proxies on GCP through Terraform.',
                        '• Reclaimed $500k of hardware by building real-time Cisco Telemetry data pipelines in On-Prem environments.',
                        '• Architected fault detection platforms using Vue3, FastAPI, Redis, and Kafka, increasing system visibility.',
                        '• Championed agile frameworks as a Scrum Master, leading my team through Scrum ceremonies in Jira & Miro.',
                        ]}
                    skills={['Vue.js', 'FastAPI', 'Redis', 'Kafka', 'Terraform', 'GCP', 'Cisco', 'Python', 'JavaScript', 'Agile/Scrum', 'Jira', 'Miro']}
                    img='BellLogo.jpg'
                    imglink='https://www.bell.ca/'
                />
                <Job 
                    comp='Flex Consulting Solutions'
                    title='Co-Founder'
                    year='Jan 2023 - August 2024'
                    location='Guelph, ON'
                    type='Full-time'
                    desc={[
                        '• Launched a cloud solutions company, securing $---K in year 1 by strategically focusing on grant-funded projects.',
                        '• Led end-to-end development for a portfolio of 25+ cloud applications, scaling usage to 1,000+ monthly users.',
                        '• Product owner for AWS Infrastructure-as-Code environments (Terraform/CloudFormation), orchestrating the hosting environment for globally accessible Python/Java APIs, RDS databases, and React/Typescript Web Apps.',
                        ]}
                    skills={['AWS', 'Terraform', 'CloudFormation', 'Python', 'Java', 'React', 'TypeScript', 'RDS', 'IaC']}
                    img='FlexLogoWhite492.png'
                    imglink='https://flexconsulting.ca/'
                />
                <Job 
                    comp='Global Burden of Animal Diseases'
                    title='Software Developer'
                    year='Apr 2022 - Apr 2023'
                    location='Guelph, ON'
                    type='Full-time'
                    desc={[
                        '• Reduced AWS costs by 60% by implementing cloud observability standards, monitoring, and alarming.',
                        '• Aided in securing $5M from the Bill & Melinda Gates Foundation with a modern Public Cloud architecture.',
                        '• Migrated to Infrastructure as Code using Terraform and CloudFormation to provision ECS, EC2, S3, and RDS.',
                        '• Managed DevOps with 20+ CI/CD pipelines to automate end-to-end deployments leveraging Docker containers.',
                    ]}
                    skills={['AWS', 'Terraform', 'CloudFormation', 'ECS', 'EC2', 'S3', 'RDS', 'Docker', 'CI/CD', 'DevOps']}
                    img='GBADsLogo.jpg'
                    imglink='https://animalhealthmetrics.org/'
                />
                <Job 
                    comp='Deloitte'
                    title='IT Co-op - Intelligent Automation CoE'
                    year='May 2022 - Aug 2022'
                    location='Toronto, ON'
                    type='Co-op'
                    desc={[
                        '• Automated ∼2300 hours of labor-intense work by developing 5+ RPA automations for administrative tasks.',
                        '• Assisted in the architecture and documentation of robotic processes with a focus on reliability using best practices.',
                        '• Leveraged automations to reduce bottle-necks in business pipelines, resulting in time-savings and less down-time.',
                    ]}
                    skills={['RPA', 'UiPath', 'Process Automation', 'Python']}
                    img='DeloitteLogo.png'
                    imglink='https://www2.deloitte.com/ca/en.html'
                    />
                <Job 
                    comp='Deloitte'
                    title='IT Co-op - Technology & Infrastructure'
                    year='May 2021 - Aug 2021'
                    location='Toronto, ON'
                    type='Co-op'
                    desc={[
                        '• Improved cloud observability on 2000+ machines by PowerShell monitoring software to collect KPIs.',
                        '• Provisioned physical infrastructure in the data centers and administrated Windows & Linux systems on VMWare.',
                    ]}
                    skills={['PowerShell', 'VMWare', 'Windows', 'Linux', 'Cloud Monitoring']}
                    img='DeloitteLogo.png'
                    imglink='https://www2.deloitte.com/ca/en.html'
                    />
                <Job 
                    comp='Going Ductless'
                    title='HVAC Apprentice'
                    year='Jun 2017 - Aug 2020'
                    desc={[
                        '• Worked with a team to install heating and cooling in server rooms, offices, machine rooms and more.',
                        '• Developed effective communication skills and worked well in a team setting.',
                        '• Trained new employees up to organized and efficient company standards.',
                    ]}
                    img='GDLogoBlue.png'
                    imglink='https://www.goingductless.ca'
                    />
            </section>
            <section className='career-container pm-1'>
                <h1>Certifications</h1>
                <Certification 
                    org='Amazon Web Services'
                    title='Solutions Architect - Associate'
                    date='July 2025'
                    url='https://cp.certmetrics.com/amazon/en/public/verify/credential/a6f07696b33e4fa2aa05ad5982e251c5'
                />
                <Certification 
                    org='ISED Canada'
                    title='Amateur Radio Operator - Basic with Honours'
                    date='March 2024'
                    url='https://apc-cap.ic.gc.ca/pls/apc_anon/query_amat_cs$callsign.QueryViewByKey?P_CALLSIGN=VA3TTB&Z_CHK=60341'
                />
                <Certification 
                    org='Amazon Web Services'
                    title='Cloud Practitioner'
                    date='January 2024'
                    url='https://cp.certmetrics.com/amazon/en/public/verify/credential/d73f239470d4488ea5d9c44796198bca'
                />
                <Certification 
                    org='UiPath'
                    title='RPA Developer Foundation'
                    date='May 2022'
                />
            </section>
        </Container>
    );
}
  
export default About;
  