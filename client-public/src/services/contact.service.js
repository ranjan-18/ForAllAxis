import api from './api';
export const contactService = {
  submit: (data) => api.post('/contacts', data),
  getAll: (params) => api.get('/contacts', { params }),
  updateStatus: (id, status) => api.patch(`/contacts/${id}`, { status }),
  delete: (id) => api.delete(`/contacts/${id}`)
};
