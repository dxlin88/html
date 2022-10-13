// let rootUrl = 'http://wareroom.cpolar.cn/files/home/mmcblk1p1/MP3/';
// let player = document.getElementById('player');
// let isPlaying = true;
// let songs = ['别怕我的心.MP3','女人花.MP3','雨蝶.mp3','牧人.MP3','千年等一回.MP3'];
// let i = 0;
// console.log(rootUrl) 
// player.src= rootUrl + songs[i];
player.addEventListener('ended', function () {  
    i++
    player.src = rootUrl + songs[i]//换地址
    player.play()
}, false);
function shuffle() {
    let i = songs.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [songs[j],songs[i]] = [songs[i], songs[j]];
    }
    console.log(songs);
}
function nextMusic(){
    if (++i>songs.length-1) {
        i=0
    }
    let song = songs[i]
    player.src = rootUrl + song
    player.play()
    console.log('正在播放第'+(i+1)+'首');
}
function lastMusic(){
    let song 
    i>0?--i:i=songs.length-1
    player.src = rootUrl + songs[i]
    player.play()
    console.log('正在播放第'+(i+1)+'首');
}
function shufflePlay(){
    shuffle()
    if(i!=0)
        i = 0
    player.src = rootUrl + songs[i]
    player.play()
}
function playMusic(ctrl){
    if(!player.paused){                 
        player.pause();
        ctrl.innerText = '播放'
    }else{
        player.play(); 
        ctrl.innerText = '暂停'
    }
}