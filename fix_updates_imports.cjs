const fs = require('fs');
let code = fs.readFileSync('src/components/Updates.tsx', 'utf8');

code = code.replace(
  /import \{ Rss, Calendar, ArrowUpRight, Tag, Plus, Edit2, Trash2 \} , Mail \} from 'lucide-react';/,
  "import { Rss, Calendar, ArrowUpRight, Tag, Plus, Edit2, Trash2, Mail, Link as LinkIcon, Check } from 'lucide-react';"
);

fs.writeFileSync('src/components/Updates.tsx', code);
