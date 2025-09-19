/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  constructor(ticket, { onToggle, onEdit, onDelete, onExpand }) {
    this.ticket = ticket;
    this.onToggle = onToggle;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
    this.onExpand = onExpand;
    this.node = this.render();
  }

  formatDate(ts) {
    const d = new Date(ts);
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  render() {
    const li = document.createElement('li');
    li.className = 'ticket';
    if (this.ticket.status) {
      li.classList.add('done');
    }
    li.dataset.id = this.ticket.id;

    li.innerHTML = `
      <div class="ticket-row">
        <div class="checkbox ${this.ticket.status ? 'done' : ''}"></div>
        <div class="ticket-title">${this.ticket.name}</div>
        <div class="ticket-date">${this.formatDate(this.ticket.created)}</div>
        <div class="ticket-actions">
          <button class="icon-btn edit">✎</button>
          <button class="icon-btn del">✕</button>
        </div>
      </div>
    `;

    li.querySelector('.checkbox').addEventListener('click', (e) => {
      e.stopPropagation();
      this.onToggle?.(this.ticket);
    });

    li.querySelector('.edit').addEventListener('click', (e) => {
      e.stopPropagation();
      this.onEdit?.(this.ticket);
    });

    li.querySelector('.del').addEventListener('click', (e) => {
      e.stopPropagation();
      this.onDelete?.(this.ticket);
    });

    li.querySelector('.ticket-title').addEventListener('click', () => {
      this.onExpand?.(this, this.ticket);
    });

    return li;
  }

  setDescription(text) {
    let desc = this.node.querySelector('.ticket-desc');
    if (!desc) {
      desc = document.createElement('div');
      desc.className = 'ticket-desc';
      this.node.append(desc);
    }
    desc.textContent = text || 'Описание отсутствует';
  }

  removeDescription() {
    const desc = this.node.querySelector('.ticket-desc');
    if (desc) desc.remove();
  }
}