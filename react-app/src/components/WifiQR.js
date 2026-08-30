import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import './styles/WifiQR.css';

function escapeWifiValue(value) {
    return value.replace(/([\\;,:"])/g, '\\$1');
}

function buildWifiPayload({ ssid, password, security, hidden }) {
    const parts = [`T:${security}`, `S:${escapeWifiValue(ssid)}`];
    if (security !== 'nopass') {
        parts.push(`P:${escapeWifiValue(password)}`);
    }
    if (hidden) {
        parts.push('H:true');
    }
    return `WIFI:${parts.join(';')};;`;
}

function roundedRect(context, x, y, width, height, radius) {
    const corner = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + corner, y);
    context.lineTo(x + width - corner, y);
    context.quadraticCurveTo(x + width, y, x + width, y + corner);
    context.lineTo(x + width, y + height - corner);
    context.quadraticCurveTo(x + width, y + height, x + width - corner, y + height);
    context.lineTo(x + corner, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - corner);
    context.lineTo(x, y + corner);
    context.quadraticCurveTo(x, y, x + corner, y);
    context.closePath();
}

function AccordionSection({ title, children, open = false }) {
    return (
        <details className='wifi-accordion' open={open}>
            <summary>{title}</summary>
            <div className='wifi-accordion-content'>
                {children}
            </div>
        </details>
    );
}

function WifiQR() {
    const canvasRef = useRef(null);
    const logoInputRef = useRef(null);
    const [wifi, setWifi] = useState({ ssid: '', password: '', security: 'WPA', hidden: false });
    const [style, setStyle] = useState({
        foreground: '#151515',
        background: '#ffffff',
        borderColor: '#9ccdb4',
        borderSize: 24,
        borderRadius: 14,
        qrSize: 320,
        bannerText: '',
        bannerPosition: 'bottom',
        bannerFontScale: 8,
        bannerColor: '#151515',
        logoMode: 'none',
        logoText: 'WF',
        logoScale: 18,
        logoBackground: '#151515',
        logoColor: '#fff500'
    });
    const [logoImage, setLogoImage] = useState('');
    const [error, setError] = useState('');
    const [hasQr, setHasQr] = useState(false);

    const updateWifi = (key, value) => setWifi((current) => ({ ...current, [key]: value }));
    const updateStyle = (key, value) => setStyle((current) => ({ ...current, [key]: value }));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ssid = wifi.ssid.trim();
        const context = canvas.getContext('2d');
        if (!ssid) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            setHasQr(false);
            setError('');
            return;
        }

        let cancelled = false;
        const qrCanvas = document.createElement('canvas');
        const bannerText = style.bannerText.trim();
        const borderSize = Number(style.borderSize);
        const qrSize = Number(style.qrSize);
        const bannerFontSize = Math.max(16, Math.round(qrSize * Number(style.bannerFontScale) / 100));
        const bannerHeight = bannerText ? Math.ceil(bannerFontSize * 1.8) : 0;
        const bannerGap = bannerText ? Math.min(14, borderSize + 4) : 0;
        const width = qrSize + borderSize * 2;
        const height = qrSize + borderSize * 2 + bannerHeight + bannerGap;
        const bannerY = style.bannerPosition === 'top' ? borderSize : borderSize + qrSize + bannerGap;
        const qrY = style.bannerPosition === 'top' ? borderSize + bannerHeight + bannerGap : borderSize;

        QRCode.toCanvas(qrCanvas, buildWifiPayload(wifi), {
            width: qrSize,
            margin: 1,
            errorCorrectionLevel: 'H',
            color: { dark: style.foreground, light: style.background }
        }).then(() => {
            if (cancelled) return;
            const pixelRatio = window.devicePixelRatio || 1;
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.imageSmoothingEnabled = false;
            context.fillStyle = style.borderColor;
            roundedRect(context, 0, 0, width, height, Number(style.borderRadius));
            context.fill();

            context.fillStyle = style.background;
            context.fillRect(borderSize, qrY, qrSize, qrSize);
            context.drawImage(qrCanvas, borderSize, qrY);

            if (bannerText) {
                context.fillStyle = style.bannerColor;
                context.font = `700 ${bannerFontSize}px "Zilla Slab", serif`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(bannerText, Math.round(width / 2), Math.round(bannerY + bannerHeight / 2), width - 28);
            }

            const logoSize = Math.round(qrSize * Number(style.logoScale) / 100);
            const logoX = width / 2 - logoSize / 2;
            const logoY = qrY + qrSize / 2 - logoSize / 2;
            if (style.logoMode !== 'none') {
                context.fillStyle = style.logoBackground;
                roundedRect(context, logoX - 8, logoY - 8, logoSize + 16, logoSize + 16, 12);
                context.fill();
            }

            if (style.logoMode === 'text') {
                context.fillStyle = style.logoColor;
                context.font = `700 ${Math.max(16, logoSize * 0.42)}px "Zilla Slab", serif`;
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillText(style.logoText.slice(0, 4), width / 2, logoY + logoSize / 2, logoSize);
            }

            if (style.logoMode === 'image' && logoImage) {
                const image = new Image();
                image.onload = () => {
                    if (cancelled) return;
                    context.drawImage(image, logoX, logoY, logoSize, logoSize);
                };
                image.src = logoImage;
            }

            setHasQr(true);
            setError('');
        }).catch(() => {
            if (cancelled) return;
            setHasQr(false);
            setError('Could not generate a QR code with these settings.');
        });

        return () => { cancelled = true; };
    }, [wifi, style, logoImage]);

    const loadLogo = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setLogoImage(String(reader.result || ''));
            updateStyle('logoMode', 'image');
        };
        reader.onerror = () => setError('Could not read that logo image.');
        reader.readAsDataURL(file);
    };

    const download = () => {
        const canvas = canvasRef.current;
        if (!canvas || !hasQr) return;
        const link = document.createElement('a');
        link.download = `${wifi.ssid || 'wifi'}-qr.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className='wifi-tool'>
            <div className='wifi-layout'>
                <div className='wifi-controls'>
                    <AccordionSection title='Network' open>
                        <label>SSID<input value={wifi.ssid} onChange={(e) => updateWifi('ssid', e.target.value)} /></label>
                        <label>Password<input type='password' value={wifi.password} onChange={(e) => updateWifi('password', e.target.value)} disabled={wifi.security === 'nopass'} /></label>
                        <label>Security<select value={wifi.security} onChange={(e) => updateWifi('security', e.target.value)}><option value='WPA'>WPA/WPA2/WPA3</option><option value='WEP'>WEP</option><option value='nopass'>No password</option></select></label>
                        <label className='wifi-check'><input type='checkbox' checked={wifi.hidden} onChange={(e) => updateWifi('hidden', e.target.checked)} /> Hidden network</label>
                    </AccordionSection>

                    <AccordionSection title='Colours' open>
                        <label>QR colour<input type='color' value={style.foreground} onChange={(e) => updateStyle('foreground', e.target.value)} /></label>
                        <label>Background<input type='color' value={style.background} onChange={(e) => updateStyle('background', e.target.value)} /></label>
                        <label>Border<input type='color' value={style.borderColor} onChange={(e) => updateStyle('borderColor', e.target.value)} /></label>
                    </AccordionSection>

                    <AccordionSection title='Border' open>
                        <label>QR size<input type='range' min='220' max='520' value={style.qrSize} onChange={(e) => updateStyle('qrSize', e.target.value)} /><span>{style.qrSize}px</span></label>
                        <label>Border size<input type='range' min='0' max='80' value={style.borderSize} onChange={(e) => updateStyle('borderSize', e.target.value)} /><span>{style.borderSize}px</span></label>
                        <label>Rounded corners<input type='range' min='0' max='48' value={style.borderRadius} onChange={(e) => updateStyle('borderRadius', e.target.value)} /><span>{style.borderRadius}px</span></label>
                    </AccordionSection>

                    <AccordionSection title='Banner'>
                        <label>Text<input value={style.bannerText} maxLength='32' placeholder='Guest Wi-Fi' onChange={(e) => updateStyle('bannerText', e.target.value)} /></label>
                        <label>Position<select value={style.bannerPosition} onChange={(e) => updateStyle('bannerPosition', e.target.value)}><option value='bottom'>Bottom</option><option value='top'>Top</option></select></label>
                        <label>Font size<input type='range' min='5' max='14' value={style.bannerFontScale} onChange={(e) => updateStyle('bannerFontScale', e.target.value)} /><span>{Math.max(16, Math.round(Number(style.qrSize) * Number(style.bannerFontScale) / 100))}px</span></label>
                        <label>Font colour<input type='color' value={style.bannerColor} onChange={(e) => updateStyle('bannerColor', e.target.value)} /></label>
                    </AccordionSection>

                    <AccordionSection title='Logo'>
                        <label>Mode<select value={style.logoMode} onChange={(e) => updateStyle('logoMode', e.target.value)}><option value='none'>None</option><option value='text'>Text badge</option><option value='image'>Image upload</option></select></label>
                        {style.logoMode === 'text' && (
                            <>
                                <label>Text<input value={style.logoText} maxLength='4' onChange={(e) => updateStyle('logoText', e.target.value)} /></label>
                                <label>Logo size<input type='range' min='10' max='35' value={style.logoScale} onChange={(e) => updateStyle('logoScale', e.target.value)} /><span>{Math.round(Number(style.qrSize) * Number(style.logoScale) / 100)}px</span></label>
                                <label>Logo background<input type='color' value={style.logoBackground} onChange={(e) => updateStyle('logoBackground', e.target.value)} /></label>
                                <label>Logo text<input type='color' value={style.logoColor} onChange={(e) => updateStyle('logoColor', e.target.value)} /></label>
                            </>
                        )}
                        {style.logoMode === 'image' && (
                            <>
                                <label>Logo size<input type='range' min='10' max='35' value={style.logoScale} onChange={(e) => updateStyle('logoScale', e.target.value)} /><span>{Math.round(Number(style.qrSize) * Number(style.logoScale) / 100)}px</span></label>
                                <label>Logo background<input type='color' value={style.logoBackground} onChange={(e) => updateStyle('logoBackground', e.target.value)} /></label>
                                <button type='button' className='wifi-file-button' onClick={() => logoInputRef.current && logoInputRef.current.click()}>{logoImage ? 'Replace Logo' : 'Upload Logo'}</button>
                            </>
                        )}
                        <input ref={logoInputRef} type='file' accept='image/*' hidden onChange={(e) => loadLogo(e.target.files && e.target.files[0])} />
                    </AccordionSection>
                </div>

                <div className='wifi-preview'>
                    <canvas ref={canvasRef} className={hasQr ? '' : 'wifi-hidden'} />
                    {!hasQr && <p>Enter a network name to preview your QR code.</p>}
                    {error && <p className='wifi-error'>{error}</p>}
                    <div className='tool-actions'>
                        <button type='button' onClick={download} disabled={!hasQr}>Download PNG</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WifiQR;