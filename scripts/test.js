const preguntas = [
  { texto: "¿Te interesa la tecnología?", area: "informatica" },
  { texto: "¿Te gusta programar o resolver problemas técnicos?", area: "informatica" },
  { texto: "¿Te gustaría crear software o videojuegos?", area: "informatica" },
  { texto: "¿Eres bueno resolviendo problemas lógicos?", area: "informatica" },
  { texto: "¿Te interesan los números y las finanzas?", area: "contabilidad" },
  { texto: "¿Te gustaría trabajar en bancos o empresas?", area: "contabilidad" },
  { texto: "¿Te interesa llevar registros o controlar presupuestos?", area: "contabilidad" },
  { texto: "¿Prefieres trabajar con informes financieros?", area: "contabilidad" },
  { texto: "¿Te interesa la biología o la medicina?", area: "ciencia" },
  { texto: "¿Te gustaría trabajar en un laboratorio o un hospital?", area: "ciencia" },
  { texto: "¿Te gusta investigar o hacer experimentos?", area: "ciencia" },
  { texto: "¿Te interesa entender el cuerpo humano o la naturaleza?", area: "ciencia" },
  { texto: "¿Te gustaría emprender un negocio tecnológico?", area: "informatica" },
  { texto: "¿Te llama la atención la contabilidad pública?", area: "contabilidad" },
  { texto: "¿Te importa el cuidado del medio ambiente?", area: "ciencia" }
];

const formulario = document.getElementById("formulario");

preguntas.forEach((p, index) => {
  const div = document.createElement("div");
  div.classList.add("pregunta");
  div.innerHTML = `
    <p>${p.texto}</p>
    <div class="opciones">
      <button type="button" onclick="seleccionar(${index}, 'Sí', this)">Sí</button>
      <button type="button" onclick="seleccionar(${index}, 'No', this)">No</button>
    </div>
  `;
  formulario.appendChild(div);
});

let respuestas = Array(preguntas.length).fill(null);

function seleccionar(index, respuesta, btn) {
  respuestas[index] = respuesta;

  const botones = btn.parentElement.querySelectorAll("button");
  botones.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

document.getElementById("finalizar").addEventListener("click", () => {
  if (respuestas.includes(null)) {
    alert("Por favor, responde todas las preguntas.");
    return;
  }

  localStorage.setItem("respuestas", JSON.stringify(respuestas));
  window.location.href = "resultado.html";
});
