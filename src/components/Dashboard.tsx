import { useAnalytics } from '../context/AnalyticsContext';
import { X, Trash2, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard({ onClose }: { onClose: () => void }) {
  const { events, clearEvents, resumeDownloadCount } = useAnalytics();

  const getEventCount = (name: string) => events.filter(e => e.eventName === name).length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-background border border-foreground/10 w-full max-w-4xl max-h-[85vh] flex flex-col rounded-xl overflow-hidden relative shadow-2xl"
      >
        <div className="flex justify-between items-center p-6 border-b border-foreground/10 bg-surface-alt">
          <h2 className="text-xl font-serif text-foreground flex items-center gap-3">
            <Activity size={20} className="text-primary" /> 
            Engagement Dashboard
          </h2>
          <div className="flex items-center gap-6">
            <button 
              onClick={clearEvents} 
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-foreground/40 hover:text-red-400 transition-colors"
              title="Clear all data"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">Clear Data</span>
            </button>
            <button 
              onClick={onClose} 
              className="text-foreground/40 hover:text-foreground transition-colors bg-foreground/5 p-2 rounded-full hover:bg-foreground/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface p-5 border border-foreground/5 rounded-lg">
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2">Total Events</p>
              <p className="text-3xl font-mono text-foreground">{events.length}</p>
            </div>
            <div className="bg-surface p-5 border border-foreground/5 rounded-lg">
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2">Resume D/L</p>
              <p className="text-3xl font-mono text-primary">{resumeDownloadCount}</p>
            </div>
            <div className="bg-surface p-5 border border-foreground/5 rounded-lg">
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2">Project Views</p>
              <p className="text-3xl font-mono text-blue-400">{getEventCount('project_viewed')}</p>
            </div>
            <div className="bg-surface p-5 border border-foreground/5 rounded-lg">
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2">External Clicks</p>
              <p className="text-3xl font-mono text-green-400">
                {getEventCount('demo_clicked') + getEventCount('source_clicked')}
              </p>
            </div>
          </div>
          
          <div className="bg-surface border border-foreground/5 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-foreground/70">
                <thead className="text-[10px] uppercase tracking-widest text-foreground/40 border-b border-foreground/10 bg-black/20">
                  <tr>
                    <th className="px-6 py-4 font-medium">Event Name</th>
                    <th className="px-6 py-4 font-medium">Event Data</th>
                    <th className="px-6 py-4 font-medium text-right">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {events.map(ev => (
                    <tr key={ev.id} className="hover:bg-foreground/5 transition-colors">
                      <td className="px-6 py-4 text-primary font-medium text-xs whitespace-nowrap">
                        {ev.eventName}
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-foreground/50">
                        {ev.eventData ? JSON.stringify(ev.eventData) : '-'}
                      </td>
                      <td className="px-6 py-4 text-right text-xs whitespace-nowrap text-foreground/40">
                        {new Date(ev.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-foreground/30 text-sm">
                        No engagement events recorded yet. Click around the portfolio to generate some data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
