
async function getalbum() {
    let albumname = [];
    let t;
    let resp1 = await fetch("http://127.0.0.1:5500/songs1");
    let resp2 = await resp1.text();



    let div = document.createElement("div");
    div.innerHTML = resp2;

    let anch = Array.from(div.getElementsByTagName("a"))
    t = albumname.length;
    for (let i = 3; i < anch.length; i++) {
        albumname[t++] = anch[i].href.split("/songs1/")[1];
    }


    for (let i = 0; i < t - 1; i++) {
        let card = document.querySelector(".card");
        let newcard = document.createElement("div");
        newcard.className = "card";
        newcard.innerHTML = card.innerHTML;
        let album = document.querySelector(".songs");
        album.append(newcard)
    }

    for (let i = 0; i < t; i++) {

        document.getElementsByTagName("h3")[i].innerHTML = albumname[i];

    }

    for (let i = 0; i < t; i++) {

        document.getElementsByClassName("card")[i].addEventListener("click", () => {



            getsongs(albumname[i]);


        })
    }
}


async function main2() {
    await getalbum();
}
main2();





let list = [];
let songs = [];
let names = [];
let n1, n2



let div2 = document.createElement("div");
// div2.innerHTML=song.innerHTML;

let y = 0;

async function getsongs(folder) {

    let a = await fetch(`http://127.0.0.1:5500/songs1/${folder}/`);
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    list = div.getElementsByTagName("a");
    n1 = list.length;
    for (let i = 0; i < n1; i++) {

        if (list[i].href.endsWith("mp3")) {
            songs[i] = list[i].href;
            names[i] = songs[i].split(`/songs1/${folder}/`)[1].replaceAll("%20", " ");
        }
    }


    let new_song = document.createElement("div")
    new_song.className = "song";

    let front = document.createElement("div");
    front.className = "front";

    let img = document.createElement("img");
    img.src = "music-1005-svgrepo-com.svg";

    let name = document.createElement("div");
    name.className = "name";

    let dot = document.createElement("div");
    let li = document.createElement("li");

    let playnow = document.createElement("div");
    playnow.className = "playnow";

    let span = document.createElement("span");
    span.innerHTML = "Play now"

    let img2 = document.createElement("img");
    img2.src = "play-circle-svgrepo-com.svg";

    playnow.insertAdjacentElement("afterbegin", span)
    playnow.insertAdjacentElement("beforeend", img2)

    name.append(li);
    name.append(dot);
    front.append(img);
    front.append(name);

    new_song.append(front);
    new_song.append(playnow);



    let playlist = document.querySelector(".playlist");
    let new_playlist = document.createElement("div")
    new_playlist.className = "playlist";
    // let song = document.querySelector(".song");
    for (let i = 4; i < n1; i++) {

        let div = document.createElement("div");
        div.className = "song";

        div.innerHTML = new_song.innerHTML;
        new_playlist.insertAdjacentElement("beforeend", div);

    }
    playlist.outerHTML = new_playlist.outerHTML
   

    for (let i = 4; i < n1; i++) {
        document.getElementsByClassName("song")[i - 4].getElementsByTagName("li")[0].innerHTML = names[i];
    }




    y++;



    if (y == 1) {
        main();
    }
    for (let l = 0; l < n1 - 4; l++) {
        document.getElementsByClassName("song")[l].addEventListener("click", () => {

            title.innerHTML = names[l + 4];
            pla.src = "playbtnforfoot.svg";
            audio.pause();
            audio = new Audio(songs[l + 4]);
            audio.play();
            pla.src = "pause-circle-svgrepo-com.svg";
            audio.addEventListener("loadeddata", () => {

                duration = parseInt(audio.duration);
                document.body.querySelector(".duration").innerHTML = duration;
                const seekbar = document.getElementById("seekbar");

               
                audio.addEventListener("timeupdate", function () {
                    const value = (audio.currentTime / audio.duration) * 100;
                    seekbar.value = value;
                });
                seekbar.addEventListener("input", function () {
                    const seekTo = audio.duration * (seekbar.value / 100);
                    audio.currentTime = seekTo;
                });
       
            })
        })

    }
}






var audio;
let k = 4;
let title = document.querySelector(".songtitle");


let j = 0;

function main() {

    pla.src = "pause-circle-svgrepo-com.svg";
    if (j != 0) {
        audio.pause();
    }

    title.innerHTML = names[k];
    audio = new Audio(songs[k]);
    audio.play();
    var duration;
    if (j == 0) {
        audio.addEventListener("loadeddata", () => {

            duration = parseInt(audio.duration);
            document.body.querySelector(".duration").innerHTML = duration;

        })
    }
    document.body.querySelector(".back").addEventListener("click", () => {
        if ((k < n1 + 1) && (k > 4)) {

            audio.pause();
            pla.src = "playbtnforfoot.svg";
            title.innerHTML = names[--k];
            audio = new Audio(songs[k]);
            audio.play();
            pla.src = "pause-circle-svgrepo-com.svg";
            audio.addEventListener("loadeddata", () => {

                duration = parseInt(audio.duration);
                document.body.querySelector(".duration").innerHTML = duration;
            })
        }
    })
    document.body.querySelector("#front").addEventListener("click", () => {
        if ((k < n1 - 1) && (k >= 4)) {
            audio.pause();
            pla.src = "playbtnforfoot.svg";
            title.innerHTML = names[++k];
            audio = new Audio(songs[k]);
            audio.play();
            pla.src = "pause-circle-svgrepo-com.svg";
            audio.addEventListener("loadeddata", () => {

                duration = parseInt(audio.duration);
                document.body.querySelector(".duration").innerHTML = duration;
            })
        }
    })


    audio.addEventListener("loadeddata", () => {

        duration = parseInt(audio.duration);

    })

    const volumecontrol = document.getElementById("volumebar");
    const seekbar = document.getElementById("seekbar");
    audio.addEventListener("loadeddata", () => {
        let ct;
        let cursor;
        
        setInterval(() => {
            duration = audio.duration
            ct = parseInt(audio.currentTime);
            document.body.querySelector(".time").innerHTML = ct;
            cursor = (ct / duration) * 100;
          

            // document.getElementById("pointer").style.left = `${cursor}%`;
            
        }, 1000);
        if (cursor == 100) {
            audio = new Audio(songs[++k]);
            audio.play();
        }
        audio.volume = (+volumecontrol.value) / 100;
        volumecontrol.addEventListener("input", function () {
            audio.volume = (+volumecontrol.value) / 100;

        });

        audio.addEventListener("timeupdate", function () {
            const value = (audio.currentTime / audio.duration) * 100;
            seekbar.value = value;
        });
        seekbar.addEventListener("input", function () {
            const seekTo = audio.duration * (seekbar.value / 100);
            audio.currentTime = seekTo;
        });


    });



    j++;




}
let pla = document.body.querySelector(".mid");
let p = true;
function play() {
    if (p) {
        pla.src = "pause-circle-svgrepo-com.svg";
        audio.play();
    }

    else {
        pla.src = "playbtnforfoot.svg";
        audio.pause();
    }

    p = !p;
};











