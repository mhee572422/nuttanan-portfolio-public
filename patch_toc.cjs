const fs = require('fs');
let code = fs.readFileSync('src/components/PostViewModal.tsx', 'utf8');

if (!code.includes('List as ListIcon')) {
  code = code.replace(
    /Link as LinkIcon, Check, Mail \} from 'lucide-react';/,
    "Link as LinkIcon, Check, Mail, List as ListIcon } from 'lucide-react';"
  );
}

const customMarkdownLogic = `
  const headings = React.useMemo(() => {
    const matches = Array.from(content.matchAll(/^(#{2,3})\\s+(.+)$/gm));
    return matches.map(match => {
      // Clean markdown characters from the heading text for the ID
      const plainText = match[2].replace(/[^\\w\\s\\u0E00-\\u0E7F]/g, '').trim();
      return {
        level: match[1].length,
        text: match[2].replace(/\\*\\*/g, '').replace(/_/g, '').replace(/\\[/g, '').replace(/\\]/g, '').replace(/\\(/g, '').replace(/\\)/g, ''), // just clean basic markdown for display
        id: plainText.toLowerCase().replace(/[^\\w\\u0E00-\\u0E7F]+/g, '-')
      };
    });
  }, [content]);

  const flattenText = (children: any): string => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(flattenText).join('');
    if (children && typeof children === 'object' && children.props && children.props.children) return flattenText(children.props.children);
    return '';
  };

  const generateId = (children: any) => flattenText(children).toLowerCase().replace(/[^\\w\\u0E00-\\u0E7F]+/g, '-');

  const components = {
    h2: ({node, children, ...props}: any) => <h2 id={generateId(children)} className="scroll-mt-6" {...props}>{children}</h2>,
    h3: ({node, children, ...props}: any) => <h3 id={generateId(children)} className="scroll-mt-6" {...props}>{children}</h3>,
  };
`;

if (!code.includes('const headings = React.useMemo')) {
  code = code.replace(
    /const date = post\.createdAt \? new Date/,
    `${customMarkdownLogic}\n\n  const date = post.createdAt ? new Date`
  );
}

const tocUI = `
              {headings.length > 0 && (
                <div className="mb-10 p-5 bg-surface-alt border border-foreground/10 rounded-xl">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/70 mb-4 flex items-center gap-2">
                    <ListIcon size={16} />
                    {language === 'en' ? 'Table of Contents' : 'สารบัญ'}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {headings.map((h, i) => (
                      <li key={i} style={{ paddingLeft: \`\${(h.level - 2) * 1.5}rem\` }}>
                        <a 
                          href={\`#\${h.id}\`} 
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(h.id);
                            if (el) {
                              // We need to scroll the modal container, not the window
                              el.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="text-foreground/70 hover:text-primary transition-colors flex items-start gap-2"
                        >
                          <span className="text-primary mt-1 text-[10px] shrink-0">▹</span>
                          <span>{h.text}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
`;

if (!code.includes('Table of Contents')) {
  code = code.replace(
    /<div className="w-full h-px bg-foreground\/10 mb-8" \/>/,
    `<div className="w-full h-px bg-foreground/10 mb-8" />\n${tocUI}`
  );
}

code = code.replace(
  /<Markdown>\{content\}<\/Markdown>/,
  "<Markdown components={components}>{content}</Markdown>"
);

fs.writeFileSync('src/components/PostViewModal.tsx', code);
