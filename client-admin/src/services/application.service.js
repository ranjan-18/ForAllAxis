import api from './api';

export const applicationService = {
  getAll: () => api.get('/applications'),
  create: (data) => {
    return api.post('/applications', data);
  },
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
  delete: (id) => api.delete(`/applications/${id}`)
};
