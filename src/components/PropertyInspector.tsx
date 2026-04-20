import React from 'react';
import { useSyncEngine } from '../store/syncEngine';
import { useTheme } from '../ThemeContext';
import { Sliders, Type, Move, Image as ImageIcon, ShieldCheck, ChevronRight } from 'lucide-react';
import type { TextNode, ShapeNode } from '../types/engine';

export const PropertyInspector = () => {
  const { nodes, selectedNodeIds, applyManualEdit } = useSyncEngine();
  const { colors } = useTheme();

  if (selectedNodeIds.length === 0) {
    return (
      <aside style={{ width: '320px', background: colors.bgSecondary, borderLeft: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: '40px', textAlign: 'center' }}>
        <Sliders size={32} style={{ color: colors.border, marginBottom: '16px' }} />
        <div style={{ color: colors.textMuted, fontSize: '0.8rem', fontWeight: 500 }}>Select an element to inspect its properties.</div>
      </aside>
    );
  }

  const node = nodes[selectedNodeIds[0]];
  if (!node) return null;

  const Input = ({ label, value, onChange, type = "number", step = 1, min, max }: any) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '0.65rem', fontWeight: 600, color: colors.textMuted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</label>
      <input 
        type={type} value={value} step={step} min={min} max={max}
        onChange={e => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        style={{
          width: '100%', background: colors.inputBg, border: `1px solid ${colors.inputBorder}`,
          color: colors.textPrimary, padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem',
          outline: 'none', transition: 'border-color 0.3s'
        }}
      />
    </div>
  );

  return (
    <aside style={{ width: '320px', background: colors.bgSecondary, borderLeft: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '-0.01em', margin: 0 }}>Design</h3>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: colors.accent, background: `${colors.accent}10`, padding: '4px 8px', borderRadius: '4px' }}>{node.type}</div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px' }}>
        {/* Transform Section */}
        <section style={{ marginBottom: '32px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
             <Move size={14} style={{ color: colors.textMuted }} />
             <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Alignment</span>
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Input label="X" value={Math.round(node.x)} onChange={(v: any) => applyManualEdit(node.id, { x: v })} />
              <Input label="Y" value={Math.round(node.y)} onChange={(v: any) => applyManualEdit(node.id, { y: v })} />
              <Input label="Width" value={Math.round(node.width)} onChange={(v: any) => applyManualEdit(node.id, { width: v })} />
              <Input label="Height" value={Math.round(node.height)} onChange={(v: any) => applyManualEdit(node.id, { height: v })} />
           </div>
        </section>

        {/* Text Section */}
        {node.type === 'TEXT' && (
          <section style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Type size={14} style={{ color: colors.textMuted }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Typography</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input label="Content" type="text" value={(node as TextNode).textProps.text} onChange={(v: any) => applyManualEdit(node.id, { textProps: { text: v } })} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input label="Size" value={(node as TextNode).textProps.fontSize} onChange={(v: any) => applyManualEdit(node.id, { textProps: { fontSize: v } })} />
                <Input label="Weight" step={100} min={100} max={900} value={(node as TextNode).textProps.fontWeight} onChange={(v: any) => applyManualEdit(node.id, { textProps: { fontWeight: v } })} />
              </div>
            </div>
          </section>
        )}

        {/* AI Verification */}
        <div className="glass premium-hover" style={{ 
          marginTop: '20px', padding: '16px', borderRadius: '12px', display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', gap: '12px', border: `1px solid ${colors.accentGreen}20` 
        }}>
          <ShieldCheck size={20} style={{ color: colors.accentGreen }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: colors.accentGreen, textTransform: 'uppercase' }}>AXIOM Verified</div>
            <div style={{ fontSize: '0.65rem', color: colors.textMuted }}>Constraint solver active</div>
          </div>
          <ChevronRight size={14} style={{ color: colors.textMuted }} />
        </div>
      </div>
    </aside>
  );
};
