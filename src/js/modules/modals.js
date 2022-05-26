const modals = () => {
  let isBtnPressed = false
  const scrollLineWidth = calcScrollLine()

  function bindModal(triggerSelector, modalSelector, closeSelector, overlayClickClose = true, destroy = false) {
    const triggers = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(modalSelector)
    const close = document.querySelector(closeSelector)
    const windows = document.querySelectorAll('[data-modal]')

    triggers.forEach(trigger => {
      trigger.addEventListener('click', function (e) {

        if (e.target) {
          e.preventDefault()
        }

        isBtnPressed = true

        if (destroy) {
          trigger.remove()
        }

        windows.forEach(window => {
          window.style.display = 'none'
          window.classList.add('animated', 'fadeIn')
        })


        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        document.body.style.marginRight = scrollLineWidth + 'px'

      })
    })

    modal.addEventListener('click', (e) => {
      if (e.target === modal && overlayClickClose) {

        windows.forEach(window => {
          window.style.display = 'none'
        })

        modal.style.display = 'none'
        document.body.style.overflow = 'auto'

        document.body.style.marginRight = 0 + 'px'
      }
    })

    close.addEventListener('click', () => {
      windows.forEach(window => {
        window.style.display = 'none'
      })

      modal.style.display = 'none'
      document.body.style.overflow = 'auto'
      document.body.style.marginRight = 0 + 'px'
    })

  }

  function calcScrollLine() {
    let div = document.createElement('div')
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.overflowY = 'scroll'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)
    let scrollLineWidth = div.offsetWidth - div.clientWidth
    div.remove()
    return scrollLineWidth
  }

  function showPopupByTime(modalSelector, ms) {
    const modal = document.querySelector(modalSelector)
    const windows = document.querySelectorAll('[data-modal]')

    setTimeout(() => {
      let isOpen = false
      windows.forEach(w => {

        if (getComputedStyle(w).display === 'block') {
          // or if (w.style.display === 'block') {
          isOpen = true
        }
      })

      if (!isOpen) {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        const scrollLineWidth = calcScrollLine()
        document.body.style.marginRight = scrollLineWidth + 'px'
      }

    }, ms);
  }

  function openByScrollAtBottom(triggerSelector) {
    const trigger = document.querySelector(triggerSelector)
    window.addEventListener('scroll', () => {

      let scrolledAndCurrContent = window.scrollY + document.documentElement.clientHeight
      // window.scrollY - сколько пкс юзер отлистал сверху
      // document.documentElement.clientHeight - контент кот виден юзеру

      let fullPageHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) // для совместимости
      // document.documentElement.scrollHeight - полная высота страницы

      if (!isBtnPressed && (scrolledAndCurrContent >= fullPageHeight)) {
        trigger.click()
      }

    })
  }


  bindModal('.button-design', '.popup-design', '.popup-design .popup-close', true, true)

  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true, true)

  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close')

  openByScrollAtBottom('.fixed-gift')


  // showPopupByTime('.popup-consultation', 2000)
}
export default modals