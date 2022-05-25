const sliders = (slides, dir, prev, next) => {
  let slideIndex = 1
  const items = document.querySelectorAll(slides)

  function showSlides(n) {
    console.log(slideIndex)
    debugger
    if (n > items.length) {
      console.log(123)
      slideIndex = 1
    } // крайние значения
    if (n < 1) {
      console.log(456)
      slideIndex = items.length
    } // крайние значения

    items.forEach(i => {
      i.classList.add('animated', 'fadeIn')
      i.style.display = 'none'
    })

    items[slideIndex - 1].style.display = 'block'
  }

  function plusSlides(n) {

    showSlides(slideIndex += n)
  }

  try {
    const prevBtn = document.querySelector(prev)
    const nextBtn = document.querySelector(next)

    prevBtn.addEventListener('click', () => {
      debugger
      plusSlides(-1)
      items[slideIndex - 1].classList.remove('slideInRight')
      items[slideIndex - 1].classList.add('slideInLeft')
    })
    nextBtn.addEventListener('click', () => {
      plusSlides(1)
      items[slideIndex - 1].classList.remove('slideInLeft')
      items[slideIndex - 1].classList.add('slideInRight')
    })
  } catch (error) {

  }

  showSlides(slideIndex)
}
export default sliders