
const badbuttonlmao = document.getElementById('badbuttonlmao');
  badbuttonlmao.addEventListener('click', function() {
    const url = 'https://www.geogebra.org/geometry?lang=en';
    alert("DO SOME MATH MOTHERFUCKER");
    let prettyfunnyifidosaysomyself = setInterval(() => {
      window.open(url, '_blank', 'width=400, height=300');
    }, 100);
    setTimeout(() => {
      clearInterval(prettyfunnyifidosaysomyself);
      prettyfunnyifidosaysomyself = null;
    }, 1000 * 10);
  });
document.addEventListener('keydown', function() {
  if (event.key == 'f') {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen(); // Respectable Browers
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen(); // Safari
    } else if (canvas.msRequestFullscreen) {
      canvas.msRequestFullscreen(); // IE/Edge
    }
  }
});
const sponge = document.getElementById("spunckbob");
