import { useEffect, useRef, useState } from 'react';
import Bar from './Bar';
import { generateRandomSequence, sleep } from '../utils/sortingUtils';

export default function Bubble({ onWidthChange }) {
  const [bars, setBars] = useState(generateRandomSequence().map(h => ({ height: h, color: null })));
  const sortingRef = useRef(false); // Reference to track sorting state
  const containerRef = useRef();

  // When size changes, inform parent (e.g. Description component)
  useEffect(() => {
    if (!onWidthChange || !containerRef.current) return;

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        onWidthChange(newWidth);
      }
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [onWidthChange]);

  const bubbleSort = async () => {
    if (sortingRef.current) return; // Exit if already sorting
    sortingRef.current = true;      // Mark as sorting
    let newBars = [...bars];
    let swaps = true;

    while (swaps) {
      swaps = false;
      for (let i = 0; i < newBars.length - 1; i++) {
        newBars[i].color = '#f873d2';
        newBars[i + 1].color = '#f873d2';
        setBars([...newBars]);
        await sleep(500);

        if (newBars[i].height > newBars[i + 1].height) {
            const temp = newBars[i].height;
            newBars[i].height = newBars[i + 1].height;
            newBars[i + 1].height = temp;

            // Update the bars state with swapped values
            // Need to set bars to a reference to a new object -- otherwise setting it to same
            // thing it has already been referencing (newBars) won't trigger a re-render
            setBars([...newBars]);
            swaps = true;
            await sleep(500);
        }

        newBars[i].color = '#4ea217';
        newBars[i + 1].color = '#4ea217';
        setBars([...newBars]);
        await sleep(500);
      }
    }
    sortingRef.current = false; // Mark as not sorting anymore
  };

  useEffect(() => {
    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      bubbleSort();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bubble-container">
        {bars.map((bar, i) => (
            <Bar key={i} height={bar.height} color={bar.color} />
        ))}
    </div>
  );
}