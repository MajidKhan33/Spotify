console.log("Welcome to Spotify")
//Initialize the variable
let songIndex= 0;
// first target is to play the song
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');       //progress bar ko change karne ke leye function
let gif = document.getElementById('gif');
let masterSongName =document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'));        //this fun was to send the name of songs from js to direct to website

// we will make an array jiske ander key value players rahenge jiase ke song name , file path, cover path
let songs = [
    {songName: "Duniya ke ay musafir", filePath: "songs/1.mp3", coverPath: "cover/1.jpg"},
    {songName: "Dil Me Ishq e nabi ke ho aise", filePath: "songs/2.mp3", coverPath: "cover/2.jpeg"},
    {songName: "Lab pe aate hai dua banke", filePath: "songs/3.mp3", coverPath: "cover/3.jpeg"},
    {songName: "Seher ka waqt tha", filePath: "songs/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "Tammana mudatao se hai", filePath: "songs/5.mp3", coverPath: "cover/5.jpg"},
    {songName: "Mai to ummati hun", filePath: "songs/6.mp3", coverPath: "cover/6.jpg"},
    {songName: "Mera dil badal de", filePath: "songs/7.mp3", coverPath: "cover/7.jpg"},
]

//we will write the function so that saare songs the name hame html me manually nhi daalna pade fun se direct website pe aaja
songItems.forEach((element,i) =>{
    element.getElementsByTagName("img")[0].src= songs[i].coverPath;     // this was to change the img in html code without tying it agin
    element.getElementsByClassName("songName")[0].innerText= songs[i].songName;     //Song name

})


// audioElement.play();

//Handle the play pause button
//agar kise ne master pay ko clik kiya to kya honga
masterPlay.addEventListener('click',()=>{
    //agar audio play nhi ho rahe hai to 
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        //now jaise gana play waise he pause button aa jai
        masterPlay.classList.remove('fa-circle-play'); 
        masterPlay.classList.add('fa-circle-pause'); 
        //adding the gif playing
        gif.style.opacity = 1;
    }
    else{
        //audio ko pause karne ke leye code
        audioElement.pause();
        //now jaise gana play waise he pause button aa jai
        masterPlay.classList.remove('fa-circle-pause'); 
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to events---> progress bar pe click karne par time update honga change honga
audioElement.addEventListener('timeupdate',()=>{
    //update seek bar
    //kitne percent change pata chalenga
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value= progress;           //isse jo progress hai bar ke set ho jainge
})

//we will write the code so that agar progress bar ko jaha click karenge waha se song play honga
myProgressBar.addEventListener('change', ()=>{
    //we CT=percentge*duration/100
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

//funn  to play all the buttons in  the song's list
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.target.classList.add('fa-circle-pause');
    element.target.classList.add('fa-circle-play');
    })
}

//song ko agar uske play button pe click karne se play hone ke leye code at the list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{            //button pe click hua to
        makeAllPlays();                                    //this fun will pause and play the button which is in front of songs name
       
        songIndex=parseInt(e.target.id);                        //this is the id assigned to the song so that if we click on the play button it will play
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        //ab click karne ke baad wahe song play hine ke leye
        audioElement.src=`songs/${songIndex+1}.mp3`;
        masterSongName.innerText= songs[songIndex].songName;
        audioElement.currentTime=0;         //bcoz ab next song play honga
        audioElement.play();
        gif.style.opacity = 1;
   
        masterPlay.classList.remove('fa-circle-play'); 
        masterPlay.classList.add('fa-circle-pause');

    })
    })


//previous and next button se song ko put karna hai
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;                //this is for the name change when the song is playing at the bottom 
    audioElement.currentTime=0;         //bcoz ab next song play honga
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play'); 
    masterPlay.classList.add('fa-circle-pause');

   
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText= songs[songIndex].songName;
    audioElement.currentTime=0;         //bcoz ab next song play honga
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play'); 
    masterPlay.classList.add('fa-circle-pause');

   
})