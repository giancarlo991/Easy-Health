import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import TrainerCard from '../shared/TrainerCard';
import StarsRating from '../shared/StarsRating';
import '../../styles/Rankings/rankings.css';

export default function Rankings() {
  const [professionals, setProfessionals] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [carregando, setCarregando] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchRankings = async () => {
      setCarregando(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await api.get(`/api/professionals/top-rated?limit=${limit}&page=${page}`);
        setProfessionals(res.data.professionals || []);
        setPagination(res.data.pagination || { page: 1, totalPages: 1, total: 0 });
      } catch (err) {
        console.error('Erro ao carregar ranking:', err);
      } finally {
        setCarregando(false);
      }
    };
    fetchRankings();
  }, [page]);

  const top3 = professionals.filter((p) => p.rank <= 3);
  const rest = professionals.filter((p) => p.rank > 3);

  if (carregando) {
    return (
      <div className="rankings-container">
        <div className="rankings-loading">Carregando ranking...</div>
      </div>
    );
  }

  return (
    <div className="rankings-container">
      <div className="rankings-header">
        <h1>Ranking de Profissionais</h1>
        <p>Os melhores avaliados da plataforma EasyHealth</p>
      </div>

      {professionals.length === 0 ? (
        <div className="rankings-empty">
          <p>Nenhum profissional encontrado.</p>
        </div>
      ) : (
        <>
          {/* Pódio Top 3 */}
          {top3.length > 0 && (
            <div className="podium">
              {top3.map((p) => (
                <div key={p._id} className={`podium-card rank-${p.rank}`}>
                  <div className="podium-rank">
                    {p.rank === 1 ? '??' : p.rank === 2 ? '??' : '??'}
                  </div>
                  <div className="podium-avatar">
                    {p.userId?.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <h3 className="podium-name">{p.userId?.name || '—'}</h3>
                  <p className="podium-type">{p.type}</p>
                  <StarsRating rating={p.weighted_rating} size="sm" />
                  <span className="podium-rating">{p.weighted_rating?.toFixed(1)}</span>
                  {p.city && <span className="podium-city">?? {p.city}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Lista do restante */}
          {rest.length > 0 && (
            <div className="rankings-list">
              <h2 className="rankings-subtitle">Classificação Geral</h2>
              {rest.map((p) => (
                <TrainerCard key={p._id} trainer={p} rank={p.rank} />
              ))}
            </div>
          )}

          {/* Paginação */}
          {pagination.totalPages > 1 && (
            <div className="rankings-pagination">
              <button
                className="pagination-btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </button>
              <span className="pagination-info">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              <button
                className="pagination-btn"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
