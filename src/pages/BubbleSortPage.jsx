import Header from '../components/Header';
import Description from '../components/Description';
import Bubble from '../components/Bubble';
import { useState } from 'react';

export default function BubbleSortPage() {
  const [barWidth, setBarWidth] = useState(null);

  return (
    <>
      <Header algorithm="bubble" />
      <Description algorithm="bubble" width={barWidth} />
      <Bubble onWidthChange={setBarWidth} />
    </>
  );
}
