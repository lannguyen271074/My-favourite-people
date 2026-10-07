const intro = document.getElementById('intro');
const site = document.getElementById('site');
const openBtn = document.getElementById('openBtn');
const bgMusic = document.getElementById('bgMusic');
const topBtn = document.getElementById('topBtn');

openBtn.addEventListener('click', async () => {
  intro.classList.add('hide');
  site.classList.remove('hidden');
  document.body.classList.add('music-on');

  // Browsers usually allow audio after the user clicks the opening button.
  try {
    await bgMusic.play();
  } catch (error) {
    console.log('Music could not start automatically:', error);
  }
});

topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    document.querySelectorAll('.person-card').forEach(card => {
      const types = card.dataset.type.split(' ');
      card.style.display = filter === 'all' || types.includes(filter) ? '' : 'none';
    });
  });
});
