import React from 'react';
import { useTheme } from '../ThemeContext';
import { Check, X, ShieldCheck, Zap, Globe, Package } from 'lucide-react';

const plans = [
  {
    id: 'PRO_LOCAL', 
    name: 'Standard Engine', 
    description: 'Perfect for local designing and privacy.',
    icon: Package,
    color: '#00d2ff',
    features: ['Unlimited Local Creation', 'Local 3D Engine', 'Privacy-First Logic', 'Standard Quality Export']
  },
  {
    id: 'PRO_CLOUD', 
    name: 'Professional', 
    description: 'High-speed AI and cloud-powered insights.',
    icon: Zap,
    color: '#7928CA', 
    featured: true,
    features: ['Gemini Vision Analysis', 'Advanced Layout Logic', 'Cloud Acceleration', '4K Presentation Export']
  },
  {
    id: 'PRO_MAX', 
    name: 'Enterprise', 
    description: 'The ultimate collaboration suite for teams.',
    icon: Globe,
    color: '#ffbd2e',
    features: ['Unlimited Global API', 'Team Collaboration', 'Custom Domain Sync', 'Priority Node Support']
  }
];

export const SubscriptionPlans = ({ onClose }: { onClose: () => void }) => {
  const { colors } = useTheme();

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(5, 5, 7, 0.98)', zIndex: 1000, display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, sans-serif', backdropFilter: 'blur(20px)'
    }}>
      <div 
        style={{ position: 'absolute', top: '40px', right: '40px', cursor: 'pointer', color: '#fff', opacity: 0.5 }} 
        onClick={onClose}
        className="premium-hover"
      >
        <X size={24} />
      </div>

      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'inline-flex', padding: '6px 16px', background: `${colors.accentGreen}15`, borderRadius: '30px', color: colors.accentGreen, fontSize: '0.7rem', fontWeight: 800, marginBottom: '24px', border: `1px solid ${colors.accentGreen}30` }}>
           AXIOM v2.0 BETA PROGRAM ACTIVE
        </div>
        <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 12px 0' }}>One platform. Every tool unlocked.</h2>
        <p style={{ color: colors.textSecondary, fontSize: '1rem', fontWeight: 500 }}>The future of AI design is here. Enjoy unlimited access during our beta.</p>
      </header>

      <div style={{ display: 'flex', gap: '24px', maxWidth: '1100px', width: '100%', padding: '0 40px' }}>
        {plans.map(plan => (
          <div key={plan.id} style={{
            flex: 1, background: 'rgba(255,255,255,0.03)', border: `1px solid ${plan.featured ? plan.color : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column',
            position: 'relative', transition: '0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: plan.featured ? `0 20px 80px ${plan.color}20` : 'none'
          }} className="premium-hover">
            {plan.featured && (
              <div style={{ position: 'absolute', top: '24px', right: '24px', color: plan.color }}>
                <ShieldCheck size={24} />
              </div>
            )}

            <div style={{ padding: '12px', background: `${plan.color}15`, borderRadius: '12px', width: 'fit-content', marginBottom: '24px' }}>
               <plan.icon size={24} style={{ color: plan.color }} />
            </div>

            <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, margin: '0 0 8px 0' }}>{plan.name}</h3>
            <p style={{ color: colors.textSecondary, fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '32px' }}>{plan.description}</p>

            <div style={{ flex: 1, marginBottom: '40px' }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center', opacity: 0.8 }}>
                  <Check size={14} style={{ color: plan.color }} strokeWidth={3} /> {f}
                </div>
              ))}
            </div>

            <button style={{
              background: plan.featured ? plan.color : '#fff', border: 'none', 
              color: '#000', padding: '16px', borderRadius: '12px', 
              cursor: 'pointer', fontWeight: 800, fontSize: '0.9rem',
              transition: '0.3s'
            }}>
              Active Beta Plan
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '60px', opacity: 0.4, color: '#fff', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em' }}>
         POWERED BY AXIOM COMPUTE ENGINE • NO CREDIT CARD REQUIRED
      </div>
    </div>
  );
};
