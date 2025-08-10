const descriptions = {
  bubble: [
    "Bubble sort compares two adjacent objects at a time.",
    "If they're in the wrong order, they get swapped.",
    'This repeats until the list is sorted, causing larger values to "bubble" to the end with each pass.'
  ],
  insertion: [
    'Insertion sort starts from the second element.',
    'It compares it backward to sorted elements and inserts it in the correct spot.',
    'This process repeats for all elements, like sorting cards in hand.'
  ],
};

export default function Description({ algorithm, width }) {
  return (
    <ul className="description" style={width ? { width: `${width}px` } : {}}>
      {descriptions[algorithm].map((text, idx) => (
        <li key={idx}>{text}</li>
      ))}
    </ul>
  );
}
