function scrollLock() {
    var h = window.innerHeight + (window.innerHeight / 100);
    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var element = document.querySelector('#wrap');
    var arrow = document.getElementsByClassName('arrow');
    if (scrollTop > h) {
        element.classList.add('fixed');
        arrow[0].style.display = "none";
    } else {
        element.classList.remove('fixed');
        arrow[0].style.display = "block";
    }
    var children = document.getElementById("wrap").children;
    for (let i = 0; i < children.length; i++) {
        if (scrollTop + 10 > ((i - 0.5) * h) && scrollTop + 10 < ((i + .5) * h)) {
            children[i].style.backgroundColor = "rgb(0, 165, 157)";
        } else {
            children[i].style.backgroundColor = "rgb(0, 0, 0)";
        }
    }
}