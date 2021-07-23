
/* 全体に渡って使用する変数を定義 */
let univName
let univNameEng
let univColor
let count
/* ページ読み込み時に実行する処理を記述 */
onload = function() {
    /* GETパラメータ（クエリ文字列）を取得する処理 */
    let params = (new URL(document.location)).searchParams;
    /* GETパラメータが存在する場合には以下の処理を実行 */
    if (params.get('univName') != null) {
        /* 各GETパラメータから内容を取得 */
        univName = params.get('univName');
        univNameEng = params.get('univNameEng');
        univColor = params.get('univColor');
        /* 各テキストボックスを取得したGETパラメータの内容で置き換える */
        document.getElementById('univName_id').value = univName;
        document.getElementById('univNameEng_id').value = univNameEng;
        document.getElementById('univColor_id').value = univColor;
        count = 1; // 変数countを1にすることで関数drawImg内で二重に処理が実行されることを防ぐ
    }
    drawImg(); // 読み込み時に関数drawImgを実行
}
function drawImg() {
    /* 変数countが1以外の場合に以下の処理を実行 */
    if (count != 1) {
        /* 各テキストボックスから内容を取得 */
        univName = document.getElementById('univName_id').value;
        univNameEng = document.getElementById('univNameEng_id').value;
        univColor = document.getElementById('univColor_id').value;
    }
    count = 2; // 変数countを2にすることで次回以降、上記の処理を行うようにする
    
    /* GETパラメータをURLに付け加える */
    history.pushState('','','?univName=' + univName + '&univNameEng=' + univNameEng + '&univColor=' + univColor);

    /* canvsの描写設定 */
    let canvas = document.getElementById('logoGene');
    let cvs = canvas.getContext('2d');

    cvs.clearRect(0, 0, 500, 500); // 描写するたびにcanvasを初期化
    cvs.fillStyle = "#" + univColor; // ロゴの色指定、カラーコードを変数univColorから読み込む
    cvs.fillRect(50, 52, 86, 46) // ロゴ四角（上）
    cvs.fillRect(61, 109, 24, 24) // ロゴ四角（下）
    cvs.fillStyle = "#333333"; // 文字の色指定
    cvs.font = '50px KiwiMaru'; // 漢字部分のフォント指定、フォントサイズ指定
    cvs.fillText(univName, 150, 95, 290); // 漢字部分の内容を変数univNameから読み込む
    cvs.font = '23px SourceCodePro'; // 英字部分のフォント指定、フォントサイズ指定
    cvs.fillText(univNameEng, 151, 128, 290); // 英字部分内容を変数univNameから読み込む
}