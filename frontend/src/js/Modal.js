export default class Modal {
  constructor({ title, content, onClose }) {
    this.onClose = onClose;

    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop';

    this.modal = document.createElement('div');
    this.modal.className = 'modal';
    this.modal.innerHTML = `
      <h3>${title}</h3>
      <div class="modal-content"></div>
    `;
    this.contentEl = this.modal.querySelector('.modal-content');
    this.backdrop.append(this.modal);

    if (content) {
      this.setContent(content);
    }
  }

  setContent(node) {
    if (typeof node === 'string') {
      this.contentEl.innerHTML = node;
    } else {
      this.contentEl.innerHTML = '';
      this.contentEl.append(node);
    }
  }

  open() {
    document.body.append(this.backdrop);
  }

  close() {
    this.backdrop.remove();
    this.onClose?.();
  }
}