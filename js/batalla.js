const todosLosPokemon = [
    { nombre: "Charizard", tipo: "fire" },
    { nombre: "Blastoise", tipo: "water" },
    { nombre: "Venusaur", tipo: "grass" },
    { nombre: "Pikachu", tipo: "electric" },
    { nombre: "Snorlax", tipo: "normal" },
    { nombre: "Alakazam", tipo: "psychic" },
    { nombre: "Machamp", tipo: "fighting" },
    { nombre: "Gengar", tipo: "ghost" },
    { nombre: "Dragonite", tipo: "dragon" },
    { nombre: "Gyarados", tipo: "water" },
    { nombre: "Arcanine", tipo: "fire" },
    { nombre: "Jolteon", tipo: "electric" },
    { nombre: "Scizor", tipo: "bug" },
    { nombre: "Umbreon", tipo: "dark" }
  ];  
  
  // Lee el equipo real guardado en localStorage
  const nombresEquipo = JSON.parse(localStorage.getItem('equipoPokemon')) || [];

// Convierte nombres en objetos reales desde todosLosPokemon
const equipoJugador = nombresEquipo.map(nombre => 
  todosLosPokemon.find(p => p.nombre.toLowerCase() === nombre.toLowerCase())
).filter(Boolean);

// Si el equipo está incompleto, lo rellena aleatoriamente
if (equipoJugador.length < 3) {
    alert("Tu equipo está incompleto. Vuelve al constructor.");
    window.location.href = "equipo.html";
  }  
  
  // Mini tabla de efectividad por tipo
  const efectividad = {
    fire: { grass: 2, water: 0.5, electric: 1, psychic: 1, normal: 1, fire: 0.5 },
    water: { fire: 2, grass: 0.5, electric: 1, psychic: 1, normal: 1, water: 0.5 },
    grass: { water: 2, fire: 0.5, electric: 1, psychic: 1, normal: 1, grass: 0.5 },
    electric: { water: 2, grass: 0.5, fire: 1, psychic: 1, normal: 1, electric: 0.5 },
    normal: { normal: 1, fire: 1, water: 1, grass: 1, electric: 1, psychic: 1 },
    psychic: { normal: 1, fire: 1, water: 1, grass: 1, electric: 1, psychic: 0.5 }
  };
  
  function generarEquipoRival() {
    const seleccionados = [];
    while (seleccionados.length < 3) {
      const random = todosLosPokemon[Math.floor(Math.random() * todosLosPokemon.length)];
      if (!seleccionados.includes(random)) {
        seleccionados.push(random);
      }
    }
    return seleccionados;
  }
  
  function mostrarEquipo(contenedorId, equipo) {
    const contenedor = document.getElementById(contenedorId);
    contenedor.innerHTML = "";
    equipo.forEach(p => {
      const div = document.createElement("div");
      div.className = "slot";
      div.innerHTML = `
        <img src="https://img.pokemondb.net/sprites/black-white/normal/${p.nombre.toLowerCase()}.png" alt="${p.nombre}" width="64" height="64">
        <p>${p.nombre}</p>
      `;
      contenedor.appendChild(div);
    });
  }
  
  function simularBatalla() {
    const rival = generarEquipoRival();
    mostrarEquipo("equipo-rival", rival);
  
    let puntosJugador = 0;
    let puntosRival = 0;
  
    for (let i = 0; i < 3; i++) {
      const p1 = equipoJugador[i];
      const p2 = rival[i];
      const mult = efectividad[p1.tipo]?.[p2.tipo] || 1;
      const multRival = efectividad[p2.tipo]?.[p1.tipo] || 1;
  
      if (mult > multRival) puntosJugador++;
      else if (mult < multRival) puntosRival++;
      else {
        Math.random() < 0.5 ? puntosJugador++ : puntosRival++;
      }
    }
  
    const resultadoTexto = puntosJugador > puntosRival
      ? "🎉 ¡Ganaste la batalla!"
      : puntosJugador < puntosRival
      ? "😢 Perdiste la batalla"
      : "🤝 Empate";
  
      const resultadoDiv = document.getElementById("resultado-batalla");
      // Muestra resultado como pantalla completa
const pantalla = document.getElementById("pantalla-final");
pantalla.textContent = resultadoTexto;
pantalla.classList.add("mostrar");

// Oculta automáticamente después de 3 segundos
setTimeout(() => {
  pantalla.classList.remove("mostrar");
}, 3000);
      resultadoDiv.className = ""; // Limpia clases anteriores
      
      if (puntosJugador > puntosRival) {
        resultadoDiv.classList.add("resultado-ganar");
      } else if (puntosJugador < puntosRival) {
        resultadoDiv.classList.add("resultado-perder");
      } else {
        resultadoDiv.classList.add("resultado-empate");
      }
      
  }
  
  mostrarEquipo("equipo-jugador", equipoJugador);
  document.getElementById("iniciar-batalla").addEventListener("click", simularBatalla);
  
  window.addEventListener("DOMContentLoaded", () => {
    const equipoJugador = JSON.parse(localStorage.getItem("equipoJugador")) || [];
    const contenedorEquipo = document.getElementById("equipo-jugador");
  
    if (equipoJugador.length === 0) {
      contenedorEquipo.innerHTML = "<p>No tienes ningún Pokémon en tu equipo.</p>";
      return;
    }
  
    equipoJugador.forEach(nombre => {
      const div = document.createElement("div");
      div.classList.add("pokemon-slot");
      div.innerText = nombre;
      contenedorEquipo.appendChild(div);
    });
  });
  