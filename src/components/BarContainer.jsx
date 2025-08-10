import { useEffect, useRef, useState } from 'react';
import Bar from './Bar';
import { generateRandomSequence, sleep } from '../utils/sortingUtils';

export default function BarContainer({ algorithm, onWidthChange }) {
  const [bars, setBars] = useState(generateRandomSequence().map(h => ({ height: h, color: null })));
  const [floatingKey, setFloatingKey] = useState(null); // { index, height }

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

  const updateColor = (indices, color) => {
    setBars(prev =>
      prev.map((bar, i) =>
        indices.includes(i) ? { ...bar, color } : bar
      )
    );
  };

  const swapHeights = (i, j) => {
    setBars(prev => {
      const newBars = [...prev];
      const temp = newBars[i].height;
      newBars[i].height = newBars[j].height;
      newBars[j].height = temp;
      return newBars;
    });
  };

  const bubbleSort = async () => {
    let newBars = [...bars];
    let swaps = true;

    while (swaps) {
      swaps = false;
      for (let i = 0; i < newBars.length - 1; i++) {
        updateColor([i, i + 1], '#f873d2');
        await sleep(500);

        if (newBars[i].height > newBars[i + 1].height) {
          swapHeights(i, i + 1);
          swaps = true;
          await sleep(500);
        }

        updateColor([i, i + 1], '#4ea217');
        await sleep(500);
      }
    }
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
        updateColor([j], '#4ea217');
        setBars([...newBars]);
        j--;
        await sleep(700);
      }

      // insert bar
      setFloatingKey(null);
      newBars[j + 1].height = keyHeight;
      updateColor([j + 1], '#67a3d9');
      setBars([...newBars]);
      await sleep(700);
      updateColor([j + 1], '#4ea217');
    }
  };

  useEffect(() => {
    if (algorithm === 'bubble') bubbleSort();
    else if (algorithm === 'insertion') insertionSort();
  }, [algorithm]);

  return (
    <div className="visualize-container" ref={containerRef}>
      {floatingKey && (
        <div
          className="floating-key"
          style={{
            left: `${floatingKey.index * 4}vw`,
            height: floatingKey.height + 'vh',
          }}
        />
      )}
      <div className="bar-container">
        {bars.map((bar, i) => (
          <Bar key={i} height={bar.height} color={bar.color} />
        ))}
        </div>
    </div>
  );
}