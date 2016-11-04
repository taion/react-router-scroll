import React from 'react';

export function ScrollableComponent() {
  return (
    <div style={{ width: 100, height: 100, overflow: 'hidden' }}>
      <div style={{ width: 20000, height: 20000 }} />
    </div>
  );
}
