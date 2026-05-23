import React, { useState, useEffect } from 'react';
import StarsRating from './StarsRating';
import api from '../../services/api';
import '../../styles/shared/filterPanel.css';

export default function FilterPanel({ filters, onFilterChange }) {
  const [options, setOptions] = useState({ cities: [], modalities: [], priceRange: { min: 0, max: 0 } });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await api.get('/api/professionals/filters');
        setOptions(res.data);
      } catch (err) {
        console.error('Erro ao carregar op\u00E7\u00F5es de filtro:', err);
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      city: '',
      modality: '',
      minPrice: '',
      maxPrice: '',
      minRating: 0,
      sortBy: 'rating',
    });
  };

  const hasFilters = filters.city || filters.modality || filters.minPrice || filters.maxPrice || filters.minRating > 0;

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filtros</h3>
        {hasFilters && (
          <button className="filter-clear-btn" onClick={clearFilters}>Limpar</button>
        )}
      </div>

      <div className="filter-group">
        <label className="filter-label">Cidade</label>
        <select
          className="filter-select"
          value={filters.city}
          onChange={(e) => handleChange('city', e.target.value)}
        >
          <option value="">Todas as cidades</option>
          {options.cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Modalidade</label>
        <select
          className="filter-select"
          value={filters.modality}
          onChange={(e) => handleChange('modality', e.target.value)}
        >
          <option value="">Todas as modalidades</option>
          {options.modalities.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Pre\u00E7o por sess\u00E3o</label>
        <div className="price-range-row">
          <input
            type="number"
            className="filter-input"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleChange('minPrice', e.target.value)}
            min="0"
          />
          <span className="price-separator">-</span>
          <input
            type="number"
            className="filter-input"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleChange('maxPrice', e.target.value)}
            min="0"
          />
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Nota m\u00EDnima</label>
        <StarsRating
          rating={filters.minRating || 0}
          size="lg"
          interactive
          onChange={(val) => handleChange('minRating', val)}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Ordenar por</label>
        <select
          className="filter-select"
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
        >
          <option value="rating">Melhor avalia\u00E7\u00E3o</option>
          <option value="price_asc">Menor pre\u00E7o</option>
          <option value="price_desc">Maior pre\u00E7o</option>
        </select>
      </div>
    </div>
  );
}