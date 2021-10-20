import { Modal } from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal-wrapper .modal h2')
const modalDescription = document.querySelector('.modal-wrapper .modal p')
const modalButton = document.querySelector('.modal-wrapper .modal .btn-delete')

const checkButtons = document.querySelectorAll('.actions a.check')
const deleteButtons = document.querySelectorAll('.actions .delete')

const btnCopy = document.querySelector('#room-id')

const handleClickOpen = event => {
  event.preventDefault()

  const checkClass = event.currentTarget.className == 'check'
  const text = checkClass ? 'marcar como lida' : 'excluir'

  const roomId = document.querySelector('#room-id').getAttribute('data-id')
  const slugId = checkClass ? 'check' : 'delete'
  const questionId = event.target.getAttribute('data-id')

  const form = document.querySelector('.modal form')
  form.setAttribute('action', `/question/${roomId}/${questionId}/${slugId}`)

  modalTitle.innerHTML = `${text} esta pergunta?`
  modalDescription.innerHTML = `Tem certeza que deseja ${text} esta pergunta?`
  modalButton.innerHTML = `Sim, ${text}`

  checkClass
    ? modalButton.classList.contains('red')
      ? modalButton.classList.remove('red')
      : ''
    : modalButton.classList.contains('red')
    ? ''
    : modalButton.classList.add('red')

  modal.open()
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href)
}

btnCopy.addEventListener('click', copyToClipboard)

checkButtons.forEach(button => {
  button.addEventListener('click', handleClickOpen)
})

deleteButtons.forEach(button => {
  button.addEventListener('click', handleClickOpen)
})
