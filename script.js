const intro = document.getElementById('intro');
const site = document.getElementById('site');
const openBtn = document.getElementById('openBtn');
const bgMusic = document.getElementById('bgMusic');
const topBtn = document.getElementById('topBtn');
const musicBtn = document.getElementById('musicBtn');

async function startMusic(){
  if(!bgMusic) return false;
  bgMusic.volume=.45;
  bgMusic.muted=false;
  try{
    await bgMusic.play();
    musicBtn.textContent='🔊';
    musicBtn.setAttribute('aria-label','Tắt nhạc nền');
    musicBtn.title='Tắt nhạc';
    return true;
  }catch(e){
    musicBtn.textContent='🔇';
    musicBtn.setAttribute('aria-label','Bật nhạc nền');
    musicBtn.title='Bật nhạc';
    console.warn('Không thể phát nhạc. Kiểm tra assets/2.0.mp3',e);
    return false;
  }
}

openBtn.addEventListener('click',async()=>{
  await startMusic();
  intro.classList.add('hidden');
  site.classList.remove('hidden');
  window.scrollTo(0,0);
});

musicBtn.addEventListener('click',async()=>{
  if(bgMusic.paused){await startMusic();}
  else{
    bgMusic.pause();
    musicBtn.textContent='🔇';
    musicBtn.setAttribute('aria-label','Bật nhạc nền');
    musicBtn.title='Bật nhạc';
  }
});

topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

document.querySelectorAll('.filter').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(btn=>btn.classList.remove('active'));
    button.classList.add('active');
    const filter=button.dataset.filter;
    document.querySelectorAll('.person-card').forEach(card=>{
      const types=card.dataset.type.split(' ');
      card.style.display=filter==='all'||types.includes(filter)?'':'none';
    });
  });
});

bgMusic?.addEventListener('error',()=>console.warn('Không tìm thấy assets/2.0.mp3'));
