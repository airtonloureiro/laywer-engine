import React from 'react';
import CookieConsent from 'react-cookie-consent';
import type { PrivacyConfig } from '../types/schema';

interface CookieBannerProps {
    config: PrivacyConfig['consent'];
    theme: {
        primary_color: string;
        secondary_color: string;
    };
    strategy?: 'fixed' | 'absolute';
    onDismiss?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ config, theme, strategy = 'absolute', onDismiss }) => {
    if (!config.enabled) return null;

    return (
        <CookieConsent
            location="bottom"
            buttonText="Aceitar Todos"
            enableDeclineButton
            declineButtonText="Configurar"
            cookieName="lawyer_engine_consent"
            style={{
                background: 'rgba(255, 255, 255, 0.95)',
                color: '#4b5563',
                fontSize: '13px',
                borderTop: '1px solid #e5e7eb',
                boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
                alignItems: 'center',
                zIndex: 40,
                position: strategy as "fixed" | "absolute"
            }}
            buttonStyle={{
                backgroundColor: theme.primary_color,
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
                borderRadius: '4px',
                padding: '8px 24px',
                margin: '0 0 0 10px'
            }}
            declineButtonStyle={{
                backgroundColor: '#e5e7eb',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '4px',
                padding: '8px 16px',
                margin: '0'
            }}
            expires={150}
            onAccept={() => {
                if (onDismiss) onDismiss();
            }}
            containerClasses="flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto"
            contentClasses="flex-1"
            buttonWrapperClasses="flex items-center gap-2 shrink-0"
        >
            <span className="font-semibold text-gray-900 block mb-1">Nós valorizamos sua privacidade</span>
            Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa{' '}
            <a href={config.policy_url || '#'} className="font-semibold underline hover:text-gray-900 transition-colors">
                Política de Privacidade
            </a>.
        </CookieConsent>
    );
};
