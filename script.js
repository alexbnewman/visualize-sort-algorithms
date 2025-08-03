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

createBars();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");
    let swaps_occurred = true;

    while (swaps_occurred) {
        swaps_occurred = false;

        for (let i = 0; i < bars.length - 1; i++) {
            // set colors for cols that r being compared
            bars[i].style.backgroundColor = "#f873d2";
            bars[i + 1].style.backgroundColor = "#f873d2";
            // let user see which cols r being compared
            await sleep(500);

            // see if they need to be swapped; change heights and colors if so
            const height1 = parseInt(bars[i].style.height);
            const height2 = parseInt(bars[i + 1].style.height);

            if (height1 > height2) {
                bars[i].style.height = `${height2}vh`;
                bars[i + 1].style.height = `${height1}vh`;
                swaps_occurred = true;
                await sleep(500);
            }
            // reset cols back to og color
            bars[i].style.backgroundColor = "#4ea217";
            bars[i + 1].style.backgroundColor = "#4ea217";
            // sleep for a sec b4 next comparison
            await sleep(500);
        }
    }
}

bubbleSort();