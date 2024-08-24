const response = await fetch(
  "https://marsolpropiedades.cl/data/graphql",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: `{
      propiedades(where: {categoryId: 2}, first: 30) {
        nodes {
          title
          slug
          youtube {
            youtube
          }
          precio {
            precio
            precioUf
          }
          operacion {
            operacion
          }
          incluye {
            incluye
          }
          importancia {
            importancia
          }
          featuredImage {
            node {
              sourceUrl(size: MEDIUM)
              altText
              link
            }
          }
          espaciosComunes {
            espaciosComunes
          }
          direccion {
            ciudad
            direccion
          }
          detallesAdicionales {
            detalles
          }
          datos {
            areaTotal
            banos
            habitaciones
          }
          categoriaGraphql {
            categoria
          }
          agentes {
            agentes
          }
          seo {
            metaKeywords
            metaDesc
            title
          }
        }
      }
    }`,
  }),
  });

const datos = await response.json();
const propiedades = datos.data.propiedades.nodes;
const destacadas = propiedades.filter((pp) => { if (pp.importancia.importancia == "Alto") return pp; });
const nuevas = propiedades.slice(0, 6);
let tipo = propiedades.map((pp) => pp.categoriaGraphql.categoria);
tipo = new Set(tipo);
tipo = Array.from(tipo);
let ciudad = propiedades.map((pp) => pp.direccion.ciudad);
ciudad = new Set(ciudad);
ciudad = Array.from(ciudad);
let links = ["Venta", "Arriendo"]
links = links.concat(tipo);

export { propiedades, destacadas, nuevas, tipo, ciudad, links };