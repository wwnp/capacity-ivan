const showMoreStyles = (triggerSelector) => {
  const trigger = document.querySelector(triggerSelector)
  const pictures = document.querySelectorAll('.styles-2')

  pictures.forEach(i => {
    i.classList.add('animated', 'fadeInUp')
  })

  trigger.addEventListener('click', (e) => {
    e.preventDefault()
    trigger.classList.add('animated', 'fadeOutUp')

    setTimeout(() => {
      trigger.remove()
    }, 600)

    pictures.forEach(i => {
      i.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs')
      i.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1')
    })
  })
}
export default showMoreStyles