import Header from '../components/Header';
import Description from '../components/Description';
import Insertion from '../components/Insertion';
import { useState } from 'react';

export default function InsertionSortPage() {
  const [barWidth, setBarWidth] = useState(null);

  return (
    <>
      <Header algorithm="insertion" />
      <Description algorithm="insertion" width={barWidth} />
      <Insertion onWidthChange={setBarWidth} />
    </>
  );
}
