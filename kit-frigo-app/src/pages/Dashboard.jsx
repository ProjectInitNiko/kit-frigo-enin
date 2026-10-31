import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
  ReferenceLine, ReferenceArea
} from 'recharts';
import {
  coldRooms, stockItems, predictions, alerts,
  temperatureHistory, consumptionHistory, learningPhase
} from '../data/mockData';

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1E293B',
        border: '1px solid #334155',
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '0.75rem',
      }}>
        <p style={{ color: '#94A3B8', marginBottom: '4px' }}>{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color, fontWeight: 600 }}>
            {entry.name}: {entry.value}{unit || ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState('24h');

  // Compute summary stats
  const totalItems = stockItems.length;
  const lowStockItems = stockItems.filter(i => (i.weightCurrent / i.weightMax) < 0.35).length;
  const expiringItems = stockItems.filter(i => i.expiryDays <= 3).length;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;

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

  // Sort items: expiring soonest first, then lowest stock
  const sortedItems = [...stockItems].sort((a, b) => {
    if (a.expiryDays <= 3 && b.expiryDays > 3) return -1;
    if (b.expiryDays <= 3 && a.expiryDays > 3) return 1;
    return (a.weightCurrent / a.weightMax) - (b.weightCurrent / b.weightMax);
  });

  const overallStatus = activeAlerts > 1 ? 'warning' : activeAlerts > 0 ? 'warning' : 'ok';
  const statusMessage = activeAlerts > 0
    ? `${activeAlerts} alerte${activeAlerts > 1 ? 's' : ''} active${activeAlerts > 1 ? 's' : ''} — ${expiringItems} produit${expiringItems > 1 ? 's' : ''} à surveiller`
    : '✅ Tous les systèmes sont opérationnels';

  return (
    <div className="main-content">
      {/* Status Banner */}
      <div className={`status-banner ${overallStatus} fade-in`} style={{ margin: '0 0 16px' }}>
        <span className="status-dot"></span>
        <span>{statusMessage}</span>
      </div>

      {/* Learning Phase Card */}
      <div className="learning-card fade-in fade-in-delay-1">
        <div className="learning-header">
          <span>🧠</span>
          <span className="learning-title">Phase d'apprentissage IA</span>
        </div>
        <div className="learning-progress">
          <div className="learning-bar-bg">
            <div
              className="learning-bar-fill"
              style={{ width: `${(learningPhase.currentDay / learningPhase.totalDays) * 100}%` }}
            />
          </div>
          <div className="learning-details">
            <span>Jour {learningPhase.currentDay}/{learningPhase.totalDays}</span>
            <span>Précision : {learningPhase.accuracy}%</span>
          </div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="metrics-grid fade-in fade-in-delay-2">
        <div className="metric-card">
          <div className="metric-icon blue">🧊</div>
          <div className="metric-value">{coldRooms.length}</div>
          <div className="metric-label">Chambres froides</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon green">📦</div>
          <div className="metric-value">{totalItems}</div>
          <div className="metric-label">Produits suivis</div>
          <div className="metric-change up">↑ +2 cette semaine</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon orange">⚠️</div>
          <div className="metric-value">{lowStockItems}</div>
          <div className="metric-label">Stocks bas</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon red">⏰</div>
          <div className="metric-value">{expiringItems}</div>
          <div className="metric-label">Péremptions proches</div>
        </div>
      </div>

      {/* Cold Rooms */}
      <div className="section-header fade-in fade-in-delay-3">
        <span className="section-title">Chambres Froides</span>
        <button className="section-action">Voir tout</button>
      </div>

      {coldRooms.map((room) => (
        <div key={room.id} className="room-card fade-in fade-in-delay-3">
          <div className="room-card-header">
            <div className="room-card-title">
              <span>{room.icon}</span>
              <h4>{room.name}</h4>
            </div>
            <span className={`room-status ${room.status}`}>
              {room.status === 'ok' ? '● Normal' : '● Attention'}
            </span>
          </div>
          <div className="room-card-metrics">
            <div className="room-metric">
              <div className="room-metric-value" style={{
                color: room.temperature > 5 ? 'var(--warning)' : 'var(--info)'
              }}>
                {room.temperature}°C
              </div>
              <div className="room-metric-label">Température</div>
            </div>
            <div className="room-metric">
              <div className="room-metric-value">{room.humidity}%</div>
              <div className="room-metric-label">Humidité</div>
            </div>
            <div className="room-metric">
              <div className="room-metric-value">{room.capacity}%</div>
              <div className="room-metric-label">Remplissage</div>
            </div>
          </div>
        </div>
      ))}

      {/* Temperature Chart */}
      <div className="chart-container fade-in fade-in-delay-4">
        <div className="chart-header">
          <span className="chart-title">🌡️ Température (Ch. Principale)</span>
          <div className="chart-tabs">
            {['6h', '24h', '7j'].map(period => (
              <button
                key={period}
                className={`chart-tab ${chartPeriod === period ? 'active' : ''}`}
                onClick={() => setChartPeriod(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={temperatureHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis
              dataKey="time"
              stroke="#475569"
              fontSize={10}
              tickLine={false}
            />
            <YAxis
              stroke="#475569"
              fontSize={10}
              tickLine={false}
              domain={[0, 5]}
            />
            <Tooltip content={<CustomTooltip unit="°C" />} />
            <ReferenceArea y1={4} y2={5} fill="rgba(239, 68, 68, 0.08)" />
            <ReferenceLine y={4} stroke="#EF4444" strokeDasharray="5 5" strokeOpacity={0.5} />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#0EA5E9"
              strokeWidth={2}
              fill="url(#tempGradient)"
              name="Temp"
              dot={false}
              activeDot={{ r: 4, fill: '#0EA5E9' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Consumption Chart */}
      <div className="chart-container fade-in fade-in-delay-4">
        <div className="chart-header">
          <span className="chart-title">📊 Consommation vs Réapprovisionnement</span>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={consumptionHistory} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} />
            <YAxis stroke="#475569" fontSize={10} tickLine={false} />
            <Tooltip content={<CustomTooltip unit=" kg" />} />
            <Bar dataKey="consumed" name="Consommé" fill="#EF4444" radius={[4, 4, 0, 0]} opacity={0.8} />
            <Bar dataKey="restocked" name="Réappro." fill="#10B981" radius={[4, 4, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Predictions */}
      <div className="prediction-card fade-in fade-in-delay-5">
        <div className="prediction-header">
          <span className="prediction-icon">🤖</span>
          <span className="prediction-title">Prédictions IA</span>
          <span className="prediction-label">À commander</span>
        </div>
        <div className="prediction-items">
          {predictions.slice(0, 3).map((pred) => (
            <div key={pred.id} className="prediction-item">
              <div className="prediction-item-left">
                <span className="prediction-item-emoji">{pred.emoji}</span>
                <div className="prediction-item-info">
                  <span className="prediction-item-name">{pred.name}</span>
                  <span className="prediction-item-when">{pred.recommendedDate}</span>
                </div>
              </div>
              <span className="prediction-item-qty">{pred.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stock Overview — Top items to watch */}
      <div className="section-header fade-in fade-in-delay-5">
        <span className="section-title">Stock à surveiller</span>
        <button className="section-action">Tout voir</button>
      </div>

      <div className="stock-list fade-in fade-in-delay-5">
        {sortedItems.slice(0, 5).map((item) => {
          const level = getStockLevel(item);
          const expiry = getExpiryLabel(item.expiryDays);
          const pct = Math.round((item.weightCurrent / item.weightMax) * 100);
          return (
            <div key={item.id} className="stock-item">
              <div className="stock-item-icon">{item.emoji}</div>
              <div className="stock-item-info">
                <div className="stock-item-name">{item.name}</div>
                <div className="stock-item-detail">
                  {item.weightCurrent} / {item.weightMax} {item.unit}
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
      </div>
    </div>
  );
}
