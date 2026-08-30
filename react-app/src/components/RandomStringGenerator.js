import { useState } from 'react';
import './styles/RandomStringGenerator.css';

const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{};:,.?/';
const AMBIGUOUS = /[0OIl1]/g;

function randomFrom(characters, length) {
    const values = new Uint32Array(length);
    window.crypto.getRandomValues(values);
    return Array.from(values, (value) => characters[value % characters.length]).join('');
}

function RandomStringGenerator() {
    const [length, setLength] = useState(32);
    const [options, setOptions] = useState({ lower: true, upper: true, numbers: true, symbols: true, readable: false });
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const updateOption = (key) => {
        setOptions((current) => ({ ...current, [key]: !current[key] }));
        setCopied(false);
    };

    const generate = () => {
        let characters = '';
        if (options.lower) characters += LOWER;
        if (options.upper) characters += UPPER;
        if (options.numbers) characters += NUMBERS;
        if (options.symbols) characters += SYMBOLS;
        if (options.readable) characters = characters.replace(AMBIGUOUS, '');

        if (!characters) {
            setResult('Select at least one character set.');
            return;
        }

        setResult(randomFrom(characters, Number(length)));
        setCopied(false);
    };

    const copy = () => {
        if (!result || result.startsWith('Select ')) return;
        navigator.clipboard.writeText(result).then(() => setCopied(true));
    };

    return (
        <div className="random-tool">
            <div className="tool-control-row">
                <label htmlFor="random-length">Length</label>
                <input
                    id="random-length"
                    type="range"
                    min="8"
                    max="128"
                    value={length}
                    onChange={(e) => { setLength(e.target.value); setCopied(false); }}
                />
                <span>{length}</span>
            </div>

            <div className="option-grid">
                <label><input type="checkbox" checked={options.lower} onChange={() => updateOption('lower')} /> Lowercase</label>
                <label><input type="checkbox" checked={options.upper} onChange={() => updateOption('upper')} /> Uppercase</label>
                <label><input type="checkbox" checked={options.numbers} onChange={() => updateOption('numbers')} /> Numbers</label>
                <label><input type="checkbox" checked={options.symbols} onChange={() => updateOption('symbols')} /> Symbols</label>
                <label><input type="checkbox" checked={options.readable} onChange={() => updateOption('readable')} /> Avoid ambiguous</label>
            </div>

            <textarea className="random-output" readOnly value={result} placeholder="Generate a local random string" />

            <div className="tool-actions">
                <button type="button" onClick={generate}>Generate</button>
                <button type="button" onClick={copy} disabled={!result || result.startsWith('Select ')}>{copied ? 'Copied' : 'Copy'}</button>
            </div>
        </div>
    );
}

export default RandomStringGenerator;
