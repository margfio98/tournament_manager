import api from './api';

export const listPlayers = () => api.get('/players').then((r) => r.data);

export const createPlayer = (data) => api.post('/players', data).then((r) => r.data);

export const updatePlayer = (id, data) => api.put(`/players/${id}`, data).then((r) => r.data);

export const deletePlayer = (id) => api.delete(`/players/${id}`).then((r) => r.data);
