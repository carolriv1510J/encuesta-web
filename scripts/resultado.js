document.addEventListener("DOMContentLoaded", () => {
  const respuestas = JSON.parse(localStorage.getItem("respuestas") || "[]");

  const indices = {
    informatica: [0, 1, 2, 3, 12],
    contabilidad: [4, 5, 6, 7, 13],
    ciencia: [8, 9, 10, 11, 14]
  };

  let puntajes = { informatica: 0, contabilidad: 0, ciencia: 0 };

  for (let area in indices) {
    indices[area].forEach(i => {
      if (respuestas[i] === "Sí") puntajes[area]++;
    });
  }

  const area = Object.keys(puntajes).reduce((a, b) =>
    puntajes[a] > puntajes[b] ? a : b
  );

  localStorage.setItem("area", area);

  const areaTitulo = {
    informatica: "INFORMÁTICA 💻",
    contabilidad: "CONTABILIDAD 📊",
    ciencia: "CIENCIA 🧪"
  };

  const mensajeHTML = `
    <p class="titulo-area">Perteneces al área de ${areaTitulo[area]}</p>
    <p class="subtitulo-area">Elige una carrera que te interese:</p>
  `;
  document.getElementById("area").innerHTML = mensajeHTML;

  fetch("data/universidades.json")
    .then(res => res.json())
    .then(data => {
      const carrerasUnicas = [];

      data.forEach(item => {
        if (item.area === area && !carrerasUnicas.includes(item.carrera)) {
          carrerasUnicas.push(item.carrera);
        }
      });

      const contenedorCarreras = document.getElementById("carreras");
      contenedorCarreras.innerHTML = "";

      carrerasUnicas.forEach(carrera => {
        const div = document.createElement("div");
        div.classList.add("carrera-box");
        div.textContent = carrera;

        div.onclick = () => {
          // Quitar selección anterior
          document.querySelectorAll(".carrera-box").forEach(box =>
            box.classList.remove("seleccionada")
          );

          // Marcar seleccionada
          div.classList.add("seleccionada");

          // Mostrar universidades
          mostrarUniversidades(carrera, data);
        };

        contenedorCarreras.appendChild(div);
      });
    });
});

function mostrarUniversidades(carrera, data) {
  const lista = document.getElementById("universidades");
  lista.innerHTML = `<h3>Universidades que ofrecen: ${carrera}</h3>`;

  const resultados = data.filter(u => u.carrera === carrera);

  resultados.forEach(u => {
    const div = document.createElement("div");
    div.classList.add("carrera-box");
    div.innerHTML = `
      <strong>${u.universidad}</strong><br>
      Puntaje: ${u.puntaje}<br>
      Campo: ${u.campo}<br>
      ${u.malla ? `<a href="${u.malla}" target="_blank">Ver malla curricular</a>` : ""}
    `;
    lista.appendChild(div);
  });
}
