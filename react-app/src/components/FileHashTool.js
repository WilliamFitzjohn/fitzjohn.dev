import { useState } from 'react';
import './styles/FileHashTool.css';

function toHex(buffer) {
    return Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function FileHashTool() {
    const [fileName, setFileName] = useState('');
    const [hash, setHash] = useState('');
    const [status, setStatus] = useState('');
    const [copied, setCopied] = useState(false);

    const hashFile = async (file) => {
        if (!file) return;
        setFileName(file.name);
        setHash('');
        setCopied(false);
        setStatus('Hashing locally...');

        try {
            const digest = await window.crypto.subtle.digest('SHA-256', await file.arrayBuffer());
            setHash(toHex(digest));
            setStatus('SHA-256');
        } catch (error) {
            setStatus('Could not hash that file.');
        }
    };

    const copy = () => {
        if (!hash) return;
        navigator.clipboard.writeText(hash).then(() => setCopied(true));
    };

    return (
        <div className="hash-tool">
            <label className="hash-picker">
                <span>{fileName || 'Choose a file to hash locally'}</span>
                <input type="file" onChange={(e) => hashFile(e.target.files && e.target.files[0])} hidden />
            </label>

            {status && <p className="hash-status">{status}</p>}
            <textarea className="hash-output" readOnly value={hash} placeholder="SHA-256 digest will appear here" />

            <div className="tool-actions">
                <button type="button" onClick={copy} disabled={!hash}>{copied ? 'Copied' : 'Copy Hash'}</button>
            </div>
        </div>
    );
}

export default FileHashTool;
