const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    burger.classList.toggle('active');
});
