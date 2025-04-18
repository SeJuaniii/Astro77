const fs = require('fs');
const path = require('path');

const archivosHTML = ['html/index.html', 'html/equipo.html', 'html/pokedex.html', 'html/tipos.html'];

// Mapa de rutas a reemplazar
const reemplazos = {
  '"script.js"': '"js/script.js"',
  '"pokemon.js"': '"js/pokemon.js"',
  '"pokedex.js"': '"js/pokedex.js"',
  '"equipo.js"': '"js/equipo.js"',
  '"style.css"': '"css/style.css"'
};

archivosHTML.forEach((archivo) => {
  const ruta = path.join(__dirname, archivo);

  if (fs.existsSync(ruta)) {
    let contenido = fs.readFileSync(ruta, 'utf-8');

    Object.entries(reemplazos).forEach(([viejo, nuevo]) => {
      const regex = new RegExp(viejo, 'g');
      contenido = contenido.replace(regex, nuevo);
    });

    fs.writeFileSync(ruta, contenido, 'utf-8');
    console.log(`✅ Rutas actualizadas en: ${archivo}`);
  } else {
    console.warn(`⚠️ No se encontró el archivo: ${archivo}`);
  }
});
