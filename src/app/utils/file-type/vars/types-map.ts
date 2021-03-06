const typesMap = {
  'doc,docm,docx,dot,': 'MS Word Document',
  'vsd,vdx,vsdx,': 'MS Visio File',
  'mpp,': 'MS Project File',
  'pub,': 'MS Publisher Document',
  'xls,xlr,xlsb,xlsm,xlsx,': 'MS Excel',
  '7z,gz,gzip,rar,tar,gz,tgz,zip,zipx,': 'Archive',
  '3ga,aac,aif,aiff,au,flac,mid,midi,mpa,wav,wma,': 'Audio',
  'aa,aax': 'Audio Book',
  'rtf,': 'Rich Text Format',
  'txt,': 'Plain text file',
  'ftn,fon,otf,ttf,': 'Font File',
  'csv,': 'Comma Seperated Values File',
  'divx,dvsd,f4v,flv,mov,mkv,mpeg,mpg,ogv,wmv,avi,': 'Multimedia/Video File',
  'ppt,pot,pps,pptx,pptm,potx,potm,ppam,ppsx,ppsm,sldx,sldm,': 'PowerPoint Slide Show',
  'arw,cr2,crw,nrw,orf,raf,sr2,': 'Digital Camera File',
  'webm,': 'Web Media File',
  'acsm,epub,cbz,cbt,lit,lrf,mobi,prc,tcr,': 'eBook',
  'apnx,azw,azw3,': 'Amazon eBook',
  'ico,': 'Icon',
  'psd,': 'Photoshop Document',
  'webp,': 'Google Web Picture',
  'ics,': 'iCalendar File',
  'idx,srt,': 'Subtitles File',
  'db,dbf,': 'Database',
  'accdb,accde,accdt,mdb,': 'MS Access Database File',
  'bat,': 'DOS Batch File',
  'cmd,com,': 'Win/DOS Command File',
  'exe,': 'Windows Executable',
  'mis,': 'Windows Installer Package',
  'ini,': 'Windows Initialization File',
  'img,iso,': 'Disk Image',
  'css,': 'Cascading Style Sheets',
  'js,': 'JavaScript File',
  'bak,': 'Backup File',
  'sha256,sha512,': 'Hash File',
  'metadata,': 'Meta File',
  'pkg,': 'Mac OS X Installer Package',
  'app,': 'Mac OS X Application',
  'ipa,': 'iOS Application',
  'resources,': 'Visual Studio Resource File',
  'sln,suo,vbproj,vcxproj,csproj,props,': 'Visual Studio Solution File',
  'nuspec, nupkg,': 'NuGet File',
  'dat,': 'Data File',
  'dll,': 'Dynamic Link Library',
  'asp,aspx,': 'ASP Page',
  'b,bas,': 'BASIC Code',
  'c,cpp,def,hpp,': 'C/C++ Code',
  'cs,': 'C# Code',
  'class,java,': 'Java Class/Source code',
  'py,pyw,': 'Python Script/Source',
  'yml,': 'YAML Document',
  '3dm,3ds,dwg,max,obj,': 'CAD (3D)',
  '.gitignore': 'Git Ignore FIle'
};

export default typesMap;
