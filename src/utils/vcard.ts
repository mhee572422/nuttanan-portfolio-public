export const downloadVCard = () => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Foopun;Nuttanan;;;
FN:Nuttanan Foopun
ORG:BTRU Logic Co., Ltd.
TITLE:Lead Systems Administrator & Architect
EMAIL;type=INTERNET;type=WORK;type=pref:nuttanan.f@gmail.com
URL:https://nuttanan.dev
URL;type=LinkedIn:https://linkedin.com/in/nuttanan-foopun-46s4906s
URL;type=GitHub:https://github.com/mhee572422
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Nuttanan_Foopun.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
