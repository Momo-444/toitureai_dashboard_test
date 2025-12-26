import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  console.log('[Sentry Debug] DSN present:', !!dsn);
  console.log('[Sentry Debug] DSN value:', dsn ? dsn.substring(0, 30) + '...' : 'NOT SET');

  if (!dsn) {
    console.log('[Sentry] DSN not configured, skipping initialization');
    return;
  }

  try {
    Sentry.init({
      dsn,
      environment: import.meta.env.MODE,
      debug: true, // Active le debug Sentry
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, // 100% pour le debug
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      // Filtrer les erreurs connues
      beforeSend(event) {
        console.log('[Sentry Debug] Sending event:', event.exception?.values?.[0]?.value);
        if (event.exception?.values?.[0]?.value?.includes('NetworkError')) {
          return null;
        }
        return event;
      },
    });
    console.log('[Sentry] Initialized successfully');
  } catch (error) {
    console.error('[Sentry] Initialization failed:', error);
  }
}

// Helper pour capturer des erreurs manuellement
export function captureError(error: Error, context?: Record<string, unknown>) {
  console.log('[Sentry Debug] captureError called with:', error.message);
  console.log('[Sentry Debug] DSN available:', !!import.meta.env.VITE_SENTRY_DSN);

  if (import.meta.env.VITE_SENTRY_DSN) {
    const eventId = Sentry.captureException(error, { extra: context });
    console.log('[Sentry Debug] Event ID:', eventId);
  } else {
    console.error('[Sentry] No DSN - Error logged locally:', error, context);
  }
}

// Helper pour définir l'utilisateur courant
export function setUser(user: { id: string; email?: string; role?: string }) {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.setUser(user);
  }
}

// Helper pour effacer l'utilisateur (logout)
export function clearUser() {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.setUser(null);
  }
}
