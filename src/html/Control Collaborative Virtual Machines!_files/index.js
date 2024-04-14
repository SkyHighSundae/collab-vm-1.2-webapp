// CollabVM ban screen by Elijah R
// Papers Please and all assets are (C) Lucas Pope
const mainimage = document.getElementById("mainimage");
const dialogue = document.getElementById("dialogue");
const music = document.getElementById("music");
const nextbtn = document.getElementById("nextbtn");
music.addEventListener('ended', () => music.play());
mainimage.addEventListener('contextmenu', (f) => {f.preventDefault(); return false;}, {capture: true});
mainimage.src = "assets/Interrogation.png";
const params = new URLSearchParams(window.location.search);
const username = params.get("username") || localStorage.getItem("username") || "guest";
const banreason = params.get("banreason") || "breaking CollabVM rules";
const imgs = [];
imgs.push(document.getElementById("interrogationImg"));
imgs.push(document.getElementById("jailDoorImg"));
imgs.push(document.getElementById("jailNearImg"));
imgs.push(document.getElementById("jailFarImg"));
imgs.push(document.getElementById("gloryImg"));
var currentImg = 0;
function type(text) {
    return new Promise((res, rej) => {
        dialogue.innerHTML = "";
        var i = 0;
        var interval = setInterval(() => {
            if (i === text.length) {
                clearInterval(interval);
                res();
                return;
            }
            dialogue.innerHTML += text[i];
            i++;
        }, 90);
    });
}

async function play() {
    try {
        await music.play();
    } catch {
        await autoplayDialog();
        await music.play();
    }
    await sleep(200);
    await type(`Hello, ${username}`);
    await nextBtn();
    await type("We have audited your recent activities.");
    await nextBtn();
    await type(`Your activities ${banreason} have been uncovered.`);
    await nextBtn();
    await type("This represents treason of the highest order.");
    await nextBtn();
    await type(`Goodbye, ${username}`);
    await nextBtn();
    nextImg();
    await type("You have been banned from CollabVM.");
    await nextBtn();
    nextImg();
    await type("The execution is scheduled for tomorrow.");
    await nextBtn();
    nextImg();
    await type("Forkies have been destroyed. The balance of justice is restored.");
    await nextBtn();
    nextImg();
    await type("Glory to CollabVM.");
}
function autoplayDialog() {
    return new Promise((res, rej) => {
        var autoplay = document.getElementById("autoplay");
        autoplay.style.display = "block";
        autoplay.addEventListener("click", () => {
            res();
            autoplay.style.display = "none";
        });
    });
}
function sleep(time) {
    return new Promise(res => setTimeout(() => res(), time));
}
function nextBtn() {
    return new Promise(res => {
        nextbtn.style.display = "block";
        nextbtn.addEventListener('click', () => {
            nextbtn.style.display = "none";
            res();
        }, {once: true});
    });
}
function nextImg() {
    return new Promise(res => {
        imgs[currentImg+1].classList = "";
        var i = 0;
        var inter = setInterval(() => {
            if (i >= imgs[currentImg].width) {
                clearInterval(inter);
                imgs[currentImg].classList = "hidden";
                currentImg++;
                res();
                return;
            }
            imgs[currentImg].style["clip-path"] = `inset(0 ${i}px 0 0)`;
            i += 5;
        }, 5)
    });
}
play();
