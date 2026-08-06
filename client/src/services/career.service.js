import api from './api';

export const careerService = {
  getAll: (params) => api.get('/careers', { params }),
  getAllAdmin: (params) => api.get('/careers/admin/all', { params }),
  getBySlug: (slug) => api.get(`/careers/${slug}`),
  create: (data) => api.post('/careers', data),
  update: (id, data) => api.put(`/careers/${id}`, data),
  delete: (id) => api.delete(`/careers/${id}`),
  togglePublish: (id) => api.patch(`/careers/${id}/publish`)
};
