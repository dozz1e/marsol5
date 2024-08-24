const response = await fetch("https://mindicador.cl/api/uf", {
  method: "GET",
});
const datos = await response.json();
const indice = datos.serie[0].valor;

export default indice ;