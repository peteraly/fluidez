import React, { useState, useEffect } from 'react';

/**
 * PracticePartners
 * 
 * Connect learners for mutual practice and accountability.
 * - Find partners at similar levels
 * - Schedule practice sessions
 * - Track partner activities
 * 
 * Design principles:
 * - Low pressure connections
 * - Mutual benefit focus
 * - Privacy-first approach
 * - Celebrate together
 */

const theme = {
  primary: '#2D5A27',
  primaryLight: '#4A7C43',
  bg: '#FAFAFA',
  surface: '#FFF',
  text: '#1A1A1A',
  textLight: '#666',
  border: '#E0E0E0',
  success: '#4CAF50',
  accent: '#FF6B35'
};

// Simulated partner profiles (in real app, this would come from a backend)
const SAMPLE_PARTNERS = [
  {
    id: 'p1',
    name: 'Alex M.',
    avatar: '👨‍💻',
    level: 'Beginner',
    streak: 12,
    interests: ['Travel', 'Food', 'Music'],
    timezone: 'PST',
    bio: 'Software developer learning Spanish for travel to South America!',
    practiceTimes: ['Evenings', 'Weekends'],
    languages: { native: 'English', learning: 'Spanish' }
  },
  {
    id: 'p2',
    name: 'Sofia R.',
    avatar: '👩‍🎨',
    level: 'Intermediate',
    streak: 45,
    interests: ['Art', 'Movies', 'Books'],
    timezone: 'EST',
    bio: 'Artist who wants to read Spanish literature in original.',
    practiceTimes: ['Mornings', 'Afternoons'],
    languages: { native: 'English', learning: 'Spanish' }
  },
  {
    id: 'p3',
    name: 'Jordan K.',
    avatar: '👨‍🍳',
    level: 'Beginner',
    streak: 7,
    interests: ['Cooking', 'Sports', 'Travel'],
    timezone: 'CST',
    bio: 'Chef learning Spanish to communicate with kitchen staff.',
    practiceTimes: ['Late nights', 'Mornings'],
    languages: { native: 'English', learning: 'Spanish' }
  },
  {
    id: 'p4',
    name: 'Maria L.',
    avatar: '👩‍⚕️',
    level: 'Intermediate',
    streak: 30,
    interests: ['Healthcare', 'Family', 'Culture'],
    timezone: 'EST',
    bio: 'Nurse wanting to better serve Spanish-speaking patients.',
    practiceTimes: ['Evenings', 'Weekends'],
    languages: { native: 'English', learning: 'Spanish' }
  }
];

// Get partner data from localStorage
function getPartnerData() {
  return JSON.parse(localStorage.getItem('fluidez_partners') || JSON.stringify({
    connections: [],
    pendingRequests: [],
    sentRequests: [],
    profile: null
  }));
}

// Save partner data
function savePartnerData(data) {
  localStorage.setItem('fluidez_partners', JSON.stringify(data));
}

