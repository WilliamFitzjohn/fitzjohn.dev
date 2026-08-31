import { useMemo, useState } from 'react';
import './styles/JwtDecoder.css';

function base64UrlDecode(value) {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=');
    const binary = window.atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

function parseJwt(token) {
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
        throw new Error('JWTs should have three dot-separated parts.');
    }

    return {
        header: JSON.parse(base64UrlDecode(parts[0])),
        payload: JSON.parse(base64UrlDecode(parts[1])),
        signature: parts[2]
    };
}

function formatDate(seconds) {
    if (typeof seconds !== 'number') return null;
    return new Date(seconds * 1000).toLocaleString();
}

function JwtDecoder() {
    const [token, setToken] = useState('');
    const [copied, setCopied] = useState('');

    const decoded = useMemo(() => {
        if (!token.trim()) return { error: '', parsed: null };
        try {
            return { error: '', parsed: parseJwt(token) };
        } catch (error) {
            return { error: error.message || 'Could not decode that JWT.', parsed: null };
        }
    }, [token]);

    const copy = (label, value) => {
        navigator.clipboard.writeText(value).then(() => setCopied(label));
    };

    const headerText = decoded.parsed ? JSON.stringify(decoded.parsed.header, null, 2) : '';
    const payloadText = decoded.parsed ? JSON.stringify(decoded.parsed.payload, null, 2) : '';
    const exp = decoded.parsed && formatDate(decoded.parsed.payload.exp);
    const iat = decoded.parsed && formatDate(decoded.parsed.payload.iat);
    const nbf = decoded.parsed && formatDate(decoded.parsed.payload.nbf);

    return (
        <div className='jwt-tool'>
            <textarea
                className='jwt-input'
                spellCheck='false'
                value={token}
                placeholder='Paste a JWT here. Decoding happens locally in your browser.'
                onChange={(event) => { setToken(event.target.value); setCopied(''); }}
            />

            {decoded.error && <p className='jwt-error'>{decoded.error}</p>}

            {decoded.parsed && (
                <>
                    <div className='jwt-claims'>
                        {iat && <p><span>Issued</span>{iat}</p>}
                        {nbf && <p><span>Valid After</span>{nbf}</p>}
                        {exp && <p><span>Expires</span>{exp}</p>}
                        <p><span>Algorithm</span>{decoded.parsed.header.alg || 'Not specified'}</p>
                    </div>

                    <div className='jwt-output-grid'>
                        <section>
                            <div className='jwt-output-header'>
                                <h4>Header</h4>
                                <button type='button' onClick={() => copy('header', headerText)}>{copied === 'header' ? 'Copied' : 'Copy'}</button>
                            </div>
                            <pre>{headerText}</pre>
                        </section>
                        <section>
                            <div className='jwt-output-header'>
                                <h4>Payload</h4>
                                <button type='button' onClick={() => copy('payload', payloadText)}>{copied === 'payload' ? 'Copied' : 'Copy'}</button>
                            </div>
                            <pre>{payloadText}</pre>
                        </section>
                    </div>
                    <p className='jwt-note'>This tool decodes JWT content only. It does not verify the signature or trust the claims.</p>
                </>
            )}
        </div>
    );
}

export default JwtDecoder;
