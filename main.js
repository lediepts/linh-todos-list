window.addEventListener('load', () => {

  const inputText = document.getElementById('input-text')
  const form = document.getElementById('form-add')
  const countAll = document.getElementById('countAll')
  const countComplete = document.getElementById('countComplete')

  const todos = document.getElementById('todos')

  const dataInStorage = localStorage.getItem('todos')
  const list = dataInStorage ? JSON.parse(dataInStorage) : []

  function renderList() {
    localStorage.setItem('todos', JSON.stringify(list))
    todos.innerHTML = ''
    countAll.innerText = list.length
    countComplete.innerText = list.filter(f => f.isComplete).length

    list.forEach((item, index) => {
      const card = document.createElement('div')
      card.classList.add('card')
      if (item.isComplete)
        card.classList.add('complete')
      else
        card.classList.remove('complete')

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.checked = item.isComplete

      checkbox.addEventListener('change', (event) => {
        list[index].isComplete = event.target.checked
        renderList()
      })

      const text = document.createElement('p')
      text.innerText = item.text

      const deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`

      deleteBtn.addEventListener('click', () => {
        list.splice(index, 1)
        renderList()
      })

      card.appendChild(checkbox)
      card.appendChild(text)
      card.appendChild(deleteBtn)

      todos.appendChild(card)
    })
  }

  renderList()


  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!inputText.value) return

    list.push({
      text: inputText.value,
      isComplete: false
    })
    inputText.value = ''
    inputText.focus()
    renderList()
  })

})