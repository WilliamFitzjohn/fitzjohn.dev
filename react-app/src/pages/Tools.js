import './styles/Tools.css';
import './styles/Common.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BsBoxArrowInLeft, BsLockFill } from 'react-icons/bs';
import WireguardQR from '../components/WireguardQR';
import WifiQR from '../components/WifiQR';
import JwtDecoder from '../components/JwtDecoder';
import DataFormatterDiff from '../components/DataFormatterDiff';
import RandomStringGenerator from '../components/RandomStringGenerator';
import FileHashTool from '../components/FileHashTool';

const tools = [
    {
        id: 'wifi',
        name: 'Wi-Fi QR Code',
        description: 'Design a Wi-Fi QR code for your network without exposing your credentials.',
        component: <WifiQR />
    },
    {
        id: 'wireguard',
        name: 'WireGuard QR Code',
        description: 'Convert a WireGuard .conf file into a QR code while keeping your config private.',
        component: <WireguardQR />
    },
    {
        id: 'jwt',
        name: 'JWT Decoder',
        description: 'Decode JWT headers and payloads locally without pasting tokens into a third-party site.',
        component: <JwtDecoder />
    },
    {
        id: 'formatter',
        name: 'JSON/YAML Format + Diff',
        description: 'Format, convert, and compare JSON or YAML documents entirely in your browser.',
        component: <DataFormatterDiff />
    },
    {
        id: 'random',
        name: 'Random String Gen',
        description: 'Generate cryptographically strong random strings for passwords, tokens, and one-time setup values.',
        component: <RandomStringGenerator />
    },
    {
        id: 'hash',
        name: 'SHA-256 Hash',
        description: 'Calculate a SHA-256 digest for a file so you can verify downloads or compare file integrity.',
        component: <FileHashTool />
    }
];

function Tools() {
    const [activeTool, setActiveTool] = useState(tools[0].id);
    const selectedTool = tools.find((tool) => tool.id === activeTool) || tools[0];

    useEffect(() => {
        const transitionEle = document.getElementsByClassName('page-transition');
        const openTimer = setTimeout(() => {
            for (let i = 0; i < transitionEle.length; i++) {
                transitionEle[i].classList.remove('transition-active');
            }
            const timingTimer = setTimeout(() => {
                const pt1 = document.getElementsByClassName('pt-1')[0];
                const pt3 = document.getElementsByClassName('pt-3')[0];
                if (!pt1 || !pt3) return;
                pt1.classList.remove('pt-1t');
                pt1.classList.add('pt-3t');
                pt3.classList.remove('pt-3t');
                pt3.classList.add('pt-1t');
            }, 500);

            return () => clearTimeout(timingTimer);
        }, 200);

        return () => clearTimeout(openTimer);
    }, []);

    function backClick(){
        const transitionEle = document.getElementsByClassName('page-transition');
        for (let i = 0; i < transitionEle.length;i++){
          transitionEle[i].classList.add('transition-active');
        }
        setTimeout(() => {
            window.location.href = '/';
            let pt1 = document.getElementsByClassName('pt-1')[0];
            let pt3 = document.getElementsByClassName('pt-3')[0];
            if (!pt1 || !pt3) return;
            pt1.classList.remove('pt-3t');
            pt1.classList.add('pt-1t');
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
                <h2>Tools</h2>
            </section>
            <section className='bg-section unselectable tools-bg'>
                <h1>Private</h1>
                <h1>Local</h1>
                <h1>Secure</h1>
            </section>
            <section className='tools-info-block'>
                <h3><BsLockFill/>Privacy focused</h3>
                <p>These tools run entirely in your browser and keep your files, keys, passwords, network details, and generated output on your device.</p>
            </section>
            <section className='tools-page'>
                <div className='tools-tabs' role='tablist' aria-label='Privacy tools'>
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            type='button'
                            className={tool.id === activeTool ? 'active' : ''}
                            onClick={() => setActiveTool(tool.id)}
                        >
                            {tool.name}
                        </button>
                    ))}
                </div>

                <div className='tool-panel'>
                    <div className='tool-panel-header'>
                        <h3>{selectedTool.name}</h3>
                        <p>{selectedTool.description}</p>
                    </div>
                    {selectedTool.component}
                </div>
            </section>
        </Container>
    );
}

export default Tools;
