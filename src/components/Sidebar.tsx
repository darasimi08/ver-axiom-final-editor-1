import React from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSyncEngine } from '../store/syncEngine';
import { useTheme } from '../ThemeContext';
import { 
  Box, 
  Cpu, 
  Layers, 
  Settings, 
  Sun, 
  Moon, 
  GalleryVerticalEnd, 
  Layout, 
  Cuboid, 
  Zap, 
  User, 
  Component,
  Spline,
  Hexagon
} from 'lucide-react';

export const Sidebar = ({ onUpgrade, onOpenPPT, onOpen3D }: { onUpgrade: () => void; onOpenPPT: () => void; onOpen3D: () => void }) => {
  const { toggleNexus, activeTool, setActiveTool } = useSyncEngine();
  const { colors, theme, toggleTheme } = useTheme();

  const toolGroups = [
    { section: 'Design', tools: [
      { icon: <Spline size={18} />, name: 'Parametric Graph', id: 'param_graph' },
      { icon: <Component size={18} />, name: 'Material Editor', id: 'material_editor' },
    ]},
    { section: 'AI', tools: [
      { icon: <Zap size={18} />, name: 'Prompt Router', id: 'llm_router' },
      { icon: <Layers size={18} />, name: 'Workflow Builder', id: 'agent_workflow' },
    ]},
    { section: 'Engine', tools: [
      { icon: <Cpu size={18} />, name: 'Z3 Constraint', id: 'z3_solver' },
      { icon: <GalleryVerticalEnd size={18} />, name: 'Timeline', id: 'nle_timeline' },
    ]},
  ];

  const Item = ({ children, active, color, onClick, title }: any) => (
    <div 
      title={title}
      onClick={onClick}
      className="premium-hover"
      style={{
        width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center',
        borderRadius: '8px', cursor: 'pointer', marginBottom: '8px',
        color: active ? (color || colors.accent) : colors.textSecondary,
        background: active ? `${color || colors.accent}15` : 'transparent',
        border: active ? `1px solid ${color || colors.accent}30` : '1px solid transparent',
        transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
      {children}
    </div>
  );

  return (
    <div style={{
      width: '56px', background: colors.bgPrimary, borderRight: `1px solid ${colors.border}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px',
      zIndex: 50, gap: '4px', position: 'relative'
    }}>
      {/* Brand */}
      <div style={{ color: colors.textPrimary, marginBottom: '24px' }}>
        <Hexagon size={24} strokeWidth={2.5} style={{ color: colors.accent }} />
      </div>

      {/* Primary Actions */}
      <Item title="Automated Slides" color={colors.accentGreen} onClick={onOpenPPT}>
        <Layout size={18} />
      </Item>
      <Item title="3D Engine" color={colors.accentYellow} onClick={onOpen3D}>
        <Cuboid size={18} />
      </Item>

      <div style={{ width: '20px', height: '1px', background: colors.border, margin: '12px 0' }} />

      {/* Dynamic Toolset */}
      {toolGroups.map(group => (
        <React.Fragment key={group.section}>
          {group.tools.map(t => (
            <Item 
              key={t.id} 
              active={activeTool === t.id} 
              onClick={() => setActiveTool(activeTool === t.id ? null : t.id)}
              title={t.name}
            >
              {t.icon}
            </Item>
          ))}
        </React.Fragment>
      ))}

      <div style={{ flex: 1 }} />

      {/* Bottom Nav */}
      <Item title="Nexus AI" color={colors.accentCyan} onClick={toggleNexus}>
        <Box size={18} />
      </Item>

      <Item title="Toggle Theme" onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </Item>

      <Item title="Beta Account" onClick={() => { const p = new GoogleAuthProvider(); signInWithPopup(auth, p); }}>
        <User size={18} />
      </Item>

      <Item title="System Settings">
        <Settings size={18} />
      </Item>
      
      <div style={{ height: '12px' }} />
    </div>
  );
};
