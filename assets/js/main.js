/* Plano producto*/
class Producto{
    constructor (id, nombre, precio, stock, categoria,imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.imagen = imagen
    }
}

/*Lista de productos*/
let productos = [
  Mat = new Producto (1, "Mat", 2000, 10,"principal", `./assets/img/mat.png`),
  Cinturon = new Producto (2, "Cinturon", 1000, 10,"accesorio",`./assets/img/cinturon.png`),
  Bloque = new Producto (3, "Bloque", 500, 10,"principal", `./assets/img/bloques.png`),
  Porta = new Producto (4, "Porta", 1000, 10,"accesorio", `./assets/img/porta.png`),
  Backbender = new Producto (5, "Backbender",20000, 0, "principal",`./assets/img/backbender.png`)
];

/*Acumuladores*/
let cont_mat = 0;
let cont_cinturon = 0;
let cont_bloque = 0;
let cont_porta = 0;
let pedido = "";

/*Mediante el método map se genera un nuevo array con el valor del producto +IVA.
 El mismo será utilizado para la compra del usuario*/

function agregar_iva(producto){
    let iva = producto.precio*1.21;
    return{
        id: producto.id,
        nombre: producto.nombre,
        precio: iva,
        stock: producto.stock,
        categoria: producto.categoria,
        imagen: producto.imagen
    }
}

 let productos_iva = productos.map(agregar_iva);
 let lista_productos = document.getElementById ("contenedor_productos");


document.addEventListener("DOMContentLoaded", function(){

        // Mostrar productos
        mostrar_productos()


});

//Funciones

//Función resultado: determina el total de la compra.
function resultado(){
    return((productos_iva[0].precio*cont_mat)+(productos_iva[1].precio*cont_cinturon)+(productos_iva[2].precio*cont_bloque)+(productos_iva[3].precio*cont_porta));
}

//Función mostrar productos: carga productos en el DOM.
function mostrar_productos (){
    productos_iva.forEach(function(producto){
        let div_producto = document.createElement("div");
        div_producto.classList.add("tarjeta");

        let img_producto = document.createElement("img");
        img_producto.src = producto.imagen;
        img_producto.className = "img_producto"

        let titulo_producto = document.createElement("h3");
        titulo_producto.textContent = producto.nombre;
        titulo_producto.classList.add("titulo_producto");

        let cantidad_producto = document.createElement("input");
        cantidad_producto.innerText = "Cantidad";
        cantidad_producto.classList.add("cantidad_producto");

        let btn_comprar = document.createElement("button");
        btn_comprar.innerText = "Comprar";
        btn_comprar.classList.add("btn_comprar");


        //Agregar productos a la tarjeta
        div_producto.append(img_producto,titulo_producto,cantidad_producto,btn_comprar);
        
        // Agregamos productos al DOM
        lista_productos.append(div_producto);

    })
}

console.log(productos_iva);