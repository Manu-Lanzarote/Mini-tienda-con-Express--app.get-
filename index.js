// EXTRA
// Crea una aplicación que simule una tienda online.

//Crea una variable almacén en la que guardes un array con objetos. Cada objeto será un departamento de la tienda y tendrás varios productos en cada uno. Cada uno de estos productos será un objeto con las siguientes propiedades: nombre, precio y stock. Crea también una variable cesta.
//OK

// Crea las siguientes rutas:
// Dos rutas diferentes para cada uno de los departamentos de la tienda.
// Una ruta devolverá en la respuesta todos los productos que hay en ese departamento. Haz que se muestre en una tabla HTML.
//OK
// La otra ruta servirá para comprar productos. Esta ruta recibirá dos parámetros: nombre del producto y cantidad. Añadir a la variable cesta el producto y la cantidad seleccionada Si la cantidad pedida es mayor que el stock, devolveremos un mensaje avisando de que no hay stock suficiente.
//OK

// Una ruta para mostrar la cesta.

// Una ruta para confirmar la compra. Esta ruta devolverá un mensaje de confirmación y vaciará la cesta.

// 1- Instalo express desde el terminal.
//OK

//Importo el almacén y la cesta
const almacen = require("./almacen");
let cesta = require("./cesta");

//3- Enciendo express y enciendo el servidor.
//OK

const express = require("express");
const app = express();

// 4 - Crea las siguientes rutas:
// Dos rutas diferentes para cada uno de los departamentos de la tienda.
// Una ruta devolverá en la respuesta todos los productos que hay en ese departamento. Haz que se muestre en una tabla HTML.

//Ruta a la que le entrará la petición por parámetro  y que devolverá los productos que hay en ese departamento
app.get("/departamento/:departamento", (req, res) => {
  let usuario = req.params.departamento;

  //Compruebo si el departamento que pide el usuario existe en el almacen
  let boolean = false;
  let indice = 0.1;
  for (let i = 0; i < almacen.length; i++) {
    let seccion = almacen[i].seccion;
    if (usuario === seccion) {
      boolean = true;
      indice = i;
    }
  }
  //Si el departamento existe, devuelvo los productos que hay dentro
  let contenidoTabla = "";
  if (boolean === true) {
    console.log("Índice de departamento: " + indice);
    for (let i = 0; i < almacen.length; i++) {
      contenidoTabla += `
      <tr>
        <td>${almacen[indice].productos[i].nombre}</td>
        <td>${almacen[indice].productos[i].precio}</td>
        <td>${almacen[indice].productos[i].stock}</td>
      </tr>
      `;
    }
  }
  //Y si no existe, aviso al usuario
  else {
    console.log("El departamento introducido no existe");
  }
  //Tabla para insertar en el front
  let tabla = `
     <table>
       <thead>
         <tr>
           <th>Nombre</th>
           <th>Precio</th>
           <th>Stock</th>
         </tr>
       </thead>
       <tbody>
         ${contenidoTabla}
       </tbody>
     </table>
   `;

  res.send(tabla);
});

// 5 -
//La otra ruta servirá para comprar productos EN LA FRUTERÍA. Esta ruta recibirá dos parámetros: nombre del producto y cantidad. Añadir a la variable cesta el producto y la cantidad seleccionada.

app.get("/fruteria/:producto/:cantidad", (req, res) => {
  //for para comprobar si el producto existe
  let producto = req.params.producto;
  let cantidad = req.params.cantidad;
  let indice = 0.1;
  let aux = false;

  for (let i = 0; i < almacen[0].productos.length; i++) {
    //Si el producto existe devuelve el índice.
    if (producto === almacen[0].productos[i].nombre) {
      aux = true;
      console.log(producto);
      indice = i;
      //console.log(indice);
      break;
    }
  }
  if (aux) {
    if (cantidad <= almacen[0].productos[indice].stock) {
      //Le resto la cantidad solicitada por el usuario al stock 0J0 USAR '-=' (no funciona solo con '-')
      almacen[0].productos[indice].stock -= cantidad;
      console.log("Producto en stock");
      //Y subo la selección al array cesta
      cesta.push({
        producto: producto,
        cantidad: cantidad,
        stock: almacen[0].productos[indice].stock,
      });
      res.send(`Se han añadido ${cantidad} ${producto} a la cesta`);
    } else {
      res.send("La cantidad solicitada es mayor que el stock");
    }
  } else {
    //Si no existe, devuelve un mensaje de error.
    res.send("El producto no existe");
  }
});

//6 -
// Una ruta para mostrar la cesta.
app.get("/cesta", (req, res) => {
  //Creo una condición para comprobar que la cesta, (que es un array), contiene algo. Si no contiene nada devuelvo un mensaje de que está vacía y si contiene algo, devuelvo lo que tenga.
  let mensaje = "";
  //Si cesta.length no tiene nada, devuelve false
  if (cesta.length) {
    //como cesta es un array, lo recorro para mostrar el contenido
    for (let i = 0; i < cesta.length; i++) {
      mensaje += `
        <h1>${cesta[i].producto}</h1>
        <p>Cantidad: ${cesta[i].cantidad}</p>
        <p>Stock: ${cesta[i].stock}</p>
      `;
    }
    res.send(mensaje);
  } else {
    res.send(`<p>No has añadido nada a la cesta</p>`);
  }
});

//Una ruta para confirmar la compra. Esta ruta devolverá un mensaje de confirmación y vaciará la cesta.
app.get("/comprar", (req, res) => {
  cesta = [];
  res.send("Compra confirmada");
});

app.listen(3000);
