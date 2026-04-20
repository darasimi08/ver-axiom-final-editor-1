import React, { useState } from 'react';
import { useSyncEngine } from '../store/syncEngine';
import { useTheme } from '../ThemeContext';
import { Sparkles, Terminal, Send, Cpu, Zap, Globe, MessageSquare, History } from 'lucide-react';

export const ChatPanel = () => {
  const { chatHistory, sendChatCommand } = useSyncEngine();
  const { colors } = useTheme();
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'assistant' | 'history'>('assistant');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    // Simulate natural delay for non-tech users to feel the "AI thinking"
    setTimeout(() => {
      sendChatCommand(input);
      setInput('');
      setIsGenerating(false);
    }, 600);
  };

  const Tab = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      style={{
        flex: 1, padding: '12px 0', background: 'transparent',
        border: 'none', borderBottom: activeTab === id ? `2px solid ${colors.accent}` : '2px solid transparent',
        color: activeTab === id ? colors.textPrimary : colors.textMuted,
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        fontSize: '0.75rem', fontWeight: 600, transition: '0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
      <Icon size={14} />
      {label}
    </button>
  );

  return (
    <aside style={{ width: '340px', borderRight: `1px solid ${colors.border}`, background: colors.bgCanvas, display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', padding: '20px 24px', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', background: `${colors.accent}15`, borderRadius: '12px' }}>
             <Sparkles size={18} style={{ color: colors.accent }} />
          </div>
          <div>
            <h3 style={{ margin: 0, color: colors.textPrimary, fontSize: '0.9rem', fontWeight: 700 }}>Axiom Assistant</h3>
            <div style={{ fontSize: '0.65rem', color: colors.accentGreen, fontWeight: 700 }}>● ONLINE — EDGE_ID: 01</div>
          </div>
        </div>
        <div style={{ display: 'flex', background: colors.bgSecondary }}>
          <Tab id="assistant" icon={MessageSquare} label="Ask" />
          <Tab id="history" icon={History} label="History" />
        </div>
      </header>

      <div style={{ flex: 1, p: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        {activeTab === 'assistant' ? (
          <div style={{ p: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
             {/* Simple Prompt Area */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.textSecondary }}>What are we designing?</div>
                <textarea 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  placeholder="Describe your design or ask for a slide..."
                  style={{ 
                    width: '100%', height: '120px', background: colors.inputBg, border: `1px solid ${colors.inputBorder}`, 
                    borderRadius: '12px', padding: '16px', color: colors.textPrimary, fontSize: '0.85rem', 
                    resize: 'none', outline: 'none', lineHeight: 1.6
                  }} 
                />
             </div>

             {/* Simple Local/Cloud Toggle */}
             <div className="glass" style={{ padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Zap size={16} style={{ color: colors.accentYellow }} />
                <div style={{ flex: 1 }}>
                   <div style={{ fontSize: '0.75rem', fontWeight: 700 }}>Run Locally</div>
                   <div style={{ fontSize: '0.65rem', color: colors.textMuted }}>Uses your CPU — Saves bandwidth</div>
                </div>
                <div style={{ width: '36px', height: '20px', background: colors.accent, borderRadius: '20px', position: 'relative', cursor: 'pointer' }}>
                   <div style={{ width: '14px', height: '14px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '3px', right: '3px' }} />
                </div>
             </div>

             <div style={{ flex: 1 }} />
             
             <button 
               onClick={handleSend}
               disabled={isGenerating || !input.trim()}
               className="premium-hover"
               style={{ 
                 width: '100%', padding: '14px', background: colors.accent, color: '#fff', border: 'none', 
                 borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', 
                 alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.85rem'
               }}
             >
               {isGenerating ? <Zap size={16} className="spinning" /> : <Send size={16} />}
               {isGenerating ? 'Thinking...' : 'Start Creation'}
             </button>
          </div>
        ) : (
          <div style={{ p: '24px', flex: 1, color: colors.textMuted, fontSize: '0.8rem', textAlign: 'center', pt: '100px' }}>
             Your recent designs will appear here.
          </div>
        )}
      </div>
    </aside>
  );
};
