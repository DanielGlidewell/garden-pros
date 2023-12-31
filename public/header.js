document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  const $navbarLinks = Array.prototype.slice.call(document.querySelectorAll('.gk-navbar-link'), 0);
  // Add a click event on the navbar burger element
  $navbarBurgers.forEach(el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });

  // Add a click event on each of the gk-navbar-link elements
  // This is to close the navbar when a link is clicked
  $navbarLinks.forEach(el => {
    el.addEventListener('click', () => {
      $navbarBurgers.forEach(burger => {
        const target = burger.dataset.target;
        const $target = document.getElementById(target);
        burger.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  })
});