import React, { useState } from 'react';
import { alerts } from '../data/mockData';

export default function Alertes() {
  const [alertsState, setAlertsState] = useState(alerts);
  const [filter, setFilter] = useState('all');

  const handleAcknowledge = (alertId) => {
    setAlertsState(prev =>
      prev.map(a => a.id === alertId ? { ...a, acknowledged: true } : a)
    );
  };

  const filteredAlerts = alertsState.filter(a => {
    if (filter === 'active') return !a.acknowledged;
    if (filter === 'resolved') return a.acknowledged;
    return true;
  });

  const activeCount = alertsState.filter(a => !a.acknowledged).length;
  const criticalCount = alertsState.filter(a => a.type === 'critical' && !a.acknowledged).length;

  return (
    <div className="main-content">
      {/* Alert summary */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '16px',
      }}>
        <div style={{
          flex: 1,
          padding: '16px',
          background: criticalCount > 0 ? 'var(--danger-bg)' : 'var(--success-bg)',
          borderRadius: 'var(--radius-lg)',
          border: `1px solid ${criticalCount > 0 ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: criticalCount > 0 ? 'var(--danger)' : 'var(--success)',
          }}>
            {activeCount}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
            Alertes actives
          </div>
        </div>
        <div style={{
          flex: 1,
          padding: '16px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--text-secondary)',
          }}>
            {alertsState.filter(a => a.acknowledged).length}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>
            Traitées
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex',
        gap: '4px',
        background: 'var(--bg-card)',
        padding: '4px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '16px',
        border: '1px solid var(--border)',
      }}>
        {[
          { id: 'all', label: 'Toutes' },
          { id: 'active', label: `🔴 Actives (${activeCount})` },
          { id: 'resolved', label: '✅ Traitées' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: filter === tab.id ? 'var(--primary)' : 'transparent',
              color: filter === tab.id ? 'white' : 'var(--text-tertiary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="alerts-list">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert-item ${alert.type} fade-in`}
            style={{
              opacity: alert.acknowledged ? 0.6 : 1,
            }}
          >
            <span className="alert-icon">{alert.icon}</span>
            <div className="alert-content">
              <div className="alert-title">{alert.title}</div>
              <div className="alert-description">{alert.description}</div>
              <div className="alert-time">{alert.time}</div>

              {!alert.acknowledged && (
                <div className="alert-actions">
                  <button
                    className="alert-action-btn primary"
                    onClick={() => handleAcknowledge(alert.id)}
                  >
                    ✓ Traiter
                  </button>
                  <button className="alert-action-btn secondary">
                    Détails
                  </button>
                </div>
              )}

              {alert.acknowledged && (
                <div style={{
                  marginTop: '8px',
                  fontSize: '0.6875rem',
                  color: 'var(--success)',
                  fontWeight: 500,
                }}>
                  ✓ Traitée
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🎉</div>
            <h3>Aucune alerte</h3>
            <p>Toutes les alertes ont été traitées !</p>
          </div>
        )}
      </div>

      {/* Notification settings hint */}
      <div style={{
        marginTop: '12px',
        padding: '14px 16px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
      }}>
        <span style={{ fontSize: '20px' }}>🔔</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Notifications push</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
            Recevez les alertes critiques en temps réel
          </div>
        </div>
        <div className="toggle active" />
      </div>
    </div>
  );
}
