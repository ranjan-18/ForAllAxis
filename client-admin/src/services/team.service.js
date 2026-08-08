import api from './api';

export const teamService = {
  getAll: (params) => api.get('/team', { params }),
  getById: (id) => api.get(`/team/${id}`),
  create: (data) => api.post('/team', data),
  update: (id, data) => api.put(`/team/${id}`, data),
  delete: (id) => api.delete(`/team/${id}`)
};
