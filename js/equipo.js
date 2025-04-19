const generaciones = {
    1: ["Bulbasaur", "Charmander", "Squirtle", "Pikachu", "Eevee", "Snorlax", "Mew"],
    2: ["Chikorita", "Cyndaquil", "Totodile", "Togepi", "Mareep", "Umbreon", "Espeon"]
  };
  
  function cargarGeneracion(gen) {
    const container = document.getElementById('selector-container');
    container.innerHTML = ''; // limpiamos anteriores
  
    generaciones[gen].forEach(name => {
      const btn = document.createElement('div');
      btn.className = 'pokemon-seleccion';
      btn.innerHTML = `
        <img src="https://img.pokemondb.net/sprites/black-white/normal/${name.toLowerCase()}.png" alt="${name}">
        <span>${name}</span>
      `;
      btn.setAttribute('draggable', true);
      container.appendChild(btn);
  
      btn.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', name);
      });
    });
  }
  
  document.querySelectorAll('.slot').forEach(slot => {
    slot.addEventListener('dragover', e => {
      e.preventDefault();
      slot.style.borderColor = '#3b9eff';
    });

    slot.addEventListener('dragleave', () => {
      slot.style.borderColor = '#999';
    });

    slot.addEventListener('drop', e => {
        e.preventDefault();
        const nombre = e.dataTransfer.getData('text/plain');
      
        // 🚫 Verificar si ya está en otro slot
        const yaExiste = Array.from(document.querySelectorAll('.slot')).some(s => {
          return s !== slot && s.textContent.includes(nombre);
        });
      
        if (yaExiste) {
          alert(`${nombre} ya está en tu equipo.`);
          slot.style.borderColor = '#999';
          return;
        }
      
        // ✅ Si no está repetido, lo agregamos
        slot.innerHTML = `
          <img src="https://img.pokemondb.net/sprites/black-white/normal/${nombre.toLowerCase()}.png" class="slot-img">
          <span>${nombre}</span>
        `;
        // 🔁 Guardar equipo actual en localStorage
const equipoActual = Array.from(document.querySelectorAll('.slot'))
.map(s => s.querySelector('span')?.textContent)
.filter(Boolean); 
        slot.style.borderColor = '#999';
        actualizarGrafico();
        analizarFortalezas();
        // Mostrar botón "Ir a batalla" si hay 6 slots ocupados
const slotsOcupados = Array.from(document.querySelectorAll(".slot span")).filter(Boolean);
document.getElementById("ir-a-batalla").style.display = (slotsOcupados.length === 6) ? "block" : "none";
      }); // Aquí cerramos correctamente el bloque
}); // Aquí cerramos el forEach correctamente

// Cargar Gen 1 por defecto
window.onload = () => cargarGeneracion(1);

let chart;

