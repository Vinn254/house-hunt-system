import('vite').then(v => v.build()).then(()=>console.log('OK')).catch(e=>{console.error(e); process.exit(1)})
