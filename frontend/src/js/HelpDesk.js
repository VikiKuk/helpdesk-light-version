/**
 *  Основной класс приложения
 * */

import TicketView from './TicketView.js';
import ConfirmModal from './ConfirmModal.js';
import TicketForm from './TicketForm.js';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;

    this.container.innerHTML = `
      <div class="toolbar">
        <button id="add-btn" class="btn">Добавить тикет</button>
      </div>
      <ul id="ticket-list" class="ticket-list"></ul>
    `;

    this.listRoot = this.container.querySelector('#ticket-list');
    this.addBtn = this.container.querySelector('#add-btn');
    this.tickets = [];
  }

  init() {
    this.addBtn.addEventListener('click', () => this.createTicket());
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.list((err, data) => {
      if (err) return console.error(err);
      this.listRoot.innerHTML = '';
      this.tickets = data;
      this.tickets.forEach((t) => {
        const ticket = new TicketView(t, {
          onToggle: (t) => this.toggleStatus(t),
          onEdit: (t) => this.editTicket(t),
          onDelete: (t) => this.deleteTicket(t),
          onExpand: (cmp, t) => this.toggleDescription(cmp, t),
        });
        this.listRoot.append(ticket.node);
      });
    });
  }

  toggleStatus(t) {
    this.ticketService.update(
      t.id,
      { ...t, status: !t.status },
      (err) => !err && this.loadTickets(),
    );
  }

  toggleDescription(ticketCmp, t) {
    const expanded = ticketCmp.node.querySelector('.ticket-desc');
    if (expanded) {
      ticketCmp.removeDescription();
      return;
    }
    this.ticketService.get(t.id, (err, full) => {
      if (!err) ticketCmp.setDescription(full.description);
    });
  }

  createTicket() {
    const form = new TicketForm({
      title: 'Добавить тикет',
      onSubmit: (data) => {
        this.ticketService.create(data, (err) => !err && this.loadTickets());
      },
    });
    form.open();
  }

  editTicket(t) {
    this.ticketService.get(t.id, (err, full) => {
      if (err) return;
      const form = new TicketForm({
        title: 'Изменить тикет',
        data: full,
        onSubmit: (data) => {
          this.ticketService.update(t.id, data, (err) => !err && this.loadTickets());
        },
      });
      form.open();
    });
  }

  deleteTicket(t) {
    const modal = new ConfirmModal({
      title: 'Удалить тикет',
      message: 'Вы уверены, что хотите удалить тикет? Это действие необратимо.',
      onConfirm: () => {
        this.ticketService.delete(t.id, (err) => !err && this.loadTickets());
      },
    });
    modal.open();
  }
}