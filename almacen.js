// Crea una variable almacén en la que guardes un array con objetos. Cada objeto será un departamento de la tienda y tendrás varios productos en cada uno. Cada uno de estos productos será un objeto con las siguientes propiedades: nombre, precio y stock.

const almacen = [
  {
    seccion: "fruteria",
    productos: [
      { nombre: "fresas", precio: 3, stock: 12 },
      { nombre: "peras", precio: 2, stock: 80 },
      { nombre: "uvas", precio: 4, stock: 30 },
      { nombre: "platanos", precio: 5, stock: 35 },
    ],
  },
  {
    seccion: "pescaderia",
    productos: [
      { nombre: "sardinas", precio: 3, stock: 34 },
      { nombre: "mero", precio: 20, stock: 7 },
      { nombre: "pulpo", precio: 10, stock: 12 },
    ],
  },
  {
    seccion: "carneceria",
    productos: [
      { nombre: "cordero", precio: 15, stock: 78 },
      { nombre: "ternera", precio: 26, stock: 39 },
      { nombre: "cerdo", precio: 11, stock: 129 },
    ],
  },
];

//Exporto el módulo
module.exports = almacen;
