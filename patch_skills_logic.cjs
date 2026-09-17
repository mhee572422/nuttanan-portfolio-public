const fs = require('fs');
let code = fs.readFileSync('src/components/Skills.tsx', 'utf8');

// Add BadgeCheck import
if (!code.includes('BadgeCheck')) {
  code = code.replace("import { Sparkles } from 'lucide-react';", "import { Sparkles, BadgeCheck } from 'lucide-react';");
}

// Add state
code = code.replace("const [viewMode, setViewMode] = useState<'category' | 'experience'>('category');", "const [viewMode, setViewMode] = useState<'category' | 'experience'>('category');\n  const [filterMode, setFilterMode] = useState<'all' | 'verified' | 'self'>('all');");

fs.writeFileSync('src/components/Skills.tsx', code);
