const DEV_MODE = false;
const birthday = new Date("July 11, 2026 12:00:00").getTime();

const landingPage = document.getElementById("landingPage");
const celebrationPage = document.getElementById("celebrationPage");
const memorySection = document.getElementById("memorySection");
const waitButton = document.getElementById("waitButton");
const stageText = document.getElementById("stageText");
const decorations = document.getElementById("decorations");
const cakeStage = document.getElementById("cakeStage");
const candles = document.getElementById("candles");
const letterScene = document.getElementById("letterScene");
const letterText = document.getElementById("letterText");
const candleButtons = Array.from(document.querySelectorAll(".candle"));
const startButton = document.getElementById("startButton");
const storyButton = document.getElementById("storyButton");
const announcement = document.getElementById("announcement");
const announceText = document.getElementById("announceText");

const lines = [
  "Hi Meri Jaan 🌸",
  "I made a tiny little world just for you...",
  "Filled with love, surprises and a few sweet little secrets 💛",
  "But princesses aren't allowed to peek too early 😤",
  "So let us wait together and sparkle ❤️"
];

const elements = [
  document.getElementById("line1"),
  document.getElementById("line2"),
  document.getElementById("line3"),
  document.getElementById("line4"),
  document.getElementById("line5")
];

// Shared reasons data used for scattered buttons and the reasons modal
const reasonsData = [
  'Your smile brightens my day.', 'Your kindness inspires me.', 'You listen without judgement.', 'You make me laugh.', 'You are my safe place.', 'You believe in me.', 'You are thoughtful.', 'You are my partner in crime.', 'You make every day better.', 'You are patient and caring.', 'Your hugs heal me.', 'You push me to grow.', 'You are beautiful inside out.', 'You forgive so easily.', 'You make small moments special.', 'You share my dreams.', 'You are my best friend.', 'You love me truly.'
];

function typeWriter(text, element, speed = 35) {
  if (!element) return;
  let i = 0;
  element.innerHTML = "";
  element.classList.add("show");
  const timer = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

setTimeout(() => typeWriter(lines[0], elements[0]), 500);
setTimeout(() => typeWriter(lines[1], elements[1]), 2500);
setTimeout(() => typeWriter(lines[2], elements[2]), 5500);
setTimeout(() => typeWriter(lines[3], elements[3]), 9000);
setTimeout(() => typeWriter(lines[4], elements[4]), 12000);

function updateCountdown() {
  const now = new Date().getTime();
  const diff = birthday - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    if (!DEV_MODE) startBirthday();
    return;
  }

  document.getElementById("days").textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  document.getElementById("minutes").textContent = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  document.getElementById("seconds").textContent = Math.floor((diff % (1000 * 60)) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);

function createHeart() {
  const heartContainer = document.getElementById("hearts");
  if (!heartContainer) return;
  const heart = document.createElement("div");
  heart.className = "sparkle";
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = Math.random() * 100 + "vh";
  heart.style.fontSize = (18 + Math.random() * 20) + "px";
  heartContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 1200);
}

setInterval(createHeart, 280);

function startBirthday() {
  // Hide landing card and show a large full-screen announcement
  landingPage.classList.add("hidden");
  if (announcement) {
    announcement.classList.remove("hidden");
    createConfetti(80);
    // play background audio if available (muted state respected)
    const bgAudio = document.getElementById('bgAudio');
    if (bgAudio){ try{ bgAudio.currentTime = 0; bgAudio.play().catch(()=>{}); }catch(e){} }
    // After announcement, reveal celebration and show the cake
    setTimeout(() => {
      if (announcement) announcement.classList.add("hidden");
      celebrationPage.classList.remove("hidden");
      if (cakeStage) cakeStage.classList.remove("hidden");
      // small extra confetti
      createConfetti(30);
    }, 3000);
  } else {
    celebrationPage.classList.remove("hidden");
  }
}

let storyStep = 0;
let blownCandles = 0;

