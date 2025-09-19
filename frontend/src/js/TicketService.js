import createRequest from './api/createRequest.js';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  list(callback) {
    createRequest({ url: '/api/?method=allTickets', callback });
  }

  get(id, callback) {
    createRequest({ url: `/api/?method=ticketById&id=${id}`, callback });
  }

  create(data, callback) {
    createRequest({
      url: '/api/?method=createTicket',
      method: 'POST',
      data,
      callback,
    });
  }

  update(id, data, callback) {
    createRequest({
      url: `/api/?method=updateById&id=${id}`,
      method: 'POST',
      data,
      callback,
    });
  }

  delete(id, callback) {
    createRequest({ url: `/api/?method=deleteById&id=${id}`, callback });
  }
}