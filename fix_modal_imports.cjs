const fs = require('fs');
let code = fs.readFileSync('src/components/PostViewModal.tsx', 'utf8');

code = code.replace(
  /import \{ X, Calendar, Tag, Clock \} , Link as LinkIcon, Check \} from 'lucide-react';/,
  "import { X, Calendar, Tag, Clock, Link as LinkIcon, Check } from 'lucide-react';"
);

fs.writeFileSync('src/components/PostViewModal.tsx', code);
