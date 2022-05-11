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
    for (let i = 0; i < 7; i++) {
        document.getElementById('bt' + i).style.color = i === active_button? 'red' : 'white';
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
    document.getElementById('viewport-contain').style.filter = "blur(20px)";
})

function animate() {
    requestAnimationFrame(animate);
    animate_filter_buttons();
}

for (let i = 0; i < 7; i++) {
    let element = document.getElementById('bt' + i);
    element.addEventListener('mouseenter', () => setHoverButton(i));
    element.addEventListener('mouseleave', () => setHoverButton(-1));
    element.addEventListener('click', () => setActiveButton(i));
}

animate();