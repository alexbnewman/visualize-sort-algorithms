createBars();

async function insertionSort() {
    const bars = document.querySelectorAll(".bar");

    // starting at 1 bc technically 0 index is already sorted
    for (let i = 1; i < bars.length; i++) {
        const keyHeight = parseInt(bars[i].style.height);
        let j = i - 1;

        bars[i].style.backgroundColor = '#fadadd';
        await sleep(700);

        // compare w all bars b4 it
        while (j >= 0 && parseInt(bars[j].style.height) > keyHeight) {
            bars[j].style.backgroundColor = '#f873d2';
            await sleep(700);
            // shift all bars greater than keyHeight to the right
            bars[j + 1].style.height = bars[j].style.height;
            bars[j + 1].style.backgroundColor = '#f873d2';
            bars[j].style.backgroundColor = '#4ea217';

            j--;
            await sleep(700);

            for (let k = 0; k <= i; k++) {
                if (bars[k].style.backgroundColor !== '#4ea217') {
                    bars[k].style.backgroundColor = '#4ea217'; // or some neutral
                }
            }
        }

        // insert bar
        bars[j + 1].style.height = `${keyHeight}vh`;
        bars[j + 1].style.backgroundColor = '#67a3d9';
        await sleep(700);
        bars[j + 1].style.backgroundColor = '#4ea217';
    }
}

insertionSort();