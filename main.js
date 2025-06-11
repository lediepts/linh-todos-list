window.addEventListener('load', () => {
  const dataInStorage = localStorage.getItem('todos')
  const list = dataInStorage ? JSON.parse(dataInStorage) : []

  let selectedIndex = -1
  let currentFilter = 'all'

  const inputText = document.getElementById('input-text')
  const form = document.getElementById('form-add')
  const countAll = document.getElementById('countAll')
  const countComplete = document.getElementById('countComplete')
  const todos = document.getElementById('todos')

  const filterButtons = document.querySelectorAll('.filter-btn')
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      currentFilter = btn.dataset.filter
      renderList()
    })
  })

  function renderList() {
    localStorage.setItem('todos', JSON.stringify(list))
    todos.innerHTML = ''
    countAll.innerText = list.length
    countComplete.innerText = list.filter(f => f.isComplete).length

    let filteredList = list
    if (currentFilter === 'active') {
      filteredList = list.filter(item => !item.isComplete)
    } else if (currentFilter === 'completed') {
      filteredList = list.filter(item => item.isComplete)
    }

    filteredList.forEach((item, index) => {
      const time = document.createElement('span')
      const date = new Date(item.createAt)
      time.innerText = date.toLocaleDateString('vi-VN', {
        hour: '2-digit', minute: '2-digit',
        day: '2-digit', month: '2-digit', year: 'numeric'
      })
      time.style.fontSize = '1.2rem'
      time.style.color = '#666'

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
        const originalIndex = list.findIndex(x => x.createAt === item.createAt)
        list[originalIndex].isComplete = event.target.checked
        renderList()
      })

      const text = document.createElement('p')
      text.innerText = item.text
      text.addEventListener('click', () => {
        inputText.value = item.text
        selectedIndex = list.findIndex(x => x.createAt === item.createAt)
        renderList()
      })

      const deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
      if (index === selectedIndex) deleteBtn.disabled = true
      deleteBtn.addEventListener('click', () => {
        const originalIndex = list.findIndex(x => x.createAt === item.createAt)
        list.splice(originalIndex, 1)
        renderList()
      })

      card.appendChild(checkbox)
      card.appendChild(text)
      card.appendChild(deleteBtn)
      card.appendChild(time)

      todos.appendChild(card)
    })
  }

  renderList()

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (!inputText.value) return

    const newTask = {
      text: inputText.value,
      isComplete: false,
      createAt: new Date().toISOString()
    }

    if (selectedIndex >= 0) {
      newTask.isComplete = list[selectedIndex].isComplete
      newTask.createAt = list[selectedIndex].createAt
      list.splice(selectedIndex, 1, newTask)
      selectedIndex = -1
    } else {
      list.push(newTask)
    }

    inputText.value = ''
    inputText.focus()
    renderList()
  })
})