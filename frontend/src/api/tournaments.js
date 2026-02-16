import api from './api';

export const listTournaments = () => api.get('/tournaments').then((r) => r.data);

export const getTournament = (id) => api.get(`/tournaments/${id}`).then((r) => r.data);

export const createTournament = (data) => api.post('/tournaments', data).then((r) => r.data);

export const updateTournament = (id, data) => api.put(`/tournaments/${id}`, data).then((r) => r.data);

export const deleteTournament = (id) => api.delete(`/tournaments/${id}`).then((r) => r.data);
