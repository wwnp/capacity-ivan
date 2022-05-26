const forms = () => {
  const form = document.querySelectorAll('form')
  const inputs = document.querySelectorAll('input')

  const msg = {
    loading: 'Загрузка...',
    success: 'Thanks',
    failure: 'Error',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
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
  }

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
      statusImg.setAttribute('src', message.spinner)

      const formData = new FormData(form)

      if (form.getAttribute('data-calc') === 'end') {
        for (let key in state) {
          formData.append(key, state[key])
        }
      }

      postData('assets/server.php', formData)
        .then(res => {
          statusMsg.textContent = msg.success
        })
        .catch(() => statusMsg.textContent = msg.fail)
        .finally(() => {
          clearState(state)
          clearInputs()
          setTimeout(() => {
            statusMsg.remove()
            modalCalcEnd.style.display = 'none'
          }, 5000)
        })
    })
  })

}

export default forms