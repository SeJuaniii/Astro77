const fs = require('fs');
const path = require('path');

const estructura = {
  html: ['index.html', 'pokedex.html', 'equipo.html', 'tipos.html'],
  css: ['style.css'],
  js: ['script.js', 'pokedex.js', 'equipo.js', 'pokemon.js']
};

Object.entries(estructura).forEach(([carpeta, archivos]) => {
  if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta);
    console.log(`📁 Carpeta creada: ${carpeta}`);
  }

  archivos.forEach(nombreArchivo => {
    const rutaOriginal = path.join(__dirname, nombreArchivo);
    const nuevaRuta = path.join(__dirname, carpeta, nombreArchivo);
    if (fs.existsSync(rutaOriginal)) {
      fs.renameSync(rutaOriginal, nuevaRuta);
      console.log(`✅ Movido: ${nombreArchivo} → ${carpeta}/`);
    } else {
      console.log(`⚠️ No se encontró: ${nombreArchivo}`);
    }
  });
});
