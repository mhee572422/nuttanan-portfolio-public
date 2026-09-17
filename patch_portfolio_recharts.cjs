const fs = require('fs');

let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

if (!content.includes('recharts')) {
  content = content.replace(
    "import { Helmet } from 'react-helmet-async';",
    "import { Helmet } from 'react-helmet-async';\nimport { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';"
  );
}

// Add CustomTooltip component for Recharts outside of Portfolio function
const customTooltipDef = `
const CustomTimelineTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1A1A1A] border border-[#C5A059]/30 p-4 rounded-md shadow-2xl max-w-[250px]">
        <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-wider mb-1">{data.name}</p>
        <p className="text-white/40 text-[10px] font-mono mb-2">{data.date}</p>
        <p className="text-white/80 text-xs leading-relaxed">{data.description}</p>
      </div>
    );
  }
  return null;
};
`;

if (!content.includes('CustomTimelineTooltip')) {
  content = content.replace(
    "export default function Portfolio() {",
    customTooltipDef + "\nexport default function Portfolio() {"
  );
}

// Replace the HTML milestones rendering with Recharts
const newMilestoneRendering = `
                {selectedProject.milestones && selectedProject.milestones.length > 0 && (
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
                          <YAxis hide={true} domain={[0, 2]} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#ffffff40" 
                            tick={{ fill: '#ffffff80', fontSize: 10, fontFamily: 'monospace' }} 
                            axisLine={false} 
                            tickLine={false} 
                            dy={10}
                          />
                          <RechartsTooltip content={<CustomTimelineTooltip />} cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '4 4' }} />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#C5A059" 
                            strokeWidth={2} 
                            dot={{ r: 6, fill: '#1A1A1A', stroke: '#C5A059', strokeWidth: 2 }} 
                            activeDot={{ r: 8, fill: '#C5A059', stroke: '#1A1A1A', strokeWidth: 2 }}
                            isAnimationActive={true}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Fallback accessible list (screen readers only) */}
                    <div className="sr-only">
                      {selectedProject.milestones.map((milestone, idx) => (
                        <div key={idx}>
                          <p>{milestone.phase} - {milestone.date}</p>
                          <p>{milestone.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
`;

content = content.replace(
  /\{selectedProject\.milestones && selectedProject\.milestones\.length > 0 && \([\s\S]*?\}\)\}[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?\)\}/,
  newMilestoneRendering
);

fs.writeFileSync('src/components/Portfolio.tsx', content, 'utf8');