function advanceStory() {
  if (storyStep === 0) {
    if (decorations) decorations.classList.remove("hidden");
    if (stageText) stageText.textContent = "";
  } else if (storyStep === 1) {
    if (cakeStage) cakeStage.classList.remove("hidden");
    // animate cake entrance
    const bigCake = cakeStage ? cakeStage.querySelector('.big-cake') : null;
    if (bigCake) setTimeout(()=> bigCake.classList.add('show'), 60);
    if (stageText) stageText.textContent = "";
  } else if (storyStep === 2) {
    // reveal candles that sit on the cake
    const cakeCandles = cakeStage ? cakeStage.querySelector('.candles-row') : null;
    if (cakeCandles) cakeCandles.classList.add('visible');
    if (stageText) stageText.textContent = "";
    if (startButton) startButton.classList.add("hidden");
  }
  storyStep++;
}

function createConfetti(count = 30){
  const emoji = ["🎉","✨","🎊","💖","🎈"];
  for(let i=0;i<count;i++){
    const c = document.createElement('div');
    c.className = 'confetti';
    c.textContent = emoji[Math.floor(Math.random()*emoji.length)];
    c.style.left = Math.random()*100 + 'vw';
    c.style.top = (-5 - Math.random()*10) + 'vh';
    c.style.fontSize = (12 + Math.random()*28) + 'px';
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    setTimeout(()=> c.remove(), 3000 + Math.random()*1000);
  }
}

function createSparkle(x, y) {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.innerHTML = "✨";
  sparkle.style.left = x + "px";
  sparkle.style.top = y + "px";
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 900);
}

function revealLetter() {
  letterScene.classList.remove("hidden");
  // show the letter, then reveal a stylish post-cake menu (buttons)
  if (stageText) stageText.textContent = "And now, your little love letter 💌";
  const message = "Riddhi, you are my favourite kind of magic. You make the world softer, sweeter and brighter just by being in it. I hope this birthday feels as beautiful as you are, and I hope you always remember how deeply and endlessly you are loved. Happy birthday, meri jaan. ❤️";
  typeWriter(message, letterText, 24);
  // after the letter types, remove the cake and scatter interactive buttons
  setTimeout(()=>{
    showScatteredMenu();
  }, 1500 + Math.min(2000, message.length * 12));
}

function showScatteredMenu(){
  // hide the cake
  if (cakeStage) cakeStage.classList.add('hidden');
  const postMenu = document.getElementById('postMenu'); if (postMenu) postMenu.classList.add('hidden');

  // create container
  let container = document.getElementById('scatteredContainer');
  if (container) container.remove();
  container = document.createElement('div'); container.id = 'scatteredContainer'; document.body.appendChild(container);

  // items: 18 reasons + photos + flips + envelope
  const items = [];
  reasonsData.forEach((r,i)=> items.push({ type:'reason', text:r, id:'reason-'+(i+1)}));
  items.push({ type:'photos', text:'Our Photos', id:'photos' });
  items.push({ type:'flips', text:'Flip Messages', id:'flips' });
  items.push({ type:'envelope', text:'A Letter', id:'envelope' });

  const vw = window.innerWidth, vh = window.innerHeight;
  items.forEach((it, idx)=>{
    const btn = document.createElement('button');
    btn.className = 'scatter-btn';
    btn.id = 'scatter-'+it.id;
    btn.textContent = it.type === 'reason' ? (idx+1) : (it.text);
    // random position avoiding edges
    const x = 10 + Math.random()*80; const y = 15 + Math.random()*70;
    btn.style.left = x + 'vw'; btn.style.top = y + 'vh';
    document.body.appendChild(btn);

    if (it.type === 'reason'){
      btn.addEventListener('click', (e)=>{
        showReasonPopup(it.text, e.clientX, e.clientY);
      });
    } else if (it.type === 'photos'){
      btn.addEventListener('click', ()=> document.getElementById('photosModal').classList.remove('hidden'));
    } else if (it.type === 'flips'){
      btn.addEventListener('click', ()=> document.getElementById('flipsModal').classList.remove('hidden'));
    } else if (it.type === 'envelope'){
      btn.addEventListener('click', ()=> document.getElementById('envelopeModal').classList.remove('hidden'));
    }
  });

  // reveal the End button now that scattered items exist
  const endBtn = document.getElementById('endBtn');
  if (endBtn) endBtn.classList.remove('hidden');
}

