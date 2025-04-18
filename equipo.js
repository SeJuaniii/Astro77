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
        slot.style.borderColor = '#999';
        actualizarGrafico();
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
  