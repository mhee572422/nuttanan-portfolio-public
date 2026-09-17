import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { useLanguage } from '../context/LanguageContext';

interface Milestone {
  phase: string;
  date: string;
  description: string;
}

interface ProjectTimelineProps {
  milestones?: Milestone[];
}

export default function ProjectTimeline({ milestones }: ProjectTimelineProps) {
  const { language } = useLanguage();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !milestones || milestones.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous renders on update

    const width = 800;
    const height = 120;
    const margin = { top: 40, right: 60, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    
    svg.attr('viewBox', `0 0 ${width} ${height}`)
       .attr('preserveAspectRatio', 'xMidYMid meet');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scalePoint()
      .domain(milestones.map(m => m.phase))
      .range([0, innerWidth])
      .padding(0.5);

    // Draw connecting background line
    g.append('line')
      .attr('x1', 0)
      .attr('y1', height / 2 - margin.top)
      .attr('x2', innerWidth)
      .attr('y2', height / 2 - margin.top)
      .attr('stroke', 'rgba(255, 255, 255, 0.1)')
      .attr('stroke-width', 2);
      
    // Draw connecting active line with animation
    const path = g.append('line')
      .attr('x1', 0)
      .attr('y1', height / 2 - margin.top)
      .attr('x2', innerWidth)
      .attr('y2', height / 2 - margin.top)
      .attr('stroke', '#C5A059')
      .attr('stroke-width', 2);
      
    const totalLength = innerWidth;
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr('stroke-dashoffset', 0);

    // Add groups for each node
    const nodes = g.selectAll('.node')
      .data(milestones)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${xScale(d.phase)}, ${height / 2 - margin.top})`);

    // Outer pulse circle
    nodes.append('circle')
      .attr('r', 0)
      .attr('fill', 'none')
      .attr('stroke', '#C5A059')
      .attr('stroke-width', 1)
      .attr('opacity', 0)
      .transition()
      .delay((d, i) => i * 300 + 500)
      .duration(1000)
      .attr('r', 16)
      .attr('opacity', 0.5)
      .style('stroke-dasharray', '2 2');

    // Inner Solid Node circles
    nodes.append('circle')
      .attr('r', 0)
      .attr('fill', '#0A0A0A')
      .attr('stroke', '#C5A059')
      .attr('stroke-width', 2)
      .transition()
      .delay((d, i) => i * 300)
      .duration(500)
      .attr('r', 6);

    // Text: Phase Label
    nodes.append('text')
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('letter-spacing', '0.1em')
      .style('text-transform', 'uppercase')
      .style('opacity', 0)
      .text(d => d.phase)
      .transition()
      .delay((d, i) => i * 300 + 200)
      .duration(500)
      .style('opacity', 1);

    // Text: Date
    nodes.append('text')
      .attr('y', 24)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgba(255, 255, 255, 0.4)')
      .style('font-size', '10px')
      .style('font-family', 'monospace')
      .style('opacity', 0)
      .text(d => d.date)
      .transition()
      .delay((d, i) => i * 300 + 300)
      .duration(500)
      .style('opacity', 1);

  }, [milestones]);

  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="w-full mt-10 bg-background border border-foreground/5 p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#C5A059] to-transparent" />
      <h4 className="text-[10px] uppercase tracking-[0.2em] text-primary mb-4 font-bold flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        {language === 'en' ? 'Project Lifecycle' : 'วงจรชีวิตของโปรเจกต์'}
      </h4>
      
      {/* Visual SVG Timeline */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-4">
        <svg ref={svgRef} className="w-full min-w-[600px] h-auto drop-shadow-xl" />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 pt-6 border-t border-foreground/5">
        {milestones.map((m, i) => (
          <div key={i} className="text-left flex flex-col gap-1">
            <h5 className="text-[10px] text-foreground/80 uppercase tracking-widest">{m.phase}</h5>
            <span className="text-[9px] text-foreground/40 font-mono mb-1">{m.date}</span>
            <p className="text-xs text-foreground/50 leading-relaxed border-l border-foreground/10 pl-3 py-1">{m.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
