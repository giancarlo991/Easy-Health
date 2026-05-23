import React from 'react';
import StarsRating from './StarsRating';
import '../../styles/shared/trainerCard.css';

export default function TrainerCard({ trainer, rank }) {
  const user = trainer.userId || {};

  const formatPrice = (price) => {
    if (!price || price === 0) return 'A combinar';
    return `R$ ${Number(price).toFixed(2).replace('.', ',')}/sessao`;
  };

  const getRankDisplay = (r) => {
    if (r === 1) return String.fromCodePoint(0x1F947);
    if (r === 2) return String.fromCodePoint(0x1F948);
    if (r === 3) return String.fromCodePoint(0x1F949);
    return `#${r}`;
  };

  return (
    <div className="trainer-card">
      {rank && (
        <div className={`trainer-rank rank-${rank}`}>
          {getRankDisplay(rank)}
        </div>
      )}

      <div className="trainer-card-avatar">
        <div className="avatar-placeholder">
          {user.name ? user.name.charAt(0).toUpperCase() : '?'}
        </div>
      </div>

      <div className="trainer-card-body">
        <h3 className="trainer-name">{user.name || 'Nome nao informado'}</h3>
        <p className="trainer-type">{trainer.type || 'Personal Trainer'}</p>

        <div className="trainer-rating-row">
          <StarsRating rating={trainer.weighted_rating || 0} size="sm" />
          <span className="trainer-rating-value">
            {trainer.weighted_rating?.toFixed(1) || '0.0'}
          </span>
          <span className="trainer-rating-count">
            ({trainer.total_ratings || 0} avaliacoes)
          </span>
        </div>

        <div className="trainer-info-row">
          {trainer.city && (
            <span className="trainer-info-tag">{String.fromCodePoint(0x1F4CD)} {trainer.city}</span>
          )}
          <span className="trainer-info-tag price-tag">
            {formatPrice(trainer.session_price)}
          </span>
        </div>

        {trainer.modalities?.length > 0 && (
          <div className="trainer-modalities">
            {trainer.modalities.slice(0, 3).map((mod, i) => (
              <span key={i} className="modality-badge">{mod}</span>
            ))}
            {trainer.modalities.length > 3 && (
              <span className="modality-badge more">+{trainer.modalities.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}