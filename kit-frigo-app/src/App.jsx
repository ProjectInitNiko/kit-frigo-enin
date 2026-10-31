import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Stock from './pages/Stock';
import Commandes from './pages/Commandes';
import Alertes from './pages/Alertes';
import Parametres from './pages/Parametres';
import { alerts } from './data/mockData';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Accueil', icon: '🏠' },
  { id: 'stock', label: 'Stock', icon: '📦' },
  { id: 'commandes', label: 'Commandes', icon: '🛒' },
  { id: 'alertes', label: 'Alertes', icon: '🔔' },
  { id: 'parametres', label: 'Réglages', icon: '⚙️' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const activeAlerts = alerts.filter(a => !a.acknowledged).length;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'stock': return <Stock />;
      case 'commandes': return <Commandes />;
      case 'alertes': return <Alertes />;
      case 'parametres': return <Parametres />;
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard': return { title: 'Kit Frigo', subtitle: 'Gestion intelligente' };
      case 'stock': return { title: 'Inventaire', subtitle: 'Stock en temps réel' };
      case 'commandes': return { title: 'Commandes', subtitle: 'Suggestions IA' };
      case 'alertes': return { title: 'Alertes', subtitle: `${activeAlerts} active${activeAlerts > 1 ? 's' : ''}` };
      case 'parametres': return { title: 'Paramètres', subtitle: 'Configuration' };
      default: return { title: 'Kit Frigo', subtitle: '' };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-top">
          <div className="header-brand">
            <div className="header-logo">❄️</div>
            <div>
              <div className="header-title">{pageInfo.title}</div>
              <div className="header-subtitle">{pageInfo.subtitle}</div>
            </div>
          </div>
          <div className="header-actions">
            <button
              className="icon-btn"
              onClick={() => setCurrentPage('alertes')}
            >
              🔔
              {activeAlerts > 0 && <span className="badge"></span>}
            </button>
            <button
              className="icon-btn"
              onClick={() => setCurrentPage('parametres')}
            >
              👤
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      {renderPage()}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => setCurrentPage(item.id)}
          >
            <span className="nav-icon" style={{ position: 'relative' }}>
              {item.icon}
              {item.id === 'alertes' && activeAlerts > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-6px',
                  width: '16px',
                  height: '16px',
                  background: 'var(--danger)',
                  borderRadius: '50%',
                  fontSize: '0.5625rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  border: '2px solid var(--bg-primary)',
                }}>
                  {activeAlerts}
                </span>
              )}
            </span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
