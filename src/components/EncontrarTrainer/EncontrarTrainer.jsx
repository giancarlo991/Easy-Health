import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import TrainerCard from '../shared/TrainerCard';
import FilterPanel from '../shared/FilterPanel';
import '../../styles/EncontrarTrainer/encontrarTrainer.css';

export default function EncontrarTrainer() {
  const [professionals, setProfessionals] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });
  const [carregando, setCarregando] = useState(true);
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    city: '',
    modality: '',
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    sortBy: 'rating'
  });

  const fetchProfessionals = useCallback(async () => {
    setCarregando(true);

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setProfessionals([]);
        setPagination({
          page: 1,
          totalPages: 1,
          total: 0
        });
        return;
      }

      const params = new URLSearchParams();

      params.set('page', page);
      params.set('limit', '12');

      if (filters.city) params.set('city', filters.city);
      if (filters.modality) params.set('modality', filters.modality);
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
      if (filters.minRating > 0) params.set('minRating', filters.minRating);
      if (filters.sortBy) params.set('sortBy', filters.sortBy);

      const res = await api.get(`/api/professionals/search?${params.toString()}`);

      setProfessionals(res.data.professionals || []);
      setPagination(
        res.data.pagination || {
          page: 1,
          totalPages: 1,
          total: 0
        }
      );
    } catch (err) {
      console.error('Erro ao buscar profissionais:', err);
      setProfessionals([]);
      setPagination({
        page: 1,
        totalPages: 1,
        total: 0
      });
    } finally {
      setCarregando(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchProfessionals();
  }, [fetchProfessionals]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="encontrar-container">
      <div className="encontrar-header">
        <h1>Encontrar Personal Trainer</h1>
        <p>Encontre o profissional ideal para seus objetivos, treinos e hábitos saudáveis.</p>
      </div>

      <div className="encontrar-layout">
        <aside className="encontrar-sidebar">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        <main className="encontrar-main">
          {carregando ? (
            <div className="encontrar-loading">
              Buscando profissionais...
            </div>
          ) : professionals.length === 0 ? (
            <div className="encontrar-empty">
              <h3>Nenhum profissional encontrado</h3>
              <p>Tente ajustar os filtros para encontrar mais resultados.</p>
            </div>
          ) : (
            <>
              <div className="encontrar-results-header">
                <span className="encontrar-results-count">
                  {pagination.total} profissional(is) encontrado(s)
                </span>
              </div>

              <div className="encontrar-grid">
                {professionals.map((professional) => (
                  <TrainerCard key={professional._id} trainer={professional} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="encontrar-pagination">
                  <button
                    className="pagination-btn"
                    disabled={page <= 1}
                    onClick={() => setPage((currentPage) => currentPage - 1)}
                  >
                    Anterior
                  </button>

                  <span className="pagination-info">
                    Página {pagination.page} de {pagination.totalPages}
                  </span>

                  <button
                    className="pagination-btn"
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage((currentPage) => currentPage + 1)}
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}