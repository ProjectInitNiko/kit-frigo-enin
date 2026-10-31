import React, { useState } from 'react';
import { orderSuggestions, predictions } from '../data/mockData';

export default function Commandes() {
  const [confirmedOrders, setConfirmedOrders] = useState(new Set());

  const handleConfirm = (orderId) => {
    setConfirmedOrders(prev => new Set([...prev, orderId]));
  };

  const totalEstimated = orderSuggestions.reduce((sum, o) => sum + o.total, 0);
  const pendingCount = orderSuggestions.filter(o => !confirmedOrders.has(o.id)).length;

  return (
    <div className="main-content">
      {/* AI Summary */}
      <div className="prediction-card fade-in" style={{ marginBottom: '20px' }}>
        <div className="prediction-header">
          <span className="prediction-icon">🤖</span>
          <span className="prediction-title">Recommandations IA</span>
        </div>
        <p style={{
          fontSize: '0.8125rem',
          opacity: 0.9,
          lineHeight: 1.5,
          marginBottom: '12px',
          position: 'relative',
          zIndex: 1,
        }}>
          Basé sur votre consommation des 18 derniers jours, l'IA recommande
          <strong> {orderSuggestions.reduce((s, o) => s + o.items.length, 0)} produits</strong> à
          commander chez <strong>{orderSuggestions.length} fournisseurs</strong>.
        </p>
        <div style={{
          display: 'flex',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            flex: 1,
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{totalEstimated.toFixed(0)}€</div>
            <div style={{ fontSize: '0.6875rem', opacity: 0.75 }}>Coût estimé</div>
          </div>
          <div style={{
            flex: 1,
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{pendingCount}</div>
            <div style={{ fontSize: '0.6875rem', opacity: 0.75 }}>En attente</div>
          </div>
          <div style={{
            flex: 1,
            padding: '10px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{confirmedOrders.size}</div>
            <div style={{ fontSize: '0.6875rem', opacity: 0.75 }}>Confirmées</div>
          </div>
        </div>
      </div>

      {/* Order suggestions */}
      <div className="section-header">
        <span className="section-title">Commandes Suggérées</span>
      </div>

      {orderSuggestions.map((order) => {
        const isConfirmed = confirmedOrders.has(order.id);

        return (
          <div key={order.id} className="order-suggestion fade-in" style={{
            opacity: isConfirmed ? 0.6 : 1,
            transition: 'opacity 0.3s',
          }}>
            <div className="order-suggestion-header">
              <div>
                <div className="order-supplier">{order.supplier}</div>
                <div className="order-date" style={{
                  color: order.urgent ? 'var(--danger)' : 'var(--text-secondary)',
                  fontWeight: order.urgent ? 600 : 400,
                }}>
                  {order.urgent ? '🔴 ' : '📅 '}{order.suggestedDate}
                </div>
              </div>
              {isConfirmed && (
                <span style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--success-bg)',
                  color: 'var(--success)',
                }}>
                  ✓ Confirmée
                </span>
              )}
            </div>

            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item-row">
                  <div className="order-item-left">
                    <span className="order-item-emoji">{item.emoji}</span>
                    <span className="order-item-name">{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span className="order-item-qty">{item.qty}</span>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {item.price.toFixed(0)}€
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div className="order-total">
                Total estimé :<span>{order.total.toFixed(2)}€</span>
              </div>
              {!isConfirmed ? (
                <button
                  className="order-confirm-btn"
                  onClick={() => handleConfirm(order.id)}
                  style={order.urgent ? {
                    background: 'var(--danger)',
                    animation: 'pulse-banner 2s infinite',
                  } : {}}
                >
                  {order.urgent ? '⚡ Commander' : '✓ Confirmer'}
                </button>
              ) : (
                <button
                  className="order-confirm-btn"
                  style={{ background: 'var(--border)', cursor: 'default' }}
                  disabled
                >
                  Envoyée
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* History section */}
      <div className="section-header" style={{ marginTop: '24px' }}>
        <span className="section-title">Historique Récent</span>
        <button className="section-action">Exporter</button>
      </div>

      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        padding: '16px',
      }}>
        {[
          { date: '29 Oct', supplier: 'Boucherie Martin', items: 2, total: '78€', status: 'Livrée ✅' },
          { date: '27 Oct', supplier: 'Primeur Local', items: 3, total: '45€', status: 'Livrée ✅' },
          { date: '25 Oct', supplier: 'Lactalis Pro', items: 2, total: '32€', status: 'Livrée ✅' },
        ].map((entry, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 0',
            borderTop: i > 0 ? '1px solid var(--border)' : 'none',
          }}>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 500 }}>{entry.supplier}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>
                {entry.date} • {entry.items} articles
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{entry.total}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--success)' }}>{entry.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
