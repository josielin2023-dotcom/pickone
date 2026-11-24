/* ============ 在這裡換成你自己的角色 ============
   image：角色圖片路徑（放進 images 資料夾）
   rainbow：true 的那一位是特別角色，抽中會有彩虹流動發光（只設一位） */
const characters = [
    { name: 'ABC Melody', image: 'images/a1.jpg', desc: '「Darling，住的地方當然要有 vibe 啊！我不一定每天開 Party，但朋友來的時候，總要有地方坐、有地方聊，最好還能讓大家覺得：Wow！這個地方真的很有 taste。你懂那種 feeling 嗎？」' },
    { name: 'Couple 怪怪情侶檔', image: 'images/a3.jpg', desc: '「我們兩個感情很好，真的很好！吃飯要一起、睡覺要一起、連發呆也要一起。不過有時候嘛……還是會想要一點自己的空間。可是太遠又不行，最好抬頭就看得到對方。」' },
    { name: '鼠媽與五十隻小老鼠', image: 'images/a4.jpg', desc: '「唉唷，先跟你說喔，我家人口比較多啦。五十個孩子，聽起來好像很多？其實還好啦，只是每天早上起床就有十幾隻不知道跑去哪裡，吃飯的時候又全部擠在一起。我一個人帶牠們也習慣了，只是現在這個地方真的有點不夠用。有些孩子喜歡跑來跑去，有些晚上不睡覺，還有幾隻特別愛鑽來鑽去……我只希望晚上點名的時候，每一隻都還在。啊！對了，附近最好不要有貓。拜託，這次真的不想再搬家了。」' },
    { name: '霸道總裁＋小三', image: 'images/a5.jpg', desc: '「我這個人啊，平常事情很多，有些朋友也不是那麼方便讓大家認識。偶爾想找個地方喝喝茶、聊聊天，不用太大，但最好不要每次都被別人撞見。你懂我意思吧？」' },
    { name: '毛病特多肥鼠', image: 'images/a8.jpg', desc: '「我先說喔，我這個人真的沒有很難搞。只是不能太潮濕、不能太乾燥、不能太吵、不能太亮，也不能太暗。風吹太大不行，完全沒風也不行。附近如果有奇怪的味道，我可能就要考慮一下了。這樣應該不算要求很多吧？」' },
    { name: '單身狗(鼠)', image: 'images/a7.jpg', desc: '「我其實沒什麼要求啦，一個人也可以過得很好。只是每天回家，總希望有個地方可以好好放空。朋友說要來找我？再說吧。我比較喜歡那種不用特別跟誰打招呼的生活。」' },
    { name: '玉皇大帝', image: 'images/a2.jpg', desc: '「朕平時公務繁忙，俯瞰眾生乃日常之事。住處不必過於奢華，但若一抬頭就只能看見別人的屋頂，實在有失身分。還有，來朝見的人，總得知道自己該往哪裡走吧？」', rainbow: true },
];
/* ============================================== */

const stage = document.getElementById('stage');
const btn = document.getElementById('drawBtn');

/* 洗牌袋抽法：把 7 位洗牌後依序抽，抽完再重新洗牌。
   每一輪 7 張一定各出現一次（不重複），長期下來每位機率仍然相同。
   換輪時也會避免「上一輪最後一張」接著就是「下一輪第一張」。 */
let bag = [];
let last = -1;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function nextIndex() {
    if (bag.length === 0) {
        bag = shuffle(characters.map((_, i) => i));
        if (bag[0] === last && bag.length > 1) {
            const k = 1 + Math.floor(Math.random() * (bag.length - 1));
            [bag[0], bag[k]] = [bag[k], bag[0]];
        }
    }
    last = bag.shift();
    return last;
}

function draw() {
    const c = characters[nextIndex()];

    const card = document.createElement('article');
    card.className = 'card' + (c.rainbow ? ' rainbow' : '');

    const img = document.createElement('img');
    img.className = 'avatar';
    img.src = c.image;
    img.alt = c.name;
    img.onerror = () => {
        const ph = document.createElement('div');
        ph.className = 'ph';
        ph.textContent = '找不到圖片：' + c.image;
        img.replaceWith(ph);
    };

    const h2 = document.createElement('h2');
    h2.textContent = c.name;
    const p = document.createElement('p');
    p.textContent = c.desc;

    card.append(img, h2, p);
    stage.replaceChildren(card);
}

btn.addEventListener('click', () => {
    btn.disabled = true;
    draw();
    setTimeout(() => { btn.disabled = false; }, 700);
});