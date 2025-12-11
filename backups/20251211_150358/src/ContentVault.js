import React, { useState, useEffect } from 'react';

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

export default function ContentVault({ onBack }) {
  const [items, setItems] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('fluidez_vault');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const save = (newItems) => {
    setItems(newItems);
    localStorage.setItem('fluidez_vault', JSON.stringify(newItems));
  };

  const addItem = () => {
    if (!title.trim() || !content.trim()) return;
    save([...items, { id: Date.now(), title: title.trim(), content: content.trim(), date: new Date().toLocaleDateString() }]);
    setTitle('');
    setContent('');
    setShowAdd(false);
  };

  const deleteItem = (id) => save(items.filter(i => i.id !== id));

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Content Vault</h2>
        <button onClick={() => setShowAdd(true)} style={styles.addBtn}>+</button>
      </div>
      <div style={styles.content}>
        <p style={{ textAlign: 'center', color: theme.textLight, marginBottom: 20 }}>Save Spanish content to practice later</p>
        {items.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={{ fontSize: 48 }}>📚</span>
            <p>No content saved yet</p>
            <button onClick={() => setShowAdd(true)} style={styles.primaryBtn}>+ Add Content</button>
          </div>
        ) : (
          <div style={styles.itemList}>
            {items.map(item => (
              <div key={item.id} style={styles.itemCard}>
                <div style={styles.itemHeader}>
                  <h3 style={styles.itemTitle}>{item.title}</h3>
                  <button onClick={() => deleteItem(item.id)} style={styles.deleteBtn}>🗑️</button>
                </div>
                <p style={styles.itemPreview}>{item.content.slice(0, 100)}...</p>
                <span style={styles.itemDate}>{item.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {showAdd && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={{ margin: '0 0 16px' }}>Add Content</h3>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" style={styles.input} />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste Spanish text here..." style={styles.textarea} rows={6} />
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowAdd(false)} style={styles.secondaryBtn}>Cancel</button>
              <button onClick={addItem} style={styles.primaryBtn}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  header: { background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { margin: 0, fontSize: 18 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer' },
  addBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', fontSize: 24, width: 36, height: 36, borderRadius: '50%', cursor: 'pointer' },
  content: { padding: 20 },
  emptyState: { textAlign: 'center', padding: 40, color: theme.textLight },
  primaryBtn: { background: theme.primary, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', flex: 1 },
  secondaryBtn: { background: theme.surface, color: theme.text, border: `1px solid ${theme.border}`, padding: '12px 24px', borderRadius: 12, fontSize: 16, cursor: 'pointer', flex: 1 },
  itemList: { display: 'flex', flexDirection: 'column', gap: 12 },
  itemCard: { background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 12, padding: 16 },
  itemHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  itemTitle: { margin: 0, fontSize: 16 },
  deleteBtn: { background: 'none', border: 'none', fontSize: 18, cursor: 'pointer' },
  itemPreview: { margin: '0 0 8px', fontSize: 14, color: theme.textLight },
  itemDate: { fontSize: 12, color: theme.textLight },
  modal: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  modalContent: { background: theme.surface, borderRadius: 16, padding: 24, width: '100%', maxWidth: 400 },
  input: { width: '100%', padding: 12, fontSize: 16, border: `1px solid ${theme.border}`, borderRadius: 8, marginBottom: 12, boxSizing: 'border-box' },
  textarea: { width: '100%', padding: 12, fontSize: 16, border: `1px solid ${theme.border}`, borderRadius: 8, marginBottom: 16, boxSizing: 'border-box', resize: 'vertical' }
};
