let hover_button = -1;
let active_button = -1;
let positions = new Array(6);
for (let i = 0; i < 7; i++) positions[i] = 0;

const cursor = curDot({
    zIndex: 200,
    diameter: 50,
    borderWidth: 0,
    easing: 2,
    background: '#fff'
});

function setHoverButton(num) { hover_button = num; }
function setActiveButton(num) {
    active_button = active_button === num? -1 : num;
    for (let i = 0; i < 6; i++) {
        let prefix = '>';
        if (active_button !== -1) {
            prefix = active_button === i? '+' : '-';
        }
        document.getElementById('bt' + i).innerText =
            prefix + document.getElementById('bt' + i).innerText.slice(1);
    }
}

function animate_filter_buttons() {
    for (let i = 0; i < 7; i++) {
        let target_pos = hover_button === i ? 20 : 0;
        positions[i] += (target_pos - positions[i]) / 7;
    }
    for (let i = 0; i < 7; i++) {
        document.getElementById('bt' + i).style.paddingLeft = positions[i] + 'px';
    }
}

document.getElementById('bt6').addEventListener('click', () => {
    cluster.array[0].position.z = 50;
})

for (let i = 0; i < 7; i++) {
    let element = document.getElementById('bt' + i);
    element.addEventListener('mouseenter', () => setHoverButton(i));
    element.addEventListener('mouseleave', () => setHoverButton(-1));
    element.addEventListener('click', () => setActiveButton(i));
}