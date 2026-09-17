const fs = require('fs');

let portfolio = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');
portfolio = portfolio.replace(
    "import { ExternalLink, Search, X, Github, Clock, Code, Folder } from 'lucide-react';",
    "import { ExternalLink, Search, X, Github, Clock, Code, Folder, Maximize2 } from 'lucide-react';"
);
fs.writeFileSync('src/components/Portfolio.tsx', portfolio);

let techBadge = fs.readFileSync('src/components/TechBadge.tsx', 'utf8');
techBadge = techBadge.replace(
    "export default function TechBadge({ tech, size = 'md' }: TechBadgeProps) {",
    "const TechBadge: React.FC<TechBadgeProps> = ({ tech, size = 'md' }) => {\n"
);
techBadge += "\nexport default TechBadge;";
fs.writeFileSync('src/components/TechBadge.tsx', techBadge);
