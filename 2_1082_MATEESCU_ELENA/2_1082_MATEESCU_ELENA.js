//Asigurarea incarcarii elementelor
window.onload = () => {
    let videoArea = document.getElementById('current-video');
    let playlist = document.querySelector('.video-list');
    let videoItems = playlist.querySelectorAll('.playlist-video-item');
    let playlistArea = document.querySelector("#video_player");
    let pasNav = 50;
    let tranzCount = videoItems.length;
    let itemsLength = videoItems.length;

    //Pozitioneaza canvas-ul peste film
    videoArea.style.position = 'absolute'
    videoArea.style.zIndex = -1;

    //Adauga efecte pe fiecare film din playlist
    var addListeners = function () {
        videoItems.forEach(vid=> {
            vid.addEventListener('mouseover', (e) => {
                e.preventDefault();
                vid.muted = true;
                vid.play();
            })

            vid.addEventListener('mouseleave', (e) => {
                e.preventDefault();
                vid.pause();
                vid.currentTime = 0;
            })

            //Incarca filmul in ecranul principal la click
            vid.addEventListener("click", (e) => {
                e.preventDefault();
                videoArea.src = vid.src;
                reviewVideo.src = vid.src;
                videoArea.play();
            })
        })
    }
    

    let addStergeButon = function () {
        videoItems[videoItems.length - 1].parentNode.insertAdjacentHTML("afterbegin", `<button class="buton-sterge-video"><i class="material-icons">delete_forever</i></button>`);
        let currentStergeButon = videoItems[videoItems.length - 1].parentNode.firstChild;
        currentStergeButon.addEventListener('click', (e) => {
            e.preventDefault();
            currentStergeButon.parentNode.remove();
            tranzCount--;
            itemsLength -= 1;
            if (itemsLength === 0) {
                videoItems.length = 0;
                playlistArea.insertAdjacentHTML('beforeend', '<h3 class="empty-playlist">Empty playlist</h3>')
            }
        });
    }

    //Gaseste pozitia videoului din ecranul principal
    let returnVideoUrmator= function (videoItems, videoArea) {
        let nextVideo;
        videoItems.forEach((vid, index) => {
            if (vid.src === videoArea.src) {
                if (videoItems[index + 1]) {
                    nextv= videoItems[index + 1].src;
                }
            }
        })
        return nextVideo;
    }

    let returnVideoPrecedent = function (videoItems, videoArea) {
        let previousVideo;
        videoItems.forEach((vid, index) => {
            if (vid.src === videoArea.src) {
                if (videoItems[index - 1]) {
                    prevv= videoItems[index - 1].src;
                }
            }
        })
        return previousVideo;
    }

    //Verifica daca s-a terminat filmul
    let pathVideo = document.querySelector('input[type=file]');
    pathVideo.addEventListener('change', (e) => {
        e.preventDefault();
       let path = window.URL.createObjectURL(e.target.files[0]);
       reviewVideo.src = path;
        videoArea.src = path;
    })
    addListeners();

    //Adaug un nou video in playlist
    document.getElementById('buton-adauga-playlist').addEventListener('click', (e) => {
        playlist.insertAdjacentHTML('beforeend', `<li><video class="playlist-video-item" src="${videoArea.src}" width="200px" height="112.5px" /></li>`)
        videoItems = playlist.querySelectorAll('.playlist-video-item');
        videoItems[videoItems.length - 1].addEventListener('click', (e) => {
            e.preventDefault();
            videoArea.src = e.target.src;
            reviewVideo.src = e.target.src;
            videoArea.play();
        })
        videoItems[videoItems.length - 1].addEventListener('mouseover', (e) => {
            e.preventDefault();
            e.target.muted = true;
            e.target.play();
        })

        videoItems[videoItems.length - 1].addEventListener('mouseleave', (e) => {
            e.preventDefault();
            e.target.pause();
            e.target.currentTime = 0;
        })
        
        addStergeButon();
        
        itemsLength += 1;
        if (itemsLength === 1) {
            document.querySelector('.empty-playlist').remove();
            tranzCount--;
            itemsLength -= 1;
        }
    })
//Sterg video-ul adaugat in playlist recent
    let deleteButon = document.querySelectorAll('.buton-sterge-video');
    deleteButon.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.parentNode.remove();
            tranzCount--;
            playlist.style.marginLeft -= btn.parentNode.width;
            videoItems.pop();
            console.log(videoItems);
            if (itemsLength === 0) {
                videoItems.length = 0;
                playlistArea.insertAdjacentHTML('beforeend', '<h3 class="empty-playlist">Empty playlist</h3>')
            }
        })

       
    })

