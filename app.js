/* buttons */
const play = document.getElementById('play');
const back = document.querySelector('.fa-step-backward');
const next = document.querySelector('.fa-step-forward');

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
/* play */
const playSong = () => {
  song.play();
  play.classList.remove('fa-play');
  play.classList.add('fa-pause');
  isPlaying = true;
};
/* pause */
const pauseSong = () => {
  song.pause();
  play.classList.remove('fa-pause');
  play.classList.add('fa-play');
  isPlaying = false;
};

/* next song */
const nextSong = () => {
  // if it's a last song
  if (i < trackList.length - 1) {
    i += 1;
  } else {
    i = 0;
  }
  load(i);
  playSong();
};

/* previous song */
const prevSong = () => {
  if (i > 0) {
    i -= 1;
  } else {
    i = trackList.length - 1;
  }
  load(i);
  playSong();
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
/* refresh
function refresh() {
    totalT.innerHTML = `00:00`;
    currentT.innerHTML = `00:00`;
}
*/
/* play button event */
play.addEventListener('click', () => {
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

/* backward button event */
back.addEventListener('click', () => {
  prevSong();
});

/* forward button event */
next.addEventListener('click', () => {
  nextSong();
});

/* slider event */
let mousedown = false;
progress.addEventListener('click', progressMove);
progress.addEventListener('mousemove', (e) => mousedown && progressMove(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));



/* var audio = new Audio();
audio.crossOrigin = "anonymous";
audio.src = "./songs/Louis Armstrong, Ella Fitzgerald- Let's Call the Whole Thing Off.mp3";
audio.controls = true;
audio.loop = false;
audio.autoplay = false;
audio.addEventListener("playing", start);
let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
window.addEventListener("load", load(i), false);


function frameLooper() {
  window.requestAnimationFrame(frameLooper);
  fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = '#006600'; // Color of the bars
  bars = 100;
  for (var i = 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    //  fillRect( x, y, width, height ) // Explanation of the parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}

function start() {
  context = new AudioContext(); // AudioContext object instance
  analyser = context.createAnalyser(); // AnalyserNode method
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  // Re-route audio playback into the processing graph of the AudioContext
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper();
  audio.removeEventListener("playing", start);
}
 */

load(i);
