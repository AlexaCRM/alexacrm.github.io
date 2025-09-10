import React, { useState, ReactNode } from 'react';

interface ExpandableSectionProps {
  title: string;
  children: ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: '1em' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          fontSize: '1em',
          padding: 0,
          color: '#007acc',
        }}
      >
        {open ? '🔼 Hide' : '🔽 Show'} {title}
      </button>
      {open && <div style={{ marginTop: '0.5em' }}>{children}</div>}
    </div>
  );
};

export default ExpandableSection;
