import { useCallback, useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import './styles/WireguardQR.css';

const MAX_FILE_BYTES = 64 * 1024;

function WireguardQR() {
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [confText, setConfText] = useState('');
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const [dragging, setDragging] = useState(false);
    const [hasQr, setHasQr] = useState(false);

    const loadFile = useCallback((file) => {
        if (!file) return;
        if (file.size > MAX_FILE_BYTES) {
            setError('That file is too large to be a WireGuard config.');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setConfText(String(reader.result || ''));
            setFileName(file.name);
            setError('');
        };
        reader.onerror = () => setError('Could not read that file.');
        reader.readAsText(file);
    }, []);

    const onDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        loadFile(event.dataTransfer.files && event.dataTransfer.files[0]);
    };

    const clearAll = () => {
        setConfText('');
        setFileName('');
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const download = () => {
        const canvas = canvasRef.current;
        if (!canvas || !hasQr) return;
        const link = document.createElement('a');
        link.download = (fileName ? fileName.replace(/\.conf$/i, '') : 'wireguard') + '-qr.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const text = confText.trim();
        if (!text) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            setHasQr(false);
            setError('');
            return;
        }
        if (!/^\s*\[Interface\]/im.test(text)) {
            setHasQr(false);
            setError('This does not look like a WireGuard config (no [Interface] section).');
            return;
        }

        let cancelled = false;
        QRCode.toCanvas(canvas, text, { width: 320, margin: 2, errorCorrectionLevel: 'M' })
            .then(() => {
                if (cancelled) return;
                setHasQr(true);
                setError('');
            })
            .catch(() => {
                if (cancelled) return;
                setHasQr(false);
                setError('Config is too long to encode in a single QR code.');
            });
        return () => { cancelled = true; };
    }, [confText]);

    return (
        <div className="wg-tool">
            <p className="wg-note">
                Everything runs in your browser &mdash; your config never leaves this device
                and is never uploaded anywhere.
            </p>

            <div
                className={'wg-drop' + (dragging ? ' wg-drop-active' : '')}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current.click(); }}
            >
                <p>{fileName || 'Drop a .conf file here, or click to browse'}</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".conf,text/plain"
                    onChange={(e) => loadFile(e.target.files && e.target.files[0])}
                    hidden
                />
            </div>

            <textarea
                className="wg-text"
                spellCheck="false"
                placeholder={'…or paste the config contents here\n\n[Interface]\nPrivateKey = …'}
                value={confText}
                onChange={(e) => { setConfText(e.target.value); setFileName(''); }}
            />

            {error && <p className="wg-error">{error}</p>}

            <div className="wg-output">
                <canvas ref={canvasRef} className={hasQr ? '' : 'wg-hidden'} />
            </div>

            <div className="wg-actions">
                <button type="button" onClick={download} disabled={!hasQr}>Download PNG</button>
                <button type="button" onClick={clearAll} disabled={!confText}>Clear</button>
            </div>
        </div>
    );
}

export default WireguardQR;
