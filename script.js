
onload = function() {
    drawImg();
}
function drawImg() {
    let univName = document.getElementById('univName_id').value;
    let univNameEng = document.getElementById('univNameEng_id').value;
    let univColor = document.getElementById('univColor_id').value;
    let canvas = document.getElementById('logogene');
    let cvs = canvas.getContext('2d');
    cvs.clearRect(0, 0, 500, 500);
    cvs.fillStyle = univColor;
    cvs.fillRect(50, 52, 86, 46)
    cvs.fillRect(61, 109, 24, 24)
    cvs.fillStyle = "#333333";
    cvs.font = '50px Kiwi Maru';
    cvs.fillText(univName, 150, 95, 290);
    cvs.font = '23px Source Code Pro';
    cvs.fillText(univNameEng, 151, 128, 290);
}