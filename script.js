tsParticles.load("tsparticles", {
    fullScreen: {
      enable: true,
      zIndex: -1
    },
    background: {
      color: "#0c0c22"
    },
    particles: {
      number: { value: 60 },
      size: { value: 2 },
      move: {
        enable: true,
        speed: 0.4,
        outMode: "bounce"
      },
      opacity: {
        value: 0.5
      },
      color: { value: "#ffffff" }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" }
      },
      modes: {
        repulse: { distance: 100 }
      }
    }
  });
  