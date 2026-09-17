const fs = require('fs');
let code = fs.readFileSync('src/components/Updates.tsx', 'utf8');

// The previous script injected copy button inside `isAdmin` check because of the regex match `<button \n onClick={(e) => handleEdit(post, e)}`. Let's fix that.
// Let's remove the first one, then insert properly outside.

code = code.replace(
  /                        <button\n                          onClick=\{\(e\) => copyPostLink\(e, post\.id\)\}\n                          className="p\.1\.5 text-foreground\/40 hover:text-primary hover:bg-primary\/10 rounded-sm transition-colors"\n                          title=\{language === 'en' \? 'Copy Link' : 'คัดลอกลิงก์'\}\n                        >\n                          \{copiedId === post\.id \? <Check size=\{14\} className="text-green-500" \/> : <LinkIcon size=\{14\} \/>\}\n                        <\/button>/,
  ""
);

code = code.replace(
  /<div className="flex items-center gap-3">\n                    \{isAdmin && \(/,
  `<div className="flex items-center gap-3">
                    <button
                      onClick={(e) => copyPostLink(e, post.id)}
                      className="p-1.5 text-foreground/40 hover:text-primary hover:bg-primary/10 rounded-sm transition-colors"
                      title={language === 'en' ? 'Copy Link' : 'คัดลอกลิงก์'}
                    >
                      {copiedId === post.id ? <Check size={14} className="text-green-500" /> : <LinkIcon size={14} />}
                    </button>
                    {isAdmin && (`
);

fs.writeFileSync('src/components/Updates.tsx', code);