function actualizarGrafico() {
    const tipos = {};
    const promesas = [];
  
    document.querySelectorAll('.slot').forEach(slot => {
      const nombre = slot.querySelector('span')?.textContent;
      if (!nombre) return;
  
      const promesa = fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
          data.types.forEach(t => {
            const tipo = t.type.name;
            tipos[tipo] = (tipos[tipo] || 0) + 1;
          });
        });
  
      promesas.push(promesa);
    });
  
    Promise.all(promesas).then(() => {
      mostrarGrafico(tipos);
    });
  }  

  function mostrarGrafico(tipos) {
    const ctx = document.getElementById('grafico').getContext('2d');
  
    if (window.myRadarChart) {
      window.myRadarChart.destroy();
    }
  
    window.myRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: Object.keys(tipos),
        datasets: [{
          label: 'Distribución de tipos',
          data: Object.values(tipos),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
 
  function calcularFortalezasDebilidades(tipos) {
    const fortaleza = {};
    const debilidad = {};
  
    tipos.forEach(tipo => {
      const efectividades = tablaTipos[tipo] || {};
      for (const t in efectividades) {
        const mult = efectividades[t];
        if (mult > 1) fortaleza[t] = (fortaleza[t] || 0) + 1;
        else if (mult < 1) debilidad[t] = (debilidad[t] || 0) + 1;
      }
    });
  
    const fortalezasTexto = Object.keys(fortaleza).map(t => `${t.toUpperCase()} (${fortaleza[t]})`).join(', ');
    const debilidadesTexto = Object.keys(debilidad).map(t => `${t.toUpperCase()} (${debilidad[t]})`).join(', ');
  
    document.getElementById('fortalezas').textContent = fortalezasTexto || 'Ninguna clara';
    document.getElementById('debilidades').textContent = debilidadesTexto || 'Ninguna clara';
    
    sugerirPokemon(debilidad);
  }
  analizarFortalezas();

  const traducirTipo = {
    "Planta": "grass", "Fuego": "fire", "Agua": "water", "Eléctrico": "electric",
    "Normal": "normal", "Psíquico": "psychic", "Veneno": "poison", "Hielo": "ice",
    "Lucha": "fighting", "Tierra": "ground", "Volador": "flying", "Fantasma": "ghost",
    "Roca": "rock", "Bicho": "bug", "Acero": "steel", "Dragón": "dragon",
    "Siniestro": "dark", "Hada": "fairy"
  };
  
  const tablaTipos = {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: { grass: 2, ice: 2, bug: 2, steel: 2, fire: 0.5, water: 0.5, rock: 0.5, dragon: 0.5 },
    water: { fire: 2, ground: 2, rock: 2, water: 0.5, grass: 0.5, dragon: 0.5 },
    electric: { water: 2, flying: 2, electric: 0.5, grass: 0.5, dragon: 0.5, ground: 0 },
    grass: { water: 2, ground: 2, rock: 2, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, dragon: 0.5, steel: 0.5 },
    ice: { grass: 2, ground: 2, flying: 2, dragon: 2, fire: 0.5, water: 0.5, ice: 0.5, steel: 0.5 },
    fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, fairy: 0.5, ghost: 0 },
    poison: { grass: 2, fairy: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0 },
    ground: { fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, grass: 0.5, bug: 0.5, flying: 0 },
    flying: { grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5, steel: 0.5 },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, steel: 0.5, dark: 0 },
    bug: { grass: 2, psychic: 2, dark: 2, fire: 0.5, fighting: 0.5, poison: 0.5, flying: 0.5, ghost: 0.5, steel: 0.5, fairy: 0.5 },
    rock: { fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5, steel: 0.5 },
    ghost: { psychic: 2, ghost: 2, dark: 0.5, normal: 0 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 0.5 },
    steel: { ice: 2, rock: 2, fairy: 2, fire: 0.5, water: 0.5, electric: 0.5, steel: 0.5 },
    fairy: { fighting: 2, dragon: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5 }
  };
  
  function analizarFortalezas() {
    const tiposEquipo = [];
    const promesas = [];
  
    const slotsConPokemon = Array.from(document.querySelectorAll('.slot')).filter(slot => slot.querySelector('span'));
    const totalSlotsConPokemon = slotsConPokemon.length;
  
    slotsConPokemon.forEach(slot => {
      const nombre = slot.querySelector('span')?.textContent;
      if (!nombre) return;
  
      const promesa = fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
          data.types.forEach(t => {
            const tipoTraducido = t.type.name.toLowerCase(); // ya están en inglés
            tiposEquipo.push(tipoTraducido);
          });
        });
      promesas.push(promesa);
    });
  
    Promise.all(promesas).then(() => {
      calcularFortalezasDebilidades(tiposEquipo);
    });
  }
  
  function calcularFortalezasDebilidades(tipos) {
    const fortaleza = {};
    const debilidad = {};
  
    tipos.forEach(tipo => {
      const efectividades = tablaTipos[tipo];
      if (!efectividades) return;
  
      for (const t in efectividades) {
        const mult = efectividades[t];
        if (mult > 1) fortaleza[t] = (fortaleza[t] || 0) + 1;
        else if (mult < 1) debilidad[t] = (debilidad[t] || 0) + 1;
      }
    });
  
    const fortalezasTexto = Object.keys(fortaleza).map(t => `${t.toUpperCase()} (${fortaleza[t]})`).join(', ');
    const debilidadesTexto = Object.keys(debilidad).map(t => `${t.toUpperCase()} (${debilidad[t]})`).join(', ');
  
    document.getElementById('fortalezas').textContent = fortalezasTexto || 'Ninguna clara';
    document.getElementById('debilidades').textContent = debilidadesTexto || 'Ninguna clara';

    sugerirPokemon(debilidad);
  }
  
  const sugerenciasPorTipo = {
    fire: ["Charizard", "Flareon"],
    water: ["Squirtle", "Vaporeon"],
    grass: ["Bulbasaur", "Leafeon"],
    electric: ["Pikachu", "Jolteon"],
    psychic: ["Espeon", "Mew"],
    dark: ["Umbreon"],
    fairy: ["Togepi"],
    normal: ["Snorlax", "Eevee"]
  };
  
  function sugerirPokemon(debilidades) {
    const contenedor = document.getElementById('sugerencias-lista');
    if (!contenedor) return;
  
    contenedor.innerHTML = "";
  
    const tiposFaltantes = Object.keys(debilidades).slice(0, 4);
  
    tiposFaltantes.forEach(tipo => {
      const sugeridos = sugerenciasPorTipo[tipo];
      if (!sugeridos) return;
  
      sugeridos.forEach(nombre => {
        const div = document.createElement('div');
        div.className = "sugerencia";
        div.innerHTML = `
          <img src="https://img.pokemondb.net/sprites/black-white/normal/${nombre.toLowerCase()}.png" alt="${nombre}" style="width:40px; height:40px; vertical-align:middle; margin-right: 8px;">
          <span>${nombre} (${tipo})</span>
        `;
        contenedor.appendChild(div);
      });
    });
  }
  
  const botonIrABatalla = document.getElementById('ir-a-batalla');

  botonIrABatalla.addEventListener('click', () => {
    const equipoJugador = [];
    const slots = document.querySelectorAll('.slot');
  
    slots.forEach(slot => {
      const contenido = slot.textContent.trim();
      if (contenido !== '') {
        equipoJugador.push(contenido);
      }
    });
  
    if (equipoJugador.length === 3) {
      localStorage.setItem('equipoPokemon', JSON.stringify(equipoJugador));
      window.location.href = "batalla.html";
    } else {
      alert("Tu equipo debe tener exactamente 3 Pokémon.");
    }    
  });
  
  
