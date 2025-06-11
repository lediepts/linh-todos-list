window.addEventListener('load', () => {

  let selectedIndex = -1

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
      if (index === selectedIndex) checkbox.disabled = true

      checkbox.addEventListener('change', (event) => {
        list[index].isComplete = event.target.checked
        renderList()
      })

      const text = document.createElement('p')
      text.innerText = item.text

      text.addEventListener('click', () => {
        inputText.value = item.text
        selectedIndex = index
        renderList()
      })

      const deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`

      if (index === selectedIndex) deleteBtn.disabled = true
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
    if (selectedIndex >= 0) {
      list.splice(selectedIndex, 1, {
        text: inputText.value,
        isComplete: false
      })
      selectedIndex = -1
    } else {
      list.push({
        text: inputText.value,
        isComplete: false
      })
    }
    inputText.value = ''
    inputText.focus()
    renderList()
  })

})