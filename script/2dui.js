let hover_button = -1;
let positions = new Array(7);
for (let i = 0; i < 7; i++) positions[i] = 0;

const cursor = curDot({
    zIndex: 200,
    diameter: 50,
    borderWidth: 0,
    easing: 2,
    background: '#fff'
});

function setHoverButton(num) {
    hover_button = num;
}

function animate_filter_buttons() {
    for (let i = 0; i < 7; i++) {
        let target_pos = hover_button === i ? 20 : 0;
        positions[i] += (target_pos - positions[i]) / 7;
    }
    for (let i = 0; i < 6; i++) {
        document.getElementById('bt' + i).style.paddingLeft = positions[i] + 'px';
    }
    document.getElementById('about').style.paddingRight = positions[6] + 'px';
}

document.getElementById('about').addEventListener('mouseenter', () => setHoverButton(6));
document.getElementById('about').addEventListener('mouseleave', () => setHoverButton(-1));

for (let i = 0; i < 6; i++) {
    let element = document.getElementById('bt' + i);
    element.addEventListener('mouseenter', () => setHoverButton(i));
    element.addEventListener('mouseleave', () => setHoverButton(-1));
}

