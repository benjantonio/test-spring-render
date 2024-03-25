window.addEventListener("scroll", function(){
    var header = document.querySelector(".menuContent");
    header.classList.toggle('down', window.scrollY > 0);

  });

  //javascript for responsive navigation sidebar menu
  var menu = document.querySelector('.menu');
  var menuBtn = document.querySelector('.btn-abrir-menu');
  var closeBtn = document.querySelector('.close-btn');

  menuBtn.addEventListener("click", () => {
    menu.classList.add('active');
  });
  closeBtn.addEventListener("click", () => {
    menu.classList.remove('active');
  });

  