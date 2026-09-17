const fs = require('fs');
let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

// Add import for ProjectTimeline
if (!content.includes('ProjectTimeline')) {
  content = content.replace(
    "import { Helmet } from 'react-helmet-async';",
    "import { Helmet } from 'react-helmet-async';\nimport ProjectTimeline from './ProjectTimeline';"
  );
}

// Replace the Recharts LineChart implementation with our new D3 ProjectTimeline
// Finding the block around selectedProject.milestones...

const blockToReplace = `{selectedProject.milestones && selectedProject.milestones.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">
                      {language === 'en' ? 'Project Timeline' : 'ระยะเวลาของโปรเจกต์'}
                    </h4>
                    
                    <div className="h-[160px] w-full bg-[#1A1A1A]/50 rounded-xl border border-white/5 p-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={selectedProject.milestones.map(m => ({
                            name: m.phase,
                            date: m.date,
                            description: m.description,
                            value: 1
                          }))} 
                          margin={{ top: 40, right: 30, left: 30, bottom: 20 }}
                        >
                          <Line 
                            type="stepAfter" 
                            dataKey="value" 
                            stroke="#C5A059" 
                            strokeWidth={2} 
                            dot={{ r: 4, fill: '#1A1A1A', strokeWidth: 2, stroke: '#C5A059' }}
                            activeDot={{ r: 6, fill: '#C5A059', stroke: '#000', strokeWidth: 2 }}
                          />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, dy: 10 }} 
                          />
                          <YAxis hide domain={[0, 2]} />
                          <Tooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-[#111] border border-[#C5A059]/20 p-3 shadow-xl max-w-[200px]">
                                    <p className="text-[#C5A059] text-[10px] uppercase font-bold tracking-widest mb-1">{data.name}</p>
                                    <p className="text-white/60 text-[9px] font-mono mb-2">{data.date}</p>
                                    <p className="text-white/80 text-xs leading-relaxed">{data.description}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                            cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 20 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}`;

// We need to use regex since the exact indentation or spacing might differ slightly
const regex = /\{selectedProject\.milestones && selectedProject\.milestones\.length > 0 && \([\s\S]*?<\/ResponsiveContainer>\s*<\/div>\s*<\/div>\s*\)\}/;

content = content.replace(regex, `<ProjectTimeline milestones={selectedProject.milestones} />`);

fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');

