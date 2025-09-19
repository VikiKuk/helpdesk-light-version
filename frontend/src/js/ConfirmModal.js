import Modal from './Modal.js';

export default class ConfirmModal extends Modal {
  constructor({ title, message, onConfirm }) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <p>${message}</p>
      <div class="actions">
        <button type="button" class="btn-cancel">Отмена</button>
        <button type="button" class="btn-ok">Ок</button>
      </div>
    `;

    super({ title, content: wrapper });

    wrapper.querySelector('.btn-cancel').addEventListener('click', () => this.close());
    wrapper.querySelector('.btn-ok').addEventListener('click', () => {
      onConfirm?.();
      this.close();
    });
  }
}