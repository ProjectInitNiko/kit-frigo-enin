import React, { useState } from 'react';
import { stockItems, coldRooms } from '../data/mockData';

export default function Stock() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStockLevel = (item) => {
    const ratio = item.weightCurrent / item.weightMax;
    if (ratio < 0.25) return 'low';
    if (ratio < 0.5) return 'medium';
    return 'good';
  };

  const getExpiryLabel = (days) => {
    if (days <= 1) return { text: 'Expire demain !', className: 'urgent' };
    if (days <= 3) return { text: `Expire dans ${days}j`, className: 'soon' };
    return { text: `${days} jours`, className: '' };
  };

  const filteredItems = stockItems
    .filter(item => {
      if (filter === 'low') return (item.weightCurrent / item.weightMax) < 0.35;
      if (filter === 'expiring') return item.expiryDays <= 3;
      if (filter !== 'all') return item.room === filter;
      return true;
    })
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.expiryDays - b.expiryDays);

  return (
    <div className="main-content">
      {/* Search */}
      <div style={{
        position: 'relative',
        marginBottom: '16px',
      }}>
        <input
          type="text"
          placeholder="🔍 Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--text-primary)',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
      </div>

      {/* Filter chips */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px',
        scrollbarWidth: 'none',
      }}>
        {[
          { id: 'all', label: 'Tous', count: stockItems.length },
          { id: 'low', label: '⚠️ Stock bas', count: stockItems.filter(i => (i.weightCurrent / i.weightMax) < 0.35).length },
          { id: 'expiring', label: '⏰ Péremption', count: stockItems.filter(i => i.expiryDays <= 3).length },
          ...coldRooms.map(r => ({ id: r.id, label: r.icon + ' ' + r.name.split(' ').slice(-1)[0], count: stockItems.filter(i => i.room === r.id).length })),
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: filter === f.id ? 'var(--primary)' : 'var(--bg-card)',
              color: filter === f.id ? 'white' : 'var(--text-secondary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {f.label}
            <span style={{
              background: filter === f.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-elevated)',
              padding: '1px 6px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.6875rem',
            }}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="stock-list">
        {filteredItems.map((item) => {
          const level = getStockLevel(item);
          const expiry = getExpiryLabel(item.expiryDays);
          const pct = Math.round((item.weightCurrent / item.weightMax) * 100);
          const room = coldRooms.find(r => r.id === item.room);

          return (
            <div key={item.id} className="stock-item fade-in">
              <div className="stock-item-icon">{item.emoji}</div>
              <div className="stock-item-info">
                <div className="stock-item-name">{item.name}</div>
                <div className="stock-item-detail">
                  {item.weightCurrent} / {item.weightMax} {item.unit} • {room?.icon} {room?.name.split(' ').slice(-1)[0]}
                </div>
                <div className="stock-bar-container">
                  <div className={`stock-bar ${level}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="stock-item-right">
                <div className={`stock-level ${level}`}>{pct}%</div>
                <div className={`stock-expiry ${expiry.className}`}>{expiry.text}</div>
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Aucun produit trouvé</h3>
            <p>Modifiez vos filtres ou votre recherche</p>
          </div>
        )}
      </div>

      {/* Summary footer */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: '16px 20px',
        border: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'center',
      }}>
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stockItems.length}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>PRODUITS</div>
        </div>
        <div style={{ width: '1px', background: 'var(--border)' }} />
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>
            {stockItems.reduce((sum, i) => sum + i.weightCurrent, 0).toFixed(1)} kg
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>STOCK TOTAL</div>
        </div>
        <div style={{ width: '1px', background: 'var(--border)' }} />
        <div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--warning)' }}>
            {stockItems.filter(i => (i.weightCurrent / i.weightMax) < 0.35).length}
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>À COMMANDER</div>
        </div>
      </div>
    </div>
  );
}
