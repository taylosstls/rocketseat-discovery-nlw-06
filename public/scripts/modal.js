export function Modal() {
  const cancelButton = document.querySelector('.modal-wrapper .btn-cancel')
  const modalWrapper = document.querySelector('.modal-wrapper')

  cancelButton.addEventListener('click', close)

  function open() {
    modalWrapper.classList.add('active')
  }
  function close() {
    modalWrapper.classList.remove('active')
  }

  return {
    open,
    close
  }
}
