const fs = require('fs');

const meta = JSON.parse(fs.readFileSync('metadata.json', 'utf8'));
if (!meta.requestFramePermissions.includes('microphone')) {
  meta.requestFramePermissions.push('microphone');
}
fs.writeFileSync('metadata.json', JSON.stringify(meta, null, 2), 'utf8');
