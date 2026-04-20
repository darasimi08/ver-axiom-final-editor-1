import React, { useEffect } from 'react';
import { useSyncEngine } from '../store/syncEngine';
import { useTheme } from '../ThemeContext';
import { DraggableNode } from './DraggableNode';
import { 
  Pointer, 
  Hand, 
  MousePointer2, 
  Pencil, 
  Eraser, 
  Type, 
  Square, 
  Circle, 
  Star, 
  Sparkles,
  Command,
  Maximize2
} from 'lucide-react';

export const LivePreview: React.FC = () => {
  const { slides, nodes, activeSlideId, connect, setSelectedNode } = useSyncEngine();
  const { colors } = useTheme();
  const activeSlide = activeSlideId ? slides[activeSlideId] : null;

  useEffect(() => { connect(); }, [connect]);

  const TooltipButton = ({ icon: Icon, active, disabled, isAI, label }: any) => (
    <div title={label} style={{
      width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: '8px', cursor: disabled ? 'not-allowed' : 'pointer',
      color: active ? colors.accent : isAI ? colors.accentCyan : colors.textSecondary,
      background: active ? `${colors.accent}15` : isAI ? `${colors.accentCyan}10` : 'transparent',
      opacity: disabled ? 0.3 : 1,
      transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      border: active ? `1px solid ${colors.accent}30` : '1px solid transparent'
    }}>
      <Icon size={16} strokeWidth={2.3} />
    </div>
  );

  return (
    <div
      onPointerDown={() => setSelectedNode(null)}
      style={{ 
        width: '100%', height: '100%', position: 'relative', overflow: 'hidden', 
        background: colors.bgCanvas, 
        backgroundImage: `radial-gradient(${colors.border} 1px, transparent 0)`, 
        backgroundSize: '32px 32px',
      }}
    >
      {/* Top Status Indicators */}
      <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'flex', gap: '12px', zIndex: 10 }}>
        <div className="glass" style={{ padding: '6px 12px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', fontWeight: 600, color: colors.textSecondary, letterSpacing: '0.05em' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.accentGreen, boxShadow: `0 0 10px ${colors.accentGreen}` }} />
          AXIOM_NODE_COMPUTE_ID: 08A
        </div>
      </div>

      {/* Floating Header Toolbar */}
      <div style={{ 
        position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', 
        zIndex: 10, display: 'flex', alignItems: 'center', gap: '4px',
        background: 'rgba(10, 10, 13, 0.8)', padding: '4px', borderRadius: '12px',
        border: `1px solid ${colors.border}`, backdropFilter: 'blur(16px)'
      }}>
         <TooltipButton icon={MousePointer2} active label="Selection Tool (V)" />
         <TooltipButton icon={Hand} label="Pan View (H)" />
         <div style={{ width: '1px', height: '16px', background: colors.border, margin: '0 6px' }} />
         <TooltipButton icon={Pencil} label="Draw Tool (B)" />
         <TooltipButton icon={Square} label="Rectangle (R)" />
         <TooltipButton icon={Circle} label="Circle (O)" />
         <TooltipButton icon={Type} label="Text (T)" />
         <div style={{ width: '1px', height: '16px', background: colors.border, margin: '0 6px' }} />
         <TooltipButton icon={Sparkles} isAI label="Generative Fill" />
         <TooltipButton icon={Maximize2} label="Fullscreen Preview" />
      </div>

      {/* Main Canvas Container */}
      <div style={{ 
        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '80px', boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%', maxWidth: '960px', aspectRatio: '16/9', background: '#ffffff',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 20px rgba(0,0,0,0.2)', 
          overflow: 'hidden', borderRadius: '4px', position: 'relative',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {activeSlide && activeSlide.children.map(nodeId => {
            const node = nodes[nodeId];
            if (!node) return null;
            return <DraggableNode key={node.id} node={node} />;
          })}
        </div>
      </div>

      {/* Bottom Shortcuts Info */}
      <div style={{ position: 'absolute', bottom: '24px', right: '24px', display: 'flex', gap: '8px' }}>
         <div className="glass" style={{ padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.6rem', fontWeight: 600, color: colors.textSecondary }}>
            <Command size={12} />
            K FOR NODE GRAPH
         </div>
      </div>
    </div>
  );
};
