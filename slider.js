let currentSlide = 0;

function changeSlide(direction) {
  const slider = document.querySelector('.slider');
  const totalSlides = document.querySelectorAll('.slide').length;

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  updateNavigationButtons(totalSlides);
}

function updateNavigationButtons(totalSlides) {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const finalButton = document.getElementById('finalButton');
  const homeButton = document.getElementById('homeButton');

  
  if (currentSlide === 0) {
    prevBtn.style.display = 'none';
    homeButton.style.display = 'block';
  } else {
    prevBtn.style.display = 'block';
    homeButton.style.display = 'none'; 
  }

  
  if (currentSlide === totalSlides - 1) {
    nextBtn.style.display = 'none';
    finalButton.style.display = 'block';
  } else {
    nextBtn.style.display = 'block';
    finalButton.style.display = 'none';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const totalSlides = document.querySelectorAll('.slide').length;
  updateNavigationButtons(totalSlides);
});