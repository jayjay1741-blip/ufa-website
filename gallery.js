function initGallery(images, opts) {
  opts = opts || {};
  var idx = 0;
  var img = document.getElementById('gallery-img');
  var prevBtn = document.getElementById('gallery-prev');
  var nextBtn = document.getElementById('gallery-next');

  function show(i) {
    idx = (i + images.length) % images.length;
    img.src = images[idx].src;
    img.style.objectPosition = images[idx].pos || 'center';
  }

  prevBtn.addEventListener('click', function () { show(idx - 1); });
  nextBtn.addEventListener('click', function () { show(idx + 1); });

  show(0);
}
