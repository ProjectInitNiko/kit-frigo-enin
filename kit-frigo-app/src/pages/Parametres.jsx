import React, { useState } from 'react';

export default function Parametres() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoOrder, setAutoOrder] = useState(false);

  return (
    <div className="main-content">
      {/* Profile */}
      <div className="profile-card fade-in">
        <div className="profile-avatar">RC</div>
        <div className="profile-info">
          <h3>Restaurant Le Comptoir</h3>
          <p>Paris 11e — Cuisine française</p>
        </div>
      </div>

      {/* Kit Info */}
      <div className="settings-group fade-in fade-in-delay-1">
        <div className="settings-group-title">Kit Frigo</div>
        <div className="settings-item" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <span className="settings-item-icon">🧊</span>
          <span className="settings-item-label">Chambres connectées</span>
          <span className="settings-item-value">3</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">📡</span>
          <span className="settings-item-label">Capteurs actifs</span>
          <span className="settings-item-value" style={{ color: 'var(--success)' }}>12 ● En ligne</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">📷</span>
          <span className="settings-item-label">Caméras</span>
          <span className="settings-item-value">3 actives</span>
        </div>
        <div className="settings-item" style={{ borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
          <span className="settings-item-icon">⚖️</span>
          <span className="settings-item-label">Tapis balances</span>
          <span className="settings-item-value">6 actifs</span>
        </div>
      </div>

      {/* IA Settings */}
      <div className="settings-group fade-in fade-in-delay-2">
        <div className="settings-group-title">Intelligence Artificielle</div>
        <div className="settings-item" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <span className="settings-item-icon">🧠</span>
          <span className="settings-item-label">Phase d'apprentissage</span>
          <span className="settings-item-value" style={{ color: 'var(--info)' }}>Jour 18/28</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">📊</span>
          <span className="settings-item-label">Précision prédictions</span>
          <span className="settings-item-value">78%</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">📈</span>
          <span className="settings-item-label">Points de données</span>
          <span className="settings-item-value">1 247</span>
        </div>
        <div className="settings-item" style={{ borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
          <span className="settings-item-icon">🔄</span>
          <span className="settings-item-label">Patterns détectés</span>
          <span className="settings-item-value">12</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-group fade-in fade-in-delay-3">
        <div className="settings-group-title">Préférences</div>
        <div className="settings-item" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <span className="settings-item-icon">🔔</span>
          <span className="settings-item-label">Notifications push</span>
          <div
            className={`toggle ${notifications ? 'active' : ''}`}
            onClick={() => setNotifications(!notifications)}
          />
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">🌙</span>
          <span className="settings-item-label">Mode sombre</span>
          <div
            className={`toggle ${darkMode ? 'active' : ''}`}
            onClick={() => setDarkMode(!darkMode)}
          />
        </div>
        <div className="settings-item" style={{ borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
          <span className="settings-item-icon">🤖</span>
          <span className="settings-item-label">Commandes auto.</span>
          <div
            className={`toggle ${autoOrder ? 'active' : ''}`}
            onClick={() => setAutoOrder(!autoOrder)}
          />
        </div>
      </div>

      {/* Thresholds */}
      <div className="settings-group fade-in fade-in-delay-4">
        <div className="settings-group-title">Seuils d'alerte</div>
        <div className="settings-item" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <span className="settings-item-icon">🌡️</span>
          <span className="settings-item-label">Température max (frigo)</span>
          <span className="settings-item-value">4°C ›</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">❄️</span>
          <span className="settings-item-label">Température max (congél.)</span>
          <span className="settings-item-value">-18°C ›</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">📦</span>
          <span className="settings-item-label">Alerte stock bas</span>
          <span className="settings-item-value">25% ›</span>
        </div>
        <div className="settings-item" style={{ borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
          <span className="settings-item-icon">⏰</span>
          <span className="settings-item-label">Alerte péremption</span>
          <span className="settings-item-value">3 jours ›</span>
        </div>
      </div>

      {/* Suppliers */}
      <div className="settings-group fade-in fade-in-delay-5">
        <div className="settings-group-title">Fournisseurs</div>
        <div className="settings-item" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <span className="settings-item-icon">🥩</span>
          <span className="settings-item-label">Boucherie Martin</span>
          <span className="settings-item-value" style={{ color: 'var(--success)' }}>Actif ›</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">🐟</span>
          <span className="settings-item-label">Marée Fraîche</span>
          <span className="settings-item-value" style={{ color: 'var(--success)' }}>Actif ›</span>
        </div>
        <div className="settings-item">
          <span className="settings-item-icon">🥬</span>
          <span className="settings-item-label">Primeur Local</span>
          <span className="settings-item-value" style={{ color: 'var(--success)' }}>Actif ›</span>
        </div>
        <div className="settings-item" style={{ borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
          <span className="settings-item-icon">🥛</span>
          <span className="settings-item-label">Lactalis Pro</span>
          <span className="settings-item-value" style={{ color: 'var(--success)' }}>Actif ›</span>
        </div>
      </div>

      {/* App info */}
      <div style={{
        textAlign: 'center',
        padding: '20px 0',
        color: 'var(--text-tertiary)',
        fontSize: '0.75rem',
      }}>
        <p>Kit Frigo v1.0.0</p>
        <p style={{ marginTop: '4px' }}>Projet ENIN — Entrepreneuriat & Innovation</p>
      </div>
    </div>
  );
}
