1. Inicio (Home)
Hero animado con logo “Astro 7.7” y tagline:
“Explora el mundo Pokémon como nunca antes”

Fondo dinámico con partículas suaves (estrellas, niebla) que se mueven lentamente.

Enlaces destacados en tarjetas giratorias:

Tipos Pokémon

Pokédex Interactiva

Constructor de Equipo

Simulador de Batalla

Quiz & Tests

Acerca de / Contacto

2. Tipos Pokémon
Tabla de Tipos (18×18) maquetada con CSS Grid

Hover / Click en cada celda:

Efectos de partículas temáticas (hojas para Planta, llamas para Fuego, etc.)

Animaciones CSS keyframes (olas, chispa eléctrica, bruma fantasmal…)

Sonido breve opcional al interactuar

Modal de detalle que aparece sobre la página (sin recargar):

Nombre del tipo, fortalezas/debilidades

Movimientos icónicos y descripciones

Icono en alta resolución y curiosidades

3. Pokédex Interactiva
Buscador con autocompletar (Fetch API desde JSON local)

Tarjeta Pokémon animada (entrada con flip o fade):

Imagen oficial / fan art

Nombre, número, tipos

Estadísticas base (HP, Ataque, Defensa…)

Descripción breve

Galería desplegable o carrusel de sprites

4. Constructor de Equipo
Área drag & drop con 6 ranuras vacías

Panel de selección de Pokémon arrastrables

Sugerencias automáticas de sinergias de tipos

Gráfico de cobertura de tipos en barras (Chart.js)

5. Simulador de Batalla
Selección de equipos (3 vs 3)

Turnos animados con log de acciones (DOM dinámico)

Cálculo de efectividad automática según tipos

Resultado final con animación de victoria/derrota

6. Quiz & Tests
Quiz de Professor Oak: preguntas de opción múltiple sobre tipos, regiones y estadísticas

Test de personalidad: determina “qué Entrenador Pokémon eres” a partir de un pequeño formulario

Resultados presentados con animaciones y recomendaciones de equipo

7. Acerca de / Contacto
Tu biografía y proceso de aprendizaje presentado como línea de tiempo interactiva

Formulario de contacto sencillo (email)

Enlaces a tu GitHub y redes

8. Extras / Easter Eggs
Cursor personalizado: Pokéball que sigue el mouse

Pikachu oculto que aparece y sigue el cursor en un área especial

Toggle Modo Oscuro con tema “Team Rocket”

Feature Clusters

Cluster	Funcionalidades clave	Tecnologías sugeridas
UI Global	Navbar fija, footer, toggle oscuro, diseño responsive	Tailwind CSS o CSS puro + variables
Animaciones & Efectos	Partículas (Particles.js / tsParticles), keyframes CSS, Canvas API	Particles.js, Canvas, CSS Animations
Datos & Fetch	JSON local para Pokédex y tipos, Fetch API para quiz	Fetch API, JSON
Interactividad	Modales, drag & drop, autocompletar, tooltips	Vanilla JS, Alpine.js opcional
Gráficos	Chart de cobertura de tipos, carrusel de imágenes	Chart.js
Sonido	Efectos cortos en hover/click	Howler.js
Cronograma (17–24 abril)

Fechas	Enfoque Sprint
17 abril	Setup repo y estructura: Home + Navbar + Footer
18 abril	Sección Tipos: tabla estática + estilos básicos
19 abril	Tipos con partículas y modales
20 abril	Pokédex: búsqueda + tarjetas animadas
21 abril	Constructor de Equipo + gráfico de cobertura
22 abril	Simulador de Batalla básico
23 abril	Quiz & Tests
24 abril	Ajustes responsive, performance, pruebas cross-browser y despliegue