document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const y = new Date().getFullYear() - 1;
  document.querySelectorAll(".prev-year").forEach(el => el.textContent = y);