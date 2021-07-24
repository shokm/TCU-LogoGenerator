/* グローバル変数（全体に渡って使用する変数）を定義 */
let univName
let univNameEng
let univColor
let imageBase64
let i = 0;

/* ページ読み込み時に実行する処理を記述 */
onload = function() {
    /* GETパラメータ（クエリ文字列）を取得する処理 */
    let params = new URL(document.location).searchParams;
    /* GETパラメータが存在する場合には以下の処理を実行 */
    if (params.get('univName') != null || params.get('univNameEng') != null || params.get('univColor') != null ) {
        /* 各GETパラメータから内容を取得 */
        univName = params.get('univName');
        univNameEng = params.get('univNameEng');
        univColor = params.get('univColor');

        /* 各テキストボックスを取得したGETパラメータの内容で置き換える */
        document.getElementById('univName_id').value = univName;
        document.getElementById('univNameEng_id').value = univNameEng;
        document.getElementById('univColor_id').value = univColor;

        /* 関数drawHTMLとdrawImageを実行 */
        drawHTML();
        drawImage();
    } else {
        /* 関数clickButtonを実行 */
        clickButton();
    }
}
function clickButton() {
    /* 各テキストボックスから内容を取得 */
    univName = document.getElementById('univName_id').value;
    univNameEng = document.getElementById('univNameEng_id').value;
    univColor = document.getElementById('univColor_id').value;

    /* GETパラメータをURLに付け加える */
    history.pushState('','','?univName=' + univName + '&univNameEng=' + univNameEng + '&univColor=' + univColor);

    /* 関数drawImageを実行 */
    drawImage();

    /* localStorageに配列を保存する処理 */
    let saveData = [univName, univNameEng, univColor, imageBase64]; // localStorageに保存する配列
    localStorage.setItem(i, JSON.stringify(saveData)); // localStorageにJSONに変換した配列を保存（keyは変数iとして、0から順番に入れていく）

    /* 関数drawHTMLを実行 */
    drawHTML();
}
function drawImage() {
    /* canvsの描写設定 */
    let canvas = document.getElementById('logoGene');
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 500, 500); // 描写するたびにcanvasを初期化
    ctx.fillStyle = "#" + univColor; // ロゴの色指定、カラーコードを変数univColorから読み込む
    ctx.fillRect(50, 52, 86, 46) // ロゴ四角（上）
    ctx.fillRect(61, 109, 24, 24) // ロゴ四角（下）
    ctx.fillStyle = "#333333"; // 文字の色指定
    ctx.font = '50px KiwiMaru'; // 漢字部分のフォント指定、フォントサイズ指定
    ctx.fillText(univName, 150, 95, 290); // 漢字部分の内容を変数univNameから読み込む
    ctx.font = '23px SourceCodePro'; // 英字部分のフォント指定、フォントサイズ指定
    ctx.fillText(univNameEng, 151, 128, 290); // 英字部分の内容を変数univNameから読み込む

    imageBase64 = canvas.toDataURL("image/png"); // 画像をbase64化して変数imageBase64に入れる
}
function drawHTML() {
    /* localStorageに保存した情報をHTMLとして書き出す処理 */
    while (i < localStorage.length) {
        let readData = JSON.parse(localStorage.getItem(i)); // localStorageから保存した情報を読み込む
        let newElement = document.createElement('div'); // 新規にdiv要素を作成
        /* 書き出すHTMLを作成 */
        newElement.innerHTML = 
        (i + 1)+'個目<br>'
        +readData[0]+'<br>'
        +readData[1]+'<br>'
        +readData[2]+'<br>'
        +'<a href="./index.html?univName=' + readData[0] + '&univNameEng=' + readData[1] + '&univColor=' + readData[2] + '">編集する</a><br>'
        +'<img style="width:200px;height:80px;" src="'+ readData[3] +'" alt="">';
        document.getElementById('dispHistory').prepend(newElement); // 作成したHTMLをid="dispHistory"の要素の前に追加する
        i++;
    }
}