function initGallery(images, opts) {
  opts = opts || {};
  var idx = 0;
  var img = document.getElementById('gallery-img');
  var prevBtn = document.getElementById('gallery-prev');
  var nextBtn = document.getElementById('gallery-next');
  var cache = {};

  // 先読み：表示中の前後の写真をあらかじめ読んでおく（切り替えを速くする）
  function preload(i) {
    var s = images[(i + images.length) % images.length].src;
    if (!cache[s]) { var p = new Image(); p.src = s; cache[s] = p; }
  }

  function show(i) {
    idx = (i + images.length) % images.length;
    img.src = images[idx].src;
    img.style.objectPosition = images[idx].pos || 'center';
    preload(idx + 1); preload(idx + 2); preload(idx - 1);
  }

  prevBtn.addEventListener('click', function () { show(idx - 1); });
  nextBtn.addEventListener('click', function () { show(idx + 1); });

  img.style.cursor = 'pointer';
  img.addEventListener('click', function (e) {
    var rect = img.getBoundingClientRect();
    var x = e.clientX - rect.left;
    if (x < rect.width / 2) { show(idx - 1); } else { show(idx + 1); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  show(0);
  // 最初の表示のあと、残りも順に読んでおく
  setTimeout(function () { for (var k = 0; k < images.length; k++) preload(k); }, 800);
}