//Functionalitatea butoanelor pt efecte
    let nothingSelected = false;
    let blackWhiteSelected = false;
    let negSelected = false;
    let pinkSelected = false;
    let aspenSelected = false;
    let icelandSelected = false;

    document.getElementById('buton-adauga-bw').addEventListener('click', (e) => {
        e.preventDefault();
        blackWhiteSelected = true;
        //Deselectez celelalte butoane
        negSelected = false;
        nothingSelected = false;
        pinkSelected = false;
        icelandSelected = false;
        aspenSelected = false;
    })

    document.getElementById('buton-adauga-inv').addEventListener('click', (e) => {
        e.preventDefault();
        negSelected = true;
        //Deselectez celelalte butoane
        blackWhiteSelected = false;
        nothingSelected = false;
        pinkSelected = false;
        aspenSelected = false;
        icelandSelected = false;
    })

    document.getElementById('buton-normal').addEventListener('click', (e) => {
        e.preventDefault();
        nothingSelected = true;
        //Deselectez celelalte butoane
        blackWhiteSelected = false;
        negSelected = false;
        pinkSelected = false;
        aspenSelected = false;
        icelandSelected = false;
    })

    document.getElementById('buton-adauga-pink').addEventListener('click', (e) => {
        e.preventDefault();
        pinkSelected = true;
        //Deselectez celelalte butoane
        nothingSelected = false;
        blackWhiteSelected = false;
        negSelected = false;
        aspenSelected = false;
        icelandSelected = false;
    })

    document.getElementById('buton-adauga-aspen').addEventListener('click', (e) => {
        e.preventDefault();
        aspenSelected = true;
        //Deselectez celelalte butoane
        nothingSelected = false;
        blackWhiteSelected = false;
        negSelected = false;
        pinkSelected = false;
        icelandSelected = false;

    })

    document.getElementById('buton-adauga-Iceland').addEventListener('click', (e) => {
        e.preventDefault();
        icelandSelected = true;
        //Deselectez celelalte butoane
        nothingSelected = false;
        blackWhiteSelected = false;
        negSelected = false;
        pinkSelected = false;
        aspenSelected = false;
    })

    //Aplicarea efectelor video selectabile de catre utilizator cu ajutorul unui element de tip canvas
    let canvas = document.getElementById('canvas1');
    let context = canvas.getContext("2d");
    let vidVolum = 384;

    function drawFrame() {
        let W = canvas.width = videoArea.clientWidth;
        let H = canvas.height = videoArea.clientHeight;

        context.drawImage(videoArea, 0, 0, W, H);

        let imgData = context.getImageData(0, 0, W, H);
        let pixels = imgData.data;
        
        //Efecte
        
        for (let y = 0; y < H; y++)
            for (let x = 0; x < W; x++) {
                let i = (y * W + x) * 4;
                let avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;

                //Efect Pink
                if (pinkSelected) {
                    pixels[i + 1] = avg / 2; //roz
                    pixels[i + 2] = pixels[i + 2] + 30; //accentueaza albastru
                }

                //Efect Aspen
                if (aspenSelected) {
                    pixels[i] += 10;
                    pixels[i + 1] += 10;
                }

                //Efect Iceland
                if (icelandSelected) {
                    pixels[i + 2] += 20;
                }

                //Efect Black&White
                if (blackWhiteSelected) {
                    pixels[i] = avg;
                    pixels[i + 1] = avg;
                    pixels[i + 2] = avg;
                }
                //Efect Negativ
                if (negSelected) {
                    pixels[i] = pixels[i] ^ 255; //inverseaza rosu
                    pixels[i + 1] = pixels[i + 1] ^ 255; // inverseaza verde
                    pixels[i + 2] = pixels[i + 2] ^ 255; //inverseaza albastru
                }
                //Niciun efect
                if (nothingSelected) {
                    pixels[i] = pixels[i]
                    pixels[i + 1] = pixels[i + 1]
                    pixels[i + 2] = pixels[i + 2]
                }
                
            }
    

        
        context.globalAlpha = 0.5; //semi-transparent
        context.putImageData(imgData, 0, 0);
        context.font = "bold 16px sans-serif";
        context.fillStyle = "black";
        context.fillText(videoArea.currentTime.toFixed(0) + "s", 10, H - 30);
        context.strokeText(videoArea.currentTime.toFixed(0) + "s", 10, H - 30);
        context.strokeStyle = 'black';

        //Desen pentru volum
        context.beginPath();
        context.fillStyle = 'red';
        context.globalAlpha = 0.3;
        context.rect(W - 27, H - 135, 10, 100);
        context.fill();
        desenVolum(vidVolum);
        //Buton Play???
        context.beginPath();
        context.moveTo(10, H - 45);
        context.lineTo(10, H - H / 7.5);
        context.lineTo(W / 22, H - H / 9);
        context.fillStyle = 'black';
        context.stroke();
        context.fill();
        //Buton Pauza-????
        let xLinie1 = 45;
        let x2Linie1 = 52;
        context.beginPath();
        context.moveTo(xLinie1, H - 45);
        context.lineTo(xLinie1, H - H / 7.5);
        context.lineTo(x2Linie1, H - 69.5);
        context.lineTo(x2Linie1, H - 45);
        context.lineTo(xLinie1, H - 45);
        context.fillStyle = 'black';
        context.stroke();
        context.fill();
        context.beginPath();
        xLinie1 = 58;
        x2Linie1 = 65;
        context.moveTo(xLinie1, H - 45);
        context.lineTo(xLinie1, H - H / 7.5);
        context.lineTo(x2Linie1, H - 69.5);
        context.lineTo(x2Linie1, H - 45);
        context.lineTo(xLinie1, H - 45);
        context.fillStyle = 'black';
        context.stroke();
        context.fill();
        //Desen Progress-Bar
        context.beginPath();
        context.fillStyle = 'black';
        //Desen Progress-Bar pe parcursul video-ului
        desenProgressBar(videoArea.duration, W - 25);
        context.rect(10, H - 25, W - 25, 10);
        context.fill();
        goToNextVid(); 
        //Desen pentru next
        context.beginPath();
        context.moveTo(W - 30, 20);
        context.lineTo(W - 30, 35);
        context.lineTo(W - 15, 27);
        context.lineTo(W - 30, 18);
        context.fill();
        //Desen pentru previous
        context.beginPath();
        context.moveTo(30, 20);
        context.lineTo(30, 35);
        context.lineTo(15, 27);
        context.lineTo(30, 18);
        context.fill();

    }
    window.setInterval(drawFrame, 30);


    let latime = canvas.width = videoArea.clientWidth;
    let H = canvas.height = videoArea.clientHeight;
    
    function desenProgressBar(durata, latimeBara) {
        let xProgressBar = 10;
        let yProgressBar = H - 25;

        let vitezaDesenare = (latimeBara / durata) * videoArea.currentTime;
        context.moveTo(xProgressBar, yProgressBar);
        context.rect(xProgressBar, yProgressBar, vitezaDesenare, 10);
        context.fillStyle = 'red';
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
        context.fill();
    }
    function desenVolum(y) {
        context.beginPath();
        context.rect(latime - 27, y, 10, 10);
        context.globalAlpha = 1;
        context.stroke();
        context.fill();
    }
     //Progress bar, volum, play, pause
    function funcVideo(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        console.log(x, y)

        let xPlayStart = 10;
        let xPlayEnd = xPlayStart + 25;
        let yPlayStart = 450;
        let yPlayEnd = yPlayStart + 25;
        if ((x >= xPlayStart && x <= xPlayEnd) && (y >= yPlayStart && y <= yPlayEnd)) {
            videoArea.play();
        }
        let xPauzaStart = 45;
        let xPauzaEnd = xPauzaStart + 20;
        let yPauzaStart = yPlayStart;
        let yPauzaEnd = yPlayEnd
        if ((x >= xPauzaStart && x <= xPauzaEnd) && (y >= yPauzaStart && y <= yPauzaEnd)) {
            videoArea.pause();
        }
        let xBarStart = 10;
        let xBarEnd = 775;
        let yBarStart = H - 15;
        let yBarEnd = yBarStart - 10;
        //Calcul coeficient pixeli, impartit la ox mouse = timp selectat pe progress bar
        if ((x >= xBarStart && x <= xBarEnd) && (y >= yBarEnd && y <= yBarStart)) {
            let coeficientPx = (xBarEnd / videoArea.duration);
            let durataCurenta = x / coeficientPx;
            videoArea.currentTime = durataCurenta;
            console.log(durataCurenta);
        }

        let xNextStart = W - 30;
        let xNextEnd = W - 15;
        let yNextStart = 18;
        let yNextEnd = 35;

        if ((x >= xNextStart && x <= xNextEnd) && (y >= yNextStart && y <= yNextEnd)) {
            let nextVideo = returnVideoUrmatorid(videoItems, videoArea);
            if (nextVideo != null)
                videoArea.src = nextVideo;
        }

        let xPrevStart = 15;
        let xPrevEnd = 30;
        let yPrevStart = yNextStart;
        let yPrevEnd = yNextEnd;

        if ((x >= xPrevStart && x <= xPrevEnd) && (y >= yPrevStart && y <= yPrevEnd)) {
            let prevVideo = returnVideoPrecedent(videoItems, videoArea);
            if (prevVideo != null)
                videoArea.src = prevVideo;
        }
        let xVolStart = W - 27;
        let xVolEnd = W - 16;
        let yVolStart = H - 135;
        let yVolEnd = H - 38;
    
        if ((x >= xVolStart && x <= xVolEnd) && (y >= yVolStart && y <= yVolEnd)) {
            
            vidVolum = y;
            if (y <= yVolEnd + 5 && y >= yVolEnd)
                videoArea.volume = 0;
            else {
                let coefVolum = (y - (H - 135));
                let volum = 100;
                let volumCurent = (volum - coefVolum) / 100;
                videoArea.volume = volumCurent;
            }
            
        }

    }
    canvas.addEventListener('click', (e) => {
        funcVideo(canvas, e);  
    })
     //Navigare playlist next
     document.getElementById('buton-next').addEventListener('click', (e) => {
        e.preventDefault();
        if (tranzCount == videoItems.length)
            console.log("Max length")
        else {
            pasNav -= 200;
            playlist.style.marginLeft = pasNav + "px";
            tranzCount++;
        }
        console.log(videoItems.length, tranzCount);
        console.log("Items ", videoItems);
       
    })
    //Navigare playlist inapoi
    document.getElementById('buton-prev').addEventListener('click', (e) => {
        e.preventDefault();
        console.log(pasNav)
        if (pasNav < 50) {
            pasNav += 200;
            playlist.style.marginLeft = pasNav + "px";
            tranzCount--;
        }

    })

    let reviewVideo = document.getElementById('review-video');
    let rect = canvas.getBoundingClientRect();
      let xBarStart = 10;
        let xBarEnd = 775;
        let yBarStart = H - 15;
    let yBarEnd = yBarStart - 10;
}


