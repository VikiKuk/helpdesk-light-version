/**
 *  Класс для создания формы создания/редактирования тикета
 * */
import Modal from './Modal.js';

export default class TicketForm extends Modal {
  constructor({ title, data = {}, onSubmit }) {
    const form = document.createElement('div');
    form.innerHTML = `
      <div class="form-row">
        <label>Краткое описание</label>
        <input type="text" name="name" value="${data.name || ''}" required>
      </div>
      <div class="form-row">
        <label>Подробное описание</label>
        <textarea name="description" rows="5">${data.description || ''}</textarea>
      </div>
      <div class="actions">
        <button type="button" class="btn-cancel">Отмена</button>
        <button type="button" class="btn-ok">Ок</button>
      </div>
    `;

    super({ title, content: form });

    form.querySelector('.btn-cancel').addEventListener('click', () => this.close());
    form.querySelector('.btn-ok').addEventListener('click', () => {
      const name = form.querySelector('[name="name"]').value.trim();
      const description = form.querySelector('[name="description"]').value.trim();
      if (!name) {
        alert('Введите краткое описание');
        return;
      }
      onSubmit?.({ name, description });
      this.close();
    });
  }
}