function showReasonPopup(text,x,y){
  const popup = document.createElement('div'); popup.className='reason-popup'; popup.textContent = text;
  document.body.appendChild(popup);
  // position, keep inside viewport
  const pad = 12; const w = popup.offsetWidth; const h = popup.offsetHeight;
  let left = x + 8; let top = y - 8;
  if (left + w > window.innerWidth - pad) left = window.innerWidth - w - pad;
  if (top + h > window.innerHeight - pad) top = window.innerHeight - h - pad;
  if (top < pad) top = pad;
  popup.style.left = left + 'px'; popup.style.top = top + 'px';
  setTimeout(()=> popup.remove(), 5000);
}

// The wait button is intentionally disabled so the celebration only
// becomes available when the countdown reaches the target date.

if (storyButton){
  storyButton.addEventListener("click", () => {
    if (storyStep === 0 || storyStep === 1 || storyStep === 2) {
      advanceStory();
    }
  });
}

candleButtons.forEach((candle) => {
  candle.addEventListener("click", () => {
    if (candle.classList.contains('blown')) return;
    // extinguish flame
    candle.classList.add("blown");
    candle.classList.add('smoke');
    candle.disabled = true;
    blownCandles++;
    createSparkle(window.innerWidth * 0.5, 220);
    // remove smoke after animation
    setTimeout(()=> candle.classList.remove('smoke'), 1600);
    if (blownCandles === candleButtons.length) {
      setTimeout(()=> revealLetter(), 900);
    }
  });
});

// Wire the big start button to advance the story with confetti/cues
if (startButton){
  startButton.addEventListener('click', ()=>{
    advanceStory();
    if (storyStep === 1){ // after first click
      createConfetti(40);
      startButton.textContent = '🎂 Reveal the cake';
    } else if (storyStep === 2){
      startButton.textContent = '🕯️ Light the candles';
    } else if (storyStep === 3){
      startButton.classList.add('hidden');
    }
  });
}

// Expose helpers for quick testing from DevTools console
// e.g. `startBirthday()` or `advanceStory()`
window.startBirthday = startBirthday;
window.advanceStory = advanceStory;
window.revealLetter = revealLetter;

// Temporary preview button wiring (for development/testing)
document.addEventListener('DOMContentLoaded', ()=>{
  const previewBtn = document.getElementById('previewBtn');
  if (previewBtn){
    previewBtn.addEventListener('click', ()=>{
      startBirthday();
    });
  }
  // wire audio controls
  const bgAudio = document.getElementById('bgAudio');
  const muteBtn = document.getElementById('muteBtn');
  const micBtn = document.getElementById('micBtn');
  if (muteBtn && bgAudio){
    // try autoplay on announcement; mute default
    bgAudio.muted = true;
    muteBtn.addEventListener('click', ()=>{
      bgAudio.muted = !bgAudio.muted;
      muteBtn.textContent = bgAudio.muted ? '🔈' : '🔊';
    });
  }

  // mic blow-to-wish
  if (micBtn){
    let listening = false;
    let audioContext, analyser, source, dataArray;
    micBtn.addEventListener('click', async ()=>{
      if (listening){
        micBtn.textContent = '🎤 Blow to wish';
        listening = false;
        if (audioContext) audioContext.close();
        return;
      }
      try{
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        dataArray = new Uint8Array(analyser.fftSize);
        listening = true;
        micBtn.textContent = 'Listening... Blow! 🎤';
        // monitor volume
        const check = ()=>{
          if (!listening) return;
          analyser.getByteTimeDomainData(dataArray);
          // compute RMS
          let sum=0; for(let i=0;i<dataArray.length;i++){ const v=(dataArray[i]-128)/128; sum+=v*v; }
          const rms = Math.sqrt(sum/dataArray.length);
          if (rms > 0.14){
            // strong blow detected
            blowAllCandles();
            listening = false;
            micBtn.textContent = '🎤 Blow to wish';
            audioContext.close();
            return;
          }
          requestAnimationFrame(check);
        };
        check();
      }catch(e){
        console.warn('Microphone access denied or not available', e);
        micBtn.textContent = 'Mic unavailable';
        setTimeout(()=> micBtn.textContent='🎤 Blow to wish',2000);
      }
    });
  }
});
// Fallback: if DOM already ready and preview button exists, wire it now
const _previewBtn = document.getElementById('previewBtn');
if (_previewBtn){ _previewBtn.addEventListener('click', ()=> startBirthday()); }

