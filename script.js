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
        document.querySelector('.container').appendChild(div);
    }
}

createBars();

async function bubbleSort() {
    
}