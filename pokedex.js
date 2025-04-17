document.getElementById("search").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const query = e.target.value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(res => res.json())
      .then(data => {
        const result = `
  <div class="pokemon-card">
    <h2>${data.name.toUpperCase()}</h2>
    <div class="sprites">
      <img src="${data.sprites.front_default}" alt="${data.name}" title="Normal" />
      <img src="${data.sprites.front_shiny}" alt="${data.name} shiny" title="Shiny" />
    </div>
    <p><strong>Tipo:</strong> ${data.types.map(t => `<span class="type ${t.type.name}">${t.type.name.toUpperCase()}</span>`).join(" ")}</p>
   <p><strong>Habilidades:</strong> ${data.abilities.map(a => `<span class="ability">${a.ability.name}</span>`).join(" ")}</p>
    <p><strong>HP:</strong> ${data.stats[0].base_stat}</p>
    <p><strong>Ataque:</strong> ${data.stats[1].base_stat}</p>
    <p><strong>Defensa:</strong> ${data.stats[2].base_stat}</p>
  </div>
`;
        document.getElementById("pokedex-result").innerHTML = result;
        const movimientosNivel = mostrarMovimientosPorNivel(data.moves);
const listaUl = document.getElementById('lista-movimientos');
listaUl.innerHTML = movimientosNivel.map(m => `<li>${m.nombre.toUpperCase()} (Nivel ${m.nivel})</li>`).join('');
      })
      .catch(() => {
        document.getElementById("pokedex-result").innerHTML = "<p>No se encontró ese Pokémon 😢</p>";
      });
  }
});

function mostrarMovimientosPorNivel(movimientos) {
    const movimientosNivel = movimientos.filter(mov => {
      return mov.version_group_details.some(detalle => 
        detalle.move_learn_method.name === 'level-up'
      );
    });
  
    const listaMovimientos = movimientosNivel.map(mov => {
      const nivel = mov.version_group_details.find(d => d.move_learn_method.name === 'level-up')?.level_learned_at || 0;
      return { nombre: mov.move.name, nivel };
    });
  
    // Ordenamos por nivel
    listaMovimientos.sort((a, b) => a.nivel - b.nivel);
  
    return listaMovimientos;
  }
  
