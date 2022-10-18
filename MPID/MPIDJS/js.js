{
    let music = document.getElementById("music");
    let playBtn = document.getElementById("playBtn");
    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");
    let img = document.getElementById("img");
    let sName = document.getElementById("sName");
    let singer = document.getElementById("singer");
    let tTime = document.getElementById("tTime");
    let proBar = document.getElementById("proBar");
    let cTime = document.getElementById("cTime");
    let songPro = document.getElementById("songPro");
    let vol = document.getElementById("vol");
    let volCol = document.getElementById("volCol");
    let volB = document.getElementById("volB");
    let volText = document.getElementById("volText");
    
    let songs = [{
    mp3: "mp3/1.mp3",
    singer: "赵薇",
    name: "不能和你分手",
    img: "img/1.jpg"
    }, {
    mp3: "music/04.mp3",
    singer: "陈粒",
    name: "易燃易爆炸",
    img: "images/2.jpg"
    }, {
    mp3: "music/06.mp3",
    singer: "胡夏/谭维维",
    name: "知否知否",
    img: "images/3.jpg"
    }];
    
    let changeMusic = function(index) {
    music.src = songs[index].mp3;
    img.src = songs[index].img;
    sName.innerHTML = songs[index].name;
    singer.innerHTML = songs[index].singer;
    proBar.style.width = 0;
    };
    
    let index = 0;
    changeMusic(index);
    
    playBtn.addEventListener("click", function(event) {
    if (music.paused) {
    music.play();
    event.currentTarget.innerHTML = '<img src="img/prev.png" alt=""/>';
    } else {
    music.pause();
    event.currentTarget.innerHTML = '<img src="img/next.png" alt=""/>';
    }
    });
    
    prevBtn.addEventListener("click", function(event) { //上一首
    index--;
    if (index <= -1) {
    index = songs.length - 1;
    }
    changeMusic(index);
    });
    
    nextBtn.addEventListener("click", function(event) { //下一首
    index++;
    if (index > songs.length - 1) {
    index = 0;
    }
    changeMusic(index);
    });
     
    music.addEventListener('ended',function () { //自动播放下一首
    index++;
    if (index > songs.length - 1) {
    index = 0;
    }
    changeMusic(index);
    })
    
    music.addEventListener("loadedmetadata", function(event) { //提示音频的元数据已加载
    tTime.innerHTML = parseInt(music.duration / 60) + ":" + parseInt(music.duration % 60);
    });
    
    music.addEventListener("timeupdate", function(event) { //监听音乐事实播放事件
    let jd = music.currentTime / music.duration; //music.duration总时长 music.currentTime 当前时长
    let bfb = jd * 100 + "%";
    proBar.style.width = bfb;
    if (music.currentTime < 10) {
    cTime.innerHTML = "0:0" + Math.floor(music.currentTime); //Math.floor()向下取整
    } else if (music.currentTime < 60) {
    cTime.innerHTML = "0:" + Math.floor(music.currentTime);
    } else {
    let minet = parseInt(music.currentTime / 60); //parseInt()解析一个字符串，并返回一个整数
    let sec = music.currentTime - minet * 60;
    if (sec < 10) {
    cTime.innerHTML = "0" + minet + ":" + "0" + parseInt(sec);
    } else {
    cTime.innerHTML = "0" + minet + ":" + parseInt(sec);
    }
    }
    });
    
    songPro.addEventListener("click", function(event) {
    let x = event.offsetX;
    let bfb = x / 610 * 100;
    proBar.style.width = bfb + "%";
    music.currentTime = music.duration * bfb / 100;
    });
    
    let getBfb = function(event) {
    let x = event.clientX; //返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。
    let volX = vol.getBoundingClientRect().x;  //getBoundingClientRect()获取元素的宽高位置
    let disX = x - volX;
    disX = Math.max(0, disX); //返回最大数字
    disX = Math.min(120, disX); //返回最小数字
    return disX / 120;
    };
    
    let setVol = function(event) {
    let bfb = Math.floor(getBfb(event) * 10000) / 100;
    volCol.style.width = bfb + "%";
    volB.style.left = bfb + "%";
    volText.innerHTML = Math.floor(bfb) + "%";
    music.volume = bfb / 100;
    };
    
    vol.addEventListener("mousedown", function() {
    document.addEventListener("mousemove", setVol);
    });
    document.addEventListener("mouseup", function() {
    document.removeEventListener("mousemove", setVol);
    
    });
   }