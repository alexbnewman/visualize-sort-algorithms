import { useEffect, useRef, useState } from 'react';
import Bar from './Bar';
import { generateRandomSequence, sleep } from '../utils/sortingUtils';

export default function BarContainer({ onWidthChange }) {
  const [bars, setBars] = useState(generateRandomSequence().map(h => ({ height: h, color: null })));
  const [floatingKey, setFloatingKey] = useState(null); // { index, height }
  const containerRef = useRef();
  const [barSize, setBarSize] = useState({ width: 0, height: 0 });

  // get width and height dynamically
  useEffect(() => {
    const firstBar = containerRef.current?.querySelector('.bar');
    if (firstBar) {
      const barRect = firstBar.getBoundingClientRect();
      setBarSize({ width: barRect.width, height: barRect.height });
    }
  }, []);

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

  const updateColor = (indices, color) => {
    setBars(prev =>
      prev.map((bar, i) =>
        indices.includes(i) ? { ...bar, color } : bar
      )
    );
  };

  const insertionSort = async () => {
    let newBars = [...bars];
    for (let i = 1; i < newBars.length; i++) {
      const keyHeight = newBars[i].height;
      let j = i - 1;

      updateColor([i], '#fadadd');
      setFloatingKey({ index: i, height: newBars[i].height });
      await sleep(700);

      while (j >= 0 && newBars[j].height > keyHeight) {
        // move floating bar left
        setFloatingKey({ index: j, height: keyHeight });
        updateColor([j], '#f873d2');
        await sleep(700);

        newBars[j + 1].height = newBars[j].height;
        updateColor([j + 1], '#f873d2');
        // todo why doesnt the line above do anything?
        updateColor([j], '#4ea217');
        j--;
        await sleep(700);
      }

      // insert bar
      setFloatingKey(null);
      newBars[j + 1].height = keyHeight;
      updateColor([j + 1], '#67a3d9');
      await sleep(700);
      updateColor([j + 1], '#4ea217');
      
      // reset all bars to green
      await sleep(700);
      updateColor(newBars.map((_, i) => i), '#4ea217');
    }
  };

  useEffect(() => {
    // Small delay to ensure component is mounted
    const timer = setTimeout(() => {
      insertionSort();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Calculate left offset of floating key in pixels relative to container
  let floatingKeyLeft = 0;
  if (floatingKey && containerRef.current && barSize.width) {
    const visualizeLeft = containerRef.current.getBoundingClientRect().left;

    // Query the insertion container inside visualize-container
    const insertionContainer = containerRef.current.querySelector('.insertion-container');
    const insertionLeft = insertionContainer?.getBoundingClientRect().left || 0;

    const distanceBetweenContainers = insertionLeft - visualizeLeft;

    // Assuming 1px gap per bar between bars:
    const gap = 1;

    floatingKeyLeft = visualizeLeft + distanceBetweenContainers + (floatingKey.index) * (barSize.width + gap);
  }
  return (
    <div className="visualize-container" ref={containerRef}>
      {floatingKey && (
        <div
          className="floating-key"
          style={{
            //need to add distance from left to beginning of container to beginnning of first bar
            left: `${floatingKeyLeft}px`,
            width: `${barSize.width}px`,
            height: `${floatingKey.height + 4}vh`, // this one comes from sorting state
          }}
        />
      )}
      <div className="insertion-container">
        {bars.map((bar, i) => (
          <Bar key={i} height={bar.height} color={bar.color} />
        ))}
        </div>
    </div>
  );
}