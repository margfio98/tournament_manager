import api from './api';

export const listMatches = (tournamentId) =>
  tournamentId
    ? api.get('/matches', { params: { tournament_id: tournamentId } }).then((r) => r.data)
    : api.get('/matches').then((r) => r.data);

export const updateMatch = (id, data) => api.put(`/matches/${id}`, data).then((r) => r.data);
