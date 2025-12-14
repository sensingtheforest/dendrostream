import { useState } from 'react';

export default function CodeBox({ preamble='', code='', postamble='', singleLine=false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="position-relative border rounded bg-light p-3" style={{ minWidth: '75%', maxWidth: '100%', marginTop: '0rem', marginBottom: '1rem' }}>
        <pre 
            className="m-0" 
            style={{ 
                padding: singleLine ? '0 100px 0 25px' : '25px',
                textAlign: singleLine ? 'center' : 'left'
            }}
        >
            <code>{`${preamble}${code}${postamble}`}</code>
        </pre>
      <button
        className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-2"
        onClick={handleCopy}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
