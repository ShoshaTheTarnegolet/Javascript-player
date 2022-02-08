/* buttons */
const play = document.getElementById('play');
const back = document.querySelector('.backward');
const next = document.querySelector('.forward');

/* divs */
const img = document.querySelector('.image');
const artist = document.querySelector('.artist');
const track = document.querySelector('.track');

/* progress */
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progressLine');

/* time */
const currentT = document.querySelector('.current');
const totalT = document.querySelector('.total');

let song = document.createElement('audio');
const trackList = [
  {
    name: "Let's Call the Whole Thing Off",
    artist: 'Ella Fitzgerald And Louis Armstrong',
    image: './img/Armstrong-Fitzgerald.jpg',
    path: "./songs/Louis Armstrong, Ella Fitzgerald- Let's Call the Whole Thing Off.mp3",
  },
  {
    name: 'The Reservoir',
    artist: 'Four Tet',
    image: './img/FourTet.jpg',
    path: './songs/Four Tet - The Reservoir.mp3',
  },
  {
    name: 'Baby',
    artist: 'DakhaBrakha',
    image: './img/DakhaBrakha.jpg',
    path: './songs/DakhaBrakha-baby.mp3',
  },
];

let i = 0;
let timer;
/* load song */
function load(i) {
  // Load a new track
  song.src = trackList[i].path;
  song.load();

  // Update details of the track
  img.style.backgroundImage = 'url(' + trackList[i].image + ')';
  artist.innerText = trackList[i].artist;
  track.innerText = trackList[i].name;

  timer = setInterval(timeUpdate, 500);
}

let isPlaying = false;
const playSong = () => {
  if (!isPlaying) {
    song.play();
    play.src = 'https://img.icons8.com/ios-filled/60/000000/circled-pause.png';
    isPlaying = true;
  } else {
    song.pause();
    play.src = 'https://img.icons8.com/external-flatart-icons-solid-flatarticons/80/000000/external-play-button-arrow-flatart-icons-solid-flatarticons-1.png';
    isPlaying = false;
  }

}
/* next song */
const nextSong = () => {
  // if it's a last song
  if (i < trackList.length - 1) {
    i += 1;
  } else {
    i = 0;
  }
  load(i);
  progressBar.style.flexBasis = 0;
};

/* previous song */
const prevSong = () => {
  if (i > 0) {
    i -= 1;
  } else {
    i = trackList.length - 1;
  }
  load(i);
  progressBar.style.flexBasis = 0;
};

/* progress and time*/
const progressUpdate = () => {
  const time = (song.currentTime / song.duration) * 100;
  progressBar.style.flexBasis = `${time}%`;

  // if it's end of the song, play next.
  if (time === 100) {
    nextSong();
  }
};
song.addEventListener('timeupdate', progressUpdate);

function progressMove(e) {
  const time = (e.offsetX / progress.offsetWidth) * song.duration;
  song.currentTime = time;
}

const timeUpdate = () => {
  if (!isNaN(song.duration)) {
    let totalM = Math.floor(song.duration / 60);
    let totalS = Math.floor(song.duration - totalM * 60);
    let currentM = Math.floor(song.currentTime / 60);
    let currentS = Math.floor(song.currentTime - currentM * 60);

    if (currentS < 10) {
      currentS = '0' + currentS;
    }
    if (totalS < 10) {
      totalS = '0' + totalS;
    }

    totalT.innerHTML = `${totalM}:${totalS}`;
    currentT.innerHTML = `${currentM}:${currentS}`;
  }
};

/* play button event */
play.addEventListener('click', () => {
  playSong();

});

/* backward button event */
back.addEventListener('click', () => {
  prevSong();
  isPlaying = false;
  play.src = 'https://img.icons8.com/external-flatart-icons-solid-flatarticons/80/000000/external-play-button-arrow-flatart-icons-solid-flatarticons-1.png';
});

/* forward button event */
next.addEventListener('click', () => {
  isPlaying = false;
  nextSong();
  play.src = 'https://img.icons8.com/external-flatart-icons-solid-flatarticons/80/000000/external-play-button-arrow-flatart-icons-solid-flatarticons-1.png';

});

/* slider event */
let mousedown = false;
progress.addEventListener('click', progressMove);
progress.addEventListener('mousemove', (e) => mousedown && progressMove(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

load(i);
