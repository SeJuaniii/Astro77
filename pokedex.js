document.getElementById('search').addEventListener('input', async function () {
    const query = this.value.trim().toLowerCase();
    if (!query) return;
  
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!response.ok) throw new Error('Pokémon no encontrado');
  
      const data = await response.json();
  
      // Nombre
      document.getElementById('nombre-pokemon').textContent = data.name.toUpperCase();
  
      // Sprites
      const spritesHTML = `
  <img src="${data.sprites.front_default}" alt="${data.name}" class="sprite" title="Normal">
  <img src="${data.sprites.front_shiny}" alt="${data.name}" class="sprite" title="Shiny">
`;
      document.getElementById('sprites').innerHTML = spritesHTML;
  
      // Tipo
      const tipoElemento = document.getElementById('tipo');
const primerTipo = data.types[0].type.name.toLowerCase(); // solo usamos el primero para el color
tipoElemento.textContent = data.types.map(t => t.type.name.toUpperCase()).join(', ');
tipoElemento.className = `tipo-${primerTipo}`; // agrega clase como "tipo-fire"
  
      // Habilidades
      const habilidadesHTML = data.abilities
  .map(h => `<span class="ability">${h.ability.name}</span>`)
  .join(' ');
document.getElementById('habilidades').innerHTML = habilidadesHTML; 
  
      // Stats
      const getStat = name => data.stats.find(s => s.stat.name === name)?.base_stat;
      document.getElementById('hp').textContent = getStat('hp');
      document.getElementById('atk').textContent = getStat('attack');
      document.getElementById('def').textContent = getStat('defense');
  
      // Movimientos
      const movimientos = data.moves.map(m => `<li>${m.move.name}</li>`).join('');
      document.getElementById('lista-movimientos').innerHTML = movimientos;
  
    } catch (error) {
      console.error(error);
      document.getElementById('nombre-pokemon').textContent = 'No encontrado';
      document.getElementById('sprites').innerHTML = '';
      document.getElementById('tipo').textContent = '';
      document.getElementById('habilidades').textContent = '';
      document.getElementById('hp').textContent = '';
      document.getElementById('atk').textContent = '';
      document.getElementById('def').textContent = '';
      document.getElementById('lista-movimientos').innerHTML = '';
    }
  });
  