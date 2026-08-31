import { useMemo, useState } from 'react';
import * as yaml from 'js-yaml';
import './styles/DataFormatterDiff.css';

function parseData(value, format) {
    if (!value.trim()) return null;
    return format === 'json' ? JSON.parse(value) : yaml.load(value);
}

function stringifyData(value, format) {
    if (value === null || value === undefined) return '';
    return format === 'json' ? JSON.stringify(value, null, 2) : yaml.dump(value, { lineWidth: 120, noRefs: true });
}

function sortObjectKeys(value) {
    if (Array.isArray(value)) {
        return value.map(sortObjectKeys);
    }
    if (value && typeof value === 'object') {
        return Object.keys(value).sort().reduce((sorted, key) => {
            sorted[key] = sortObjectKeys(value[key]);
            return sorted;
        }, {});
    }
    return value;
}

function stringifyForDiff(value, format) {
    return stringifyData(sortObjectKeys(value), format);
}

function buildLineDiff(leftText, rightText) {
    const left = leftText.split('\n');
    const right = rightText.split('\n');
    const table = Array.from({ length: left.length + 1 }, () => Array(right.length + 1).fill(0));

    for (let leftIndex = left.length - 1; leftIndex >= 0; leftIndex -= 1) {
        for (let rightIndex = right.length - 1; rightIndex >= 0; rightIndex -= 1) {
            table[leftIndex][rightIndex] = left[leftIndex] === right[rightIndex]
                ? table[leftIndex + 1][rightIndex + 1] + 1
                : Math.max(table[leftIndex + 1][rightIndex], table[leftIndex][rightIndex + 1]);
        }
    }

    const rows = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] === right[rightIndex]) {
            rows.push({ type: 'same', left: left[leftIndex], right: right[rightIndex] });
            leftIndex += 1;
            rightIndex += 1;
        } else if (table[leftIndex + 1][rightIndex] >= table[leftIndex][rightIndex + 1]) {
            rows.push({ type: 'removed', left: left[leftIndex], right: '' });
            leftIndex += 1;
        } else {
            rows.push({ type: 'added', left: '', right: right[rightIndex] });
            rightIndex += 1;
        }
    }

    while (leftIndex < left.length) {
        rows.push({ type: 'removed', left: left[leftIndex], right: '' });
        leftIndex += 1;
    }
    while (rightIndex < right.length) {
        rows.push({ type: 'added', left: '', right: right[rightIndex] });
        rightIndex += 1;
    }

    return rows;
}

function DataFormatterDiff() {
    const [leftInput, setLeftInput] = useState('');
    const [rightInput, setRightInput] = useState('');
    const [format, setFormat] = useState('json');
    const [outputFormat, setOutputFormat] = useState('json');
    const [diffMode, setDiffMode] = useState(false);
    const [copied, setCopied] = useState('');

    const leftResult = useMemo(() => {
        if (!leftInput.trim()) return { text: '', diffText: '', error: '' };
        try {
            const parsed = parseData(leftInput, format);
            return { text: stringifyData(parsed, outputFormat), diffText: stringifyForDiff(parsed, outputFormat), error: '' };
        } catch (error) {
            return { text: '', diffText: '', error: error.message || 'Could not parse the left input.' };
        }
    }, [leftInput, format, outputFormat]);

    const rightResult = useMemo(() => {
        if (!diffMode) return { text: '', diffText: '', error: '' };
        if (!rightInput.trim()) return { text: '', diffText: '', error: '' };
        try {
            const parsed = parseData(rightInput, format);
            return { text: stringifyData(parsed, outputFormat), diffText: stringifyForDiff(parsed, outputFormat), error: '' };
        } catch (error) {
            return { text: '', diffText: '', error: error.message || 'Could not parse the right input.' };
        }
    }, [rightInput, format, outputFormat, diffMode]);

    const diffRows = useMemo(() => {
        if (!diffMode) return [];
        if (!leftResult.diffText || !rightResult.diffText || leftResult.error || rightResult.error) return [];
        return buildLineDiff(leftResult.diffText, rightResult.diffText);
    }, [leftResult, rightResult, diffMode]);

    const copy = (label, value) => {
        if (!value) return;
        navigator.clipboard.writeText(value).then(() => setCopied(label));
    };

    return (
        <div className='data-tool'>
            <div className='data-toolbar'>
                <label>Input<select value={format} onChange={(event) => setFormat(event.target.value)}><option value='json'>JSON</option><option value='yaml'>YAML</option></select></label>
                <label>Output<select value={outputFormat} onChange={(event) => setOutputFormat(event.target.value)}><option value='json'>JSON</option><option value='yaml'>YAML</option></select></label>
                <button type='button' className={'data-toggle' + (diffMode ? ' active' : '')} onClick={() => { setDiffMode((current) => !current); setCopied(''); }}>
                    {diffMode ? 'Disable Diff' : 'Enable Diff'}
                </button>
            </div>

            <div className={'data-input-grid' + (diffMode ? ' diff-enabled' : '')}>
                <label>{diffMode ? 'Original' : 'Document'}<textarea spellCheck='false' value={leftInput} placeholder='Paste JSON or YAML here' onChange={(event) => { setLeftInput(event.target.value); setCopied(''); }} /></label>
                {diffMode && <label>Changed<textarea spellCheck='false' value={rightInput} placeholder='Paste a second document to compare' onChange={(event) => { setRightInput(event.target.value); setCopied(''); }} /></label>}
            </div>

            {(leftResult.error || rightResult.error) && (
                <div className='data-errors'>
                    {leftResult.error && <p>Original: {leftResult.error}</p>}
                    {rightResult.error && <p>Changed: {rightResult.error}</p>}
                </div>
            )}

            <div className={'data-output-grid' + (diffMode ? ' diff-enabled' : '')}>
                <section>
                    <div className='data-output-header'>
                        <h4>{diffMode ? 'Formatted Original' : 'Formatted Output'}</h4>
                        <button type='button' onClick={() => copy('left', leftResult.text)} disabled={!leftResult.text}>{copied === 'left' ? 'Copied' : 'Copy'}</button>
                    </div>
                    <pre>{leftResult.text || 'Formatted output will appear here.'}</pre>
                </section>
                {diffMode && <section>
                    <div className='data-output-header'>
                        <h4>Formatted Changed</h4>
                        <button type='button' onClick={() => copy('right', rightResult.text)} disabled={!rightResult.text}>{copied === 'right' ? 'Copied' : 'Copy'}</button>
                    </div>
                    <pre>{rightResult.text || 'Add a second document to format and diff.'}</pre>
                </section>}
            </div>

            {diffRows.length > 0 && (
                <section className='data-diff'>
                    <h4>Diff</h4>
                    <div className='data-diff-grid'>
                        {diffRows.map((row, index) => (
                            <div className={'data-diff-row ' + row.type} key={`${row.type}-${index}-${row.left}-${row.right}`}>
                                <pre>{row.left}</pre>
                                <pre>{row.right}</pre>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default DataFormatterDiff;