export default function PracticePartners({ onBack }) {
  const [activeTab, setActiveTab] = useState('discover');
  const [partnerData, setPartnerData] = useState(getPartnerData());
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [filterLevel, setFilterLevel] = useState('all');

  useEffect(() => {
    // Check if user has set up their profile
    if (!partnerData.profile) {
      setShowProfileSetup(true);
    }
  }, [partnerData.profile]);

  const handleConnect = (partnerId) => {
    const updated = { ...partnerData };
    if (!updated.sentRequests.includes(partnerId)) {
      updated.sentRequests.push(partnerId);
      savePartnerData(updated);
      setPartnerData(updated);
    }
    setSelectedPartner(null);
  };

  const handleAccept = (partnerId) => {
    const updated = { ...partnerData };
    updated.pendingRequests = updated.pendingRequests.filter(id => id !== partnerId);
    if (!updated.connections.includes(partnerId)) {
      updated.connections.push(partnerId);
    }
    savePartnerData(updated);
    setPartnerData(updated);
  };

  const handleSaveProfile = (profile) => {
    const updated = { ...partnerData, profile };
    savePartnerData(updated);
    setPartnerData(updated);
    setShowProfileSetup(false);
  };

  const availablePartners = SAMPLE_PARTNERS.filter(p => 
    !partnerData.connections.includes(p.id) &&
    !partnerData.sentRequests.includes(p.id) &&
    (filterLevel === 'all' || p.level.toLowerCase() === filterLevel)
  );

  const connectedPartners = SAMPLE_PARTNERS.filter(p => 
    partnerData.connections.includes(p.id)
  );

  // Profile setup modal
  if (showProfileSetup) {
    return (
      <ProfileSetup 
        onSave={handleSaveProfile} 
        onSkip={() => setShowProfileSetup(false)}
        existingProfile={partnerData.profile}
      />
    );
  }

  // Partner detail view
  if (selectedPartner) {
    const isConnected = partnerData.connections.includes(selectedPartner.id);
    const isPending = partnerData.sentRequests.includes(selectedPartner.id);
    
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={() => setSelectedPartner(null)} style={styles.backBtn}>←</button>
          <h2 style={styles.title}>Partner Profile</h2>
          <div style={{ width: 40 }} />
        </div>

        <div style={styles.content}>
          <div style={styles.profileCard}>
            <div style={styles.profileAvatar}>{selectedPartner.avatar}</div>
            <h3 style={styles.profileName}>{selectedPartner.name}</h3>
            <div style={styles.profileLevel}>{selectedPartner.level}</div>
            <div style={styles.profileStreak}>🔥 {selectedPartner.streak} day streak</div>
          </div>

          <div style={styles.section}>
            <p style={styles.bio}>{selectedPartner.bio}</p>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Interests</h4>
            <div style={styles.tagsRow}>
              {selectedPartner.interests.map((interest, i) => (
                <span key={i} style={styles.tag}>{interest}</span>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Availability</h4>
            <div style={styles.infoRow}>
              <span>🕐 Timezone:</span>
              <span>{selectedPartner.timezone}</span>
            </div>
            <div style={styles.infoRow}>
              <span>📅 Prefers:</span>
              <span>{selectedPartner.practiceTimes.join(', ')}</span>
            </div>
          </div>

          {!isConnected && !isPending && (
            <button 
              onClick={() => handleConnect(selectedPartner.id)}
              style={styles.connectBtn}
            >
              🤝 Send Connection Request
            </button>
          )}
          
          {isPending && (
            <div style={styles.pendingBadge}>
              ⏳ Request Sent - Waiting for response
            </div>
          )}

          {isConnected && (
            <div style={styles.connectedSection}>
              <div style={styles.connectedBadge}>✓ Connected!</div>
              <button style={styles.messageBtn}>💬 Send Message</button>
              <button style={styles.scheduleBtn}>📅 Schedule Practice</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Main view
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Practice Partners</h2>
        <button 
          onClick={() => setShowProfileSetup(true)} 
          style={styles.profileBtn}
        >
          👤
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button 
          onClick={() => setActiveTab('discover')}
          style={{ ...styles.tab, ...(activeTab === 'discover' ? styles.tabActive : {}) }}
        >
          🔍 Discover
        </button>
        <button 
          onClick={() => setActiveTab('connections')}
          style={{ ...styles.tab, ...(activeTab === 'connections' ? styles.tabActive : {}) }}
        >
          🤝 My Partners ({connectedPartners.length})
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'discover' && (
          <>
            {/* Filter */}
            <div style={styles.filterRow}>
              <span style={{ fontSize: 14, color: theme.textLight }}>Level:</span>
              {['all', 'beginner', 'intermediate'].map(level => (
                <button
                  key={level}
                  onClick={() => setFilterLevel(level)}
                  style={{
                    ...styles.filterBtn,
                    ...(filterLevel === level ? styles.filterBtnActive : {})
                  }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>

            {/* Partner cards */}
            {availablePartners.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={{ fontSize: 48 }}>🎉</span>
                <p>You've connected with everyone available!</p>
                <p style={{ fontSize: 13, color: theme.textLight }}>
                  Check back later for new partners.
                </p>
              </div>
            ) : (
              availablePartners.map(partner => (
                <div 
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  style={styles.partnerCard}
                >
                  <div style={styles.partnerAvatar}>{partner.avatar}</div>
                  <div style={styles.partnerInfo}>
                    <div style={styles.partnerName}>{partner.name}</div>
                    <div style={styles.partnerMeta}>
                      {partner.level} • 🔥 {partner.streak} days
                    </div>
                    <div style={styles.partnerInterests}>
                      {partner.interests.slice(0, 2).join(', ')}
                    </div>
                  </div>
                  <span style={styles.arrow}>→</span>
                </div>
              ))
            )}
          </>
        )}

        {activeTab === 'connections' && (
          <>
            {connectedPartners.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={{ fontSize: 48 }}>👥</span>
                <p>No partners yet!</p>
                <p style={{ fontSize: 13, color: theme.textLight }}>
                  Browse the Discover tab to find practice partners.
                </p>
              </div>
            ) : (
              connectedPartners.map(partner => (
                <div 
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner)}
                  style={styles.partnerCard}
                >
                  <div style={styles.partnerAvatar}>{partner.avatar}</div>
                  <div style={styles.partnerInfo}>
                    <div style={styles.partnerName}>{partner.name}</div>
                    <div style={styles.partnerMeta}>
                      {partner.level} • 🔥 {partner.streak} days
                    </div>
                  </div>
                  <div style={styles.connectedDot}>●</div>
                </div>
              ))
            )}
          </>
        )}

        {/* Info card */}
        <div style={styles.infoCard}>
          <h4 style={{ margin: '0 0 8px' }}>💡 Why Practice Partners?</h4>
          <ul style={styles.infoList}>
            <li>Accountability keeps you consistent</li>
            <li>Practice conversations feel more natural</li>
            <li>Learn from each other's progress</li>
            <li>Celebrate wins together!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Profile setup component
function ProfileSetup({ onSave, onSkip, existingProfile }) {
  const [profile, setProfile] = useState(existingProfile || {
    name: '',
    avatar: '😊',
    level: 'Beginner',
    interests: [],
    timezone: 'EST',
    bio: '',
    practiceTimes: []
  });

  const avatars = ['😊', '🙂', '😎', '🤓', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍🍳', '👩‍🍳', '👨‍⚕️', '👩‍⚕️'];
  const interestOptions = ['Travel', 'Food', 'Music', 'Movies', 'Books', 'Sports', 'Art', 'Tech', 'Culture', 'Business'];
  const timeOptions = ['Mornings', 'Afternoons', 'Evenings', 'Late nights', 'Weekends'];

  const toggleInterest = (interest) => {
    const current = profile.interests || [];
    if (current.includes(interest)) {
      setProfile({ ...profile, interests: current.filter(i => i !== interest) });
    } else if (current.length < 5) {
      setProfile({ ...profile, interests: [...current, interest] });
    }
  };

  const toggleTime = (time) => {
    const current = profile.practiceTimes || [];
    if (current.includes(time)) {
      setProfile({ ...profile, practiceTimes: current.filter(t => t !== time) });
    } else {
      setProfile({ ...profile, practiceTimes: [...current, time] });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={onSkip} style={styles.backBtn}>←</button>
        <h2 style={styles.title}>Your Profile</h2>
        <div style={{ width: 40 }} />
      </div>

      <div style={styles.content}>
        <p style={{ color: theme.textLight, marginBottom: 20 }}>
          Set up your profile so partners can find you!
        </p>

        {/* Avatar */}
        <div style={styles.formSection}>
          <label style={styles.label}>Choose Avatar</label>
          <div style={styles.avatarGrid}>
            {avatars.map(a => (
              <button
                key={a}
                onClick={() => setProfile({ ...profile, avatar: a })}
                style={{
                  ...styles.avatarOption,
                  ...(profile.avatar === a ? styles.avatarSelected : {})
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div style={styles.formSection}>
          <label style={styles.label}>Display Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="e.g., Alex M."
            style={styles.input}
          />
        </div>

        {/* Level */}
        <div style={styles.formSection}>
          <label style={styles.label}>Spanish Level</label>
          <div style={styles.levelRow}>
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <button
                key={level}
                onClick={() => setProfile({ ...profile, level })}
                style={{
                  ...styles.levelBtn,
                  ...(profile.level === level ? styles.levelBtnActive : {})
                }}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div style={styles.formSection}>
          <label style={styles.label}>Interests (max 5)</label>
          <div style={styles.tagsGrid}>
            {interestOptions.map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                style={{
                  ...styles.tagBtn,
                  ...(profile.interests?.includes(interest) ? styles.tagBtnActive : {})
                }}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Practice times */}
        <div style={styles.formSection}>
          <label style={styles.label}>When do you practice?</label>
          <div style={styles.tagsGrid}>
            {timeOptions.map(time => (
              <button
                key={time}
                onClick={() => toggleTime(time)}
                style={{
                  ...styles.tagBtn,
                  ...(profile.practiceTimes?.includes(time) ? styles.tagBtnActive : {})
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div style={styles.formSection}>
          <label style={styles.label}>Short Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Why are you learning Spanish?"
            style={styles.textarea}
            maxLength={150}
          />
        </div>

        <button 
          onClick={() => onSave(profile)}
          style={styles.saveBtn}
          disabled={!profile.name}
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}

// Export utility
export function getPartnerCount() {
  const data = getPartnerData();
  return data.connections.length;
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '0 auto',
    minHeight: '100vh',
    background: theme.bg,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  header: {
    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`,
    color: '#fff',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: { margin: 0, fontSize: 18, fontWeight: 600 },
  backBtn: { background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' },
  profileBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 18, cursor: 'pointer' },
  tabs: { display: 'flex', background: theme.surface, borderBottom: `1px solid ${theme.border}` },
  tab: { flex: 1, padding: 14, border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, color: theme.textLight },
  tabActive: { color: theme.primary, fontWeight: 600, borderBottom: `2px solid ${theme.primary}` },
  content: { padding: 20 },
  filterRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  filterBtn: { padding: '6px 12px', border: `1px solid ${theme.border}`, borderRadius: 20, background: theme.surface, cursor: 'pointer', fontSize: 13 },
  filterBtnActive: { background: theme.primary, color: '#fff', borderColor: theme.primary },
  partnerCard: { display: 'flex', alignItems: 'center', gap: 14, background: theme.surface, padding: 16, borderRadius: 14, border: `1px solid ${theme.border}`, marginBottom: 12, cursor: 'pointer' },
  partnerAvatar: { fontSize: 36 },
  partnerInfo: { flex: 1 },
  partnerName: { fontWeight: 600, marginBottom: 2 },
  partnerMeta: { fontSize: 13, color: theme.textLight, marginBottom: 2 },
  partnerInterests: { fontSize: 12, color: theme.primary },
  arrow: { color: theme.textLight, fontSize: 18 },
  connectedDot: { color: theme.success, fontSize: 12 },
  emptyState: { textAlign: 'center', padding: 40 },
  infoCard: { background: '#E8F5E9', padding: 16, borderRadius: 12, marginTop: 20 },
  infoList: { margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 1.8 },
  profileCard: { background: theme.surface, padding: 30, borderRadius: 16, textAlign: 'center', marginBottom: 20, border: `1px solid ${theme.border}` },
  profileAvatar: { fontSize: 64, marginBottom: 12 },
  profileName: { margin: '0 0 4px', fontSize: 22 },
  profileLevel: { color: theme.primary, fontWeight: 600, marginBottom: 4 },
  profileStreak: { color: theme.textLight, fontSize: 14 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 600, marginBottom: 10, color: theme.textLight },
  bio: { margin: 0, lineHeight: 1.6, fontSize: 15 },
  tagsRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  tag: { background: '#E8F5E9', color: theme.primary, padding: '6px 12px', borderRadius: 20, fontSize: 13 },
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${theme.border}`, fontSize: 14 },
  connectBtn: { width: '100%', padding: 16, background: theme.primary, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 20 },
  pendingBadge: { textAlign: 'center', padding: 16, background: '#FFF3E0', borderRadius: 12, marginTop: 20, color: '#E65100' },
  connectedSection: { marginTop: 20 },
  connectedBadge: { textAlign: 'center', padding: 12, background: '#E8F5E9', borderRadius: 10, color: theme.success, fontWeight: 600, marginBottom: 12 },
  messageBtn: { width: '100%', padding: 14, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, fontSize: 15, cursor: 'pointer', marginBottom: 10 },
  scheduleBtn: { width: '100%', padding: 14, background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  // Form styles
  formSection: { marginBottom: 20 },
  label: { display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: theme.text },
  input: { width: '100%', padding: 12, border: `1px solid ${theme.border}`, borderRadius: 10, fontSize: 15, boxSizing: 'border-box' },
  textarea: { width: '100%', padding: 12, border: `1px solid ${theme.border}`, borderRadius: 10, fontSize: 15, minHeight: 80, resize: 'none', boxSizing: 'border-box' },
  avatarGrid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  avatarOption: { width: 44, height: 44, borderRadius: 22, border: `2px solid ${theme.border}`, background: theme.surface, fontSize: 24, cursor: 'pointer' },
  avatarSelected: { borderColor: theme.primary, background: '#E8F5E9' },
  levelRow: { display: 'flex', gap: 8 },
  levelBtn: { flex: 1, padding: 12, border: `1px solid ${theme.border}`, borderRadius: 10, background: theme.surface, cursor: 'pointer', fontSize: 14 },
  levelBtnActive: { background: theme.primary, color: '#fff', borderColor: theme.primary },
  tagsGrid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  tagBtn: { padding: '8px 14px', border: `1px solid ${theme.border}`, borderRadius: 20, background: theme.surface, cursor: 'pointer', fontSize: 13 },
  tagBtnActive: { background: theme.primary, color: '#fff', borderColor: theme.primary },
  saveBtn: { width: '100%', padding: 16, background: theme.primary, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 10 }
};
