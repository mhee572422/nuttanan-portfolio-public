import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  eventData?: any;
  timestamp: string;
}

interface AnalyticsContextType {
  events: AnalyticsEvent[];
  trackEvent: (eventName: string, eventData?: any) => void;
  clearEvents: () => void;
  resumeDownloadCount: number;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_analytics');
    if (saved) {
      try {
        setEvents(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse analytics data');
      }
    }
  }, []);

  const trackEvent = useCallback((eventName: string, eventData?: any) => {
    const newEvent: AnalyticsEvent = {
      id: crypto.randomUUID(),
      eventName,
      eventData,
      timestamp: new Date().toISOString()
    };
    
    setEvents(prev => {
      const updated = [newEvent, ...prev];
      localStorage.setItem('portfolio_analytics', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
    localStorage.removeItem('portfolio_analytics');
  }, []);

  const resumeDownloadCount = events.filter(e => e.eventName === 'resume_downloaded').length;

  return (
    <AnalyticsContext.Provider value={{ events, trackEvent, clearEvents, resumeDownloadCount }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const useResumeDownloadCount = () => {
  const context = useAnalytics();
  return context.resumeDownloadCount;
};
