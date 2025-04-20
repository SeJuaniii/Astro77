document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quizForm");
    const preguntasDiv = document.getElementById("preguntasContainer");
    const resultadoDiv = document.getElementById("resultadoQuiz");
    const progresoBarra = document.getElementById("barraProgreso");
  
    const resultados = {
      fuego: {
        texto: "🔥 ¡Eres valiente, impulsivo y ardiente como Charizard!",
        imagen: "../assets/charizard.png"
      },
      agua: {
        texto: "💧 Estratégico y tranquilo, ¡eres como Blastoise!",
        imagen: "../assets/blastoise.png"
      },
      planta: {
        texto: "🌱 Paciente y sabio, eres como Venusaur.",
        imagen: "../assets/venusaur.png"
      }
    };
  
    const bancoPreguntas = [
      {
        texto: "¿Qué prefieres en una batalla?",
        opciones: [
          { texto: "Atacar sin dudar", valor: "fuego" },
          { texto: "Controlar el ritmo", valor: "agua" },
          { texto: "Adaptarme y pensar", valor: "planta" }
        ]
      },
      {
        texto: "¿Qué entorno prefieres?",
        opciones: [
          { texto: "Ríos y océanos", valor: "agua" },
          { texto: "Zonas volcánicas y áridas", valor: "fuego" },
          { texto: "Bosques y campos", valor: "planta" }
        ]
      },
      {
        texto: "¿Cuál es tu mejor cualidad?",
        opciones: [
          { texto: "Paciencia", valor: "planta" },
          { texto: "Valentía", valor: "fuego" },
          { texto: "Calma", valor: "agua" }
        ]
      },
      {
        texto: "¿Cuál sería tu Pokémon inicial?",
        opciones: [
          { texto: "Charmander", valor: "fuego" },
          { texto: "Squirtle", valor: "agua" },
          { texto: "Bulbasaur", valor: "planta" }
        ]
      },
      {
        texto: "¿Con cuál frase te identificas más?",
        opciones: [
          { texto: "Sé como el agua", valor: "agua" },
          { texto: "Crecer toma tiempo", valor: "planta" },
          { texto: "Arde con pasión", valor: "fuego" }
        ]
      },
      {
        texto: "¿Cuál es tu estación favorita?",
        opciones: [
          { texto: "Verano", valor: "fuego" },
          { texto: "Invierno", valor: "agua" },
          { texto: "Primavera", valor: "planta" }
        ]
      },
      {
        texto: "¿Qué animal te representa más?",
        opciones: [
          { texto: "Dragón", valor: "fuego" },
          { texto: "Tortuga", valor: "agua" },
          { texto: "Dinosaurio", valor: "planta" }
        ]
      }
    ];
  
    const preguntasSeleccionadas = bancoPreguntas.sort(() => 0.5 - Math.random()).slice(0, 5);
    preguntasSeleccionadas.forEach((p, index) => {
      const contenedor = document.createElement("div");
      contenedor.classList.add("question");
      contenedor.innerHTML = `<p>${index + 1}. ${p.texto}</p>` +
        p.opciones.map(opt =>
          `<label><input type="radio" name="q${index + 1}" value="${opt.valor}"> ${opt.texto}</label><br>`
        ).join("");
      preguntasDiv.appendChild(contenedor);
    });
  
    form.addEventListener("change", () => {
      const total = preguntasSeleccionadas.length;
      const contestadas = Array.from(form.elements).filter(el => el.checked).length;
      const porcentaje = (contestadas / total) * 100;
      progresoBarra.style.width = `${porcentaje}%`;
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const conteo = { fuego: 0, agua: 0, planta: 0 };
      let respondidas = 0;
  
      preguntasSeleccionadas.forEach((_, i) => {
        const seleccionada = document.querySelector(`input[name="q${i + 1}"]:checked`);
        if (seleccionada) {
          conteo[seleccionada.value]++;
          respondidas++;
        }
      });
  
      if (respondidas < preguntasSeleccionadas.length) {
        resultadoDiv.innerHTML = `<p style="color: red;">⚠️ Por favor, responde todas las preguntas.</p>`;
        return;
      }
  
      const tipoGanador = Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];
      const res = resultados[tipoGanador];
  
      resultadoDiv.innerHTML = `
        <div class="resultado-final">
          <h3>${res.texto}</h3>
          <img src="${res.imagen}" alt="${tipoGanador}">
          <br><br>
          <button id="reiniciarQuiz">🔄 Reintentar</button>
          <button id="botonCompartir">📲 Compartir</button>
        </div>
      `;
  
      document.getElementById("reiniciarQuiz").addEventListener("click", () => {
        location.reload();
      });
  
      document.getElementById("botonCompartir").addEventListener("click", () => {
        if (navigator.share) {
          navigator.share({
            title: 'Mi tipo Pokémon',
            text: res.texto,
            url: window.location.href
          });
        } else {
          alert("Tu navegador no admite compartir. Copia este texto:\n" + res.texto);
        }
      });
    });
  });
  