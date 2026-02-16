import React from 'react'

function StatusBadge({ slots, totalSlots }) {
  const percentage = (slots / totalSlots) * 100;
  
  let color;
  let text;

  if (percentage === 0) {
    color = 'bg-danger'; // Red for Full
    text = 'FULL';
  } else if (percentage < 20) {
    color = 'bg-warning text-dark'; // Yellow for Almost Full
    text = 'ALMOST FULL';
  } else {
    color = 'bg-success'; // Green for Available
    text = 'AVAILABLE';
  }

  return (
    <span className={`badge ${color} py-2 px-3`}>
      {text}: {slots} Left
    </span>
  );
}

export default StatusBadge;
