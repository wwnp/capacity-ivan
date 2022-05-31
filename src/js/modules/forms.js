const forms = () => {
  const forms = document.querySelectorAll('form')
  const inputs = document.querySelectorAll('input')
  const upload = document.querySelectorAll('[name="upload"]')

  const msg = {
    loading: 'Загрузка...',
    success: 'Thanks',
    failure: 'Error',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
  }

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php',
  }

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: 'POST',
      body: data
    })
    return await res.text()
  }

  const clearInputs = () => {
    inputs.forEach(input => {
      input.value = ''
    })
    upload.forEach(item => {
      item.previousElementSibling.textContent = 'Файл не выбран'
    })
  }

  upload.forEach(item => {
    item.addEventListener('input', () => {
      let dots
      item.files[0].name.split('.')[0].length > 5
        ? dots = '...'
        : dots = '.'
      const array = item.files[0].name.split('.')
      console.log(array)
      const name = array[0].substring(0, 6) + dots + array[1]

      item.previousElementSibling.textContent = name
    })
  })

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      let statusMsg = document.createElement('div')
      statusMsg.classList.add('status')
      form.parentNode.appendChild(statusMsg)

      form.classList.add('animated', 'fadeOutUp')
      setTimeout(function () {
        form.style.display = 'none'
      }, 400)

      let statusImg = document.createElement('img')
      statusImg.setAttribute('src', msg.spinner)
      statusImg.classList.add('animated', 'fadeInUp')
      statusMsg.appendChild(statusImg)

      let statusText = document.createElement('div')
      statusText.textContent = msg.loading
      statusText.classList.add('animated', 'fadeInUp')
      statusMsg.appendChild(statusText)

      const formData = new FormData(form)

      let api
      form.closest('.popup-design') || form.classList.contains('calc_form')
        ? api = path.designer
        : api = path.question

      postData(api, formData)
        .then(res => {
          console.log(res)
          statusImg.setAttribute('src', msg.ok)
          statusText.textContent = msg.success
        })
        .catch(() => {
          statusImg.setAttribute('src', msg.fail)
          statusMsg.textContent = msg.failure
        })
        .finally(() => {
          clearInputs()
          setTimeout(() => {
            statusMsg.remove()
            form.style.display = 'block'
            form.classList.remove('fadeOutUp')
            form.classList.add('fadeInUp')
          }, 5000)
        })
    })
  })

  console.log(document.body.scrollHeight)

}

export default forms