// Confetti physics canvas
const confettiCanvas = document.getElementById('confettiCanvas');
let confettiCtx, confettiPieces = [], confettiRunning = false;
if (confettiCanvas){
  confettiCtx = confettiCanvas.getContext('2d');
  const resize = ()=>{ confettiCanvas.width = window.innerWidth; confettiCanvas.height = window.innerHeight; };
  resize(); window.addEventListener('resize', resize);

  function spawnConfetti(count=80){
    const colors = ['#ff6ea3','#ffd36a','#ff9fc2','#ffd1e6','#ffe6ef'];
    for(let i=0;i<count;i++){
      confettiPieces.push({ x: Math.random()*confettiCanvas.width, y: -20 - Math.random()*200, vx: (Math.random()-0.5)*6, vy: 2+Math.random()*4, r: 6+Math.random()*8, color: colors[Math.floor(Math.random()*colors.length)], rot: Math.random()*360, vr: (Math.random()-0.5)*10 });
    }
    if (!confettiRunning) runConfetti();
  }

  function runConfetti(){
    confettiRunning = true;
    const tick = ()=>{
      confettiCtx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
      for(let i=confettiPieces.length-1;i>=0;i--){
        const p = confettiPieces[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.rot += p.vr*0.2;
        confettiCtx.save(); confettiCtx.translate(p.x,p.y); confettiCtx.rotate(p.rot*Math.PI/180);
        confettiCtx.fillStyle = p.color; confettiCtx.fillRect(-p.r/2, -p.r/2, p.r, p.r*0.6);
        confettiCtx.restore();
        if (p.y > confettiCanvas.height + 50) confettiPieces.splice(i,1);
      }
      if (confettiPieces.length>0) requestAnimationFrame(tick); else confettiRunning=false;
    };
    requestAnimationFrame(tick);
  }

  // expose to existing createConfetti function
  const originalCreateConfetti = window.createConfetti || function(){};
  window.createConfetti = function(count){ originalCreateConfetti(count); spawnConfetti(count*1.5); };
}

function blowAllCandles(){
  document.querySelectorAll('.candle').forEach(c => { if (!c.classList.contains('blown')) c.click(); });
}

// Ensure listeners are attached reliably after DOM loaded
function initUI(){
  if (window.__listenersAttached) return;
  window.__listenersAttached = true;

  const startBtn = document.getElementById('startButton');
  const storyBtn = document.getElementById('storyButton');
  const preview = document.getElementById('previewBtn');

  if (preview) preview.addEventListener('click', ()=> startBirthday());

  if (startBtn){
    startBtn.addEventListener('click', ()=>{
      advanceStory();
      if (storyStep === 1){ createConfetti(40); startBtn.textContent = '🎂 Reveal the cake'; }
      else if (storyStep === 2){ startBtn.textContent = '🕯️ Light the candles'; }
      else if (storyStep === 3){ startBtn.classList.add('hidden'); }
    });
  }

  // (re)attach candle handlers
  const candlesNow = Array.from(document.querySelectorAll('.candle'));
  candlesNow.forEach((candle)=>{
    candle.addEventListener('click', ()=>{
      if (candle.classList.contains('blown')) return;
      candle.classList.add('blown'); candle.classList.add('smoke'); candle.disabled = true;
      blownCandles++; createSparkle(window.innerWidth * 0.5, 220);
      setTimeout(()=> candle.classList.remove('smoke'), 1600);
      if (blownCandles === candlesNow.length) setTimeout(()=> revealLetter(), 900);
    });
  });

  // Post menu buttons
  const photosBtn = document.getElementById('photosBtn');
  const flipsBtn = document.getElementById('flipsBtn');
  const reasonsBtn = document.getElementById('reasonsBtn');
  if (photosBtn){ photosBtn.addEventListener('click', ()=> document.getElementById('photosModal').classList.remove('hidden')); }
  if (flipsBtn){ flipsBtn.addEventListener('click', ()=> document.getElementById('flipsModal').classList.remove('hidden')); }
  if (reasonsBtn){ reasonsBtn.addEventListener('click', ()=> document.getElementById('reasonsModal').classList.remove('hidden')); }

  // modal close buttons
  ['closePhotos','closeFlips','closeReasons','closeEnvelope'].forEach(id=>{ const el=document.getElementById(id); if(el) el.addEventListener('click', ()=> el.parentElement.parentElement.classList.add('hidden')); });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initUI); else initUI();

// Post-menu wiring
const photosBtn = document.getElementById('photosBtn');
const flipsBtn = document.getElementById('flipsBtn');
const reasonsBtn = document.getElementById('reasonsBtn');
const photosModal = document.getElementById('photosModal');
const flipsModal = document.getElementById('flipsModal');
const reasonsModal = document.getElementById('reasonsModal');

if (photosBtn && photosModal){
  photosBtn.addEventListener('click', ()=> photosModal.classList.remove('hidden'));
  document.getElementById('closePhotos').addEventListener('click', ()=> photosModal.classList.add('hidden'));
}
if (flipsBtn && flipsModal){
  flipsBtn.addEventListener('click', ()=> flipsModal.classList.remove('hidden'));
  document.getElementById('closeFlips').addEventListener('click', ()=> flipsModal.classList.add('hidden'));
}
if (reasonsBtn && reasonsModal){
  reasonsBtn.addEventListener('click', ()=> reasonsModal.classList.remove('hidden'));
  document.getElementById('closeReasons').addEventListener('click', ()=> reasonsModal.classList.add('hidden'));
}
const envelopeModal = document.getElementById('envelopeModal');
const closeEnvelope = document.getElementById('closeEnvelope');
if (envelopeModal && closeEnvelope){ closeEnvelope.addEventListener('click', ()=> envelopeModal.classList.add('hidden')); }

// Flip messages
const flipMessages = [
  "You light up my life.",
  "Your smile is my favourite thing.",
  "Every day with you is a gift.",
  "I love the way you laugh.",
  "You make ordinary moments magical.",
  "I adore your kind heart.",
  "Being with you feels like home.",
  "You inspire me to be better.",
  "I cherish our memories together.",
];
let flipIndex = 0;
const flipCard = document.getElementById('flipCard');
if (flipCard){ flipCard.textContent = "Tap to flip"; flipCard.addEventListener('click', ()=>{ flipCard.classList.add('flipping'); setTimeout(()=>{ flipCard.textContent = flipMessages[flipIndex % flipMessages.length]; flipIndex++; flipCard.classList.remove('flipping'); },300); }); }

// Populate 18 reasons (sample content; you can edit these)
const reasonsList = document.getElementById('reasonsList');
if (reasonsList){
  reasonsData.forEach(r => { const li = document.createElement('li'); li.textContent = r; reasonsList.appendChild(li); });
}