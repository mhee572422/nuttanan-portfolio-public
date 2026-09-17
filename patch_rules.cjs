const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf8');
code = code.replace(
  /allow write: if false; \/\/ System only/,
  "allow write: if isOwner(userId) && request.auth.token.email == 'nuttanan.f@gmail.com';"
);
fs.writeFileSync('firestore.rules', code);
