function generateRandomSequence() {
    const seq = [];
    for (let i = 0; i < 20; i++) {
        // int bw 1 and 20
        seq.push(Math.floor(Math.random() * 20) + 1);
    }
    return seq;
}

function createBars() {
    const seq = generateRandomSequence();
    for (const s of seq) {
        const div = document.createElement('div');
        div.className = "bar";
        div.style.height = `${s}vh`;
        document.querySelector('.bar-container').appendChild(div);
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function matchBlurbToChartWidth() {
  const chart = document.querySelector('.bar-container');
  const blurb = document.querySelector('.description');

  if (chart && blurb) {
    const chartWidth = chart.offsetWidth;
    blurb.style.maxWidth = `${chartWidth}px`;
  }
}

window.addEventListener('load', matchBlurbToChartWidth);
window.addEventListener('resize', matchBlurbToChartWidth);