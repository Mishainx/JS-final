/* Plano producto*/
class Producto {
    constructor(id, nombre, precio, stock, categoria, imagen) {
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
    Mat = new Producto(1, "Mat", 2000, 10, "principal", `./assets/img/mat.png`),
    Cinturon = new Producto(2, "Cinturon", 1000, 10, "accesorio", `./assets/img/cinturon.png`),
    Bloque = new Producto(3, "Bloque", 500, 10, "principal", `./assets/img/bloques.png`),
    Porta = new Producto(4, "Porta", 1000, 10, "accesorio", `./assets/img/porta.png`),
    Backbender = new Producto(5, "Backbender", 20000, 0, "principal", `./assets/img/backbender.png`)
];

/*Mediante el método map se genera un nuevo array con el valor del producto +IVA.
 El mismo será utilizado para la compra del usuario*/

function agregar_iva(producto) {
    let iva = producto.precio * 1.21;
    return {
        id: producto.id,
        nombre: producto.nombre,
        precio: iva,
        stock: producto.stock,
        categoria: producto.categoria,
        imagen: producto.imagen
    }
}

/*Variables globales*/
let carrito = [];
let productos_iva = productos.map(agregar_iva);
let lista_productos = document.getElementById("contenedor_productos");
let carrito_icono = document.getElementById("carrito_icono");
let carrito_display = document.getElementById("carrito");
let main = document.getElementById("principal");
let total = document.getElementById("total");

carrito_icono.addEventListener("click", (e) => {
    carrito_display.classList.toggle("active")
    carrito_display.classList.toggle("d-block")
    main.classList.toggle("w-70")
})


document.addEventListener("DOMContentLoaded", function () {

    // Mostrar productos
    mostrar_productos()

    //Agregar item
    agregar_producto()

    //Mostrar carrito
    mostrar_carrito()
    

});

//Funciones

//Función mostrar productos: carga productos en el DOM.
function mostrar_productos() {
    productos_iva.forEach(function (producto) {
        let div_producto = document.createElement("div");
        div_producto.classList.add("tarjeta");

        let img_producto = document.createElement("img");
        img_producto.src = producto.imagen;
        img_producto.className = "img_producto"

        let titulo_producto = document.createElement("h3");
        titulo_producto.textContent = producto.nombre;
        titulo_producto.classList.add("titulo_producto");

        let precio_producto = document.createElement("p");
        precio_producto.textContent = producto.precio;

        let cantidad_producto = document.createElement("input");
        cantidad_producto.innerText = "Cantidad";
        cantidad_producto.classList.add("cantidad_producto");

        let btn_comprar = document.createElement("button");
        btn_comprar.innerText = "Comprar";
        btn_comprar.classList.add("btn_comprar");

        //Agregar productos a la tarjeta
        div_producto.append(img_producto, titulo_producto, precio_producto, cantidad_producto, btn_comprar);

        // Agregamos productos al DOM
        lista_productos.append(div_producto);

    })

}

//Función agregar_producto: Genera un item y lo agrega al carrito
function agregar_producto() {
    let botones_comprar = document.querySelectorAll(".btn_comprar");
    for (let boton of botones_comprar) {
        boton.addEventListener("click", agregar_elemento);
    }

    function agregar_elemento(e) {
        let hijo = e.target;
        let padre = hijo.parentNode;
        if (padre.querySelector("input").value > 0) {
            let item = {
                imagen: `${padre.querySelector("img").src}`,
                nombre: `${padre.querySelector("h3").innerText}`,
                cantidad: `${padre.querySelector("input").value}`,
                precio: `${padre.querySelector("p").innerText * padre.querySelector("input").value}`,
            }

            //Agregar item al carrito
            carrito.push(item);

            carrito_json = JSON.stringify(carrito);
            sessionStorage.setItem("carrito", carrito_json);
       
            carrito_display.innerHTML = ``;
            suma_productos()
            console.log(suma_productos());
            total.innerHTML = `Su total es ${suma_productos()}`;
            mostrar_carrito();

        }
    }
}

//Función mostrar carrito: parse carrito del local storage y renderiza los productos seleccionados
function mostrar_carrito(){
    let carrito_parse =sessionStorage.getItem("carrito")
    carrito_parse = JSON.parse(carrito_parse)

    carrito_parse.forEach(function(producto){
        const div_producto = document.createElement("div");
        div_producto.classList.add("item");

        const img_producto = document.createElement("img");
        img_producto.src = `${producto.imagen}`;
        img_producto.classList.add("item_img");

        const nombre_producto = document.createElement("p");
        nombre_producto.textContent = `${producto.nombre}`;

        const cantidad_producto = document.createElement("p");
        cantidad_producto.textContent = `${producto.cantidad}`;

        const subtotal_producto = document.createElement("p");
        subtotal_producto.textContent = `${producto.precio}`;

        const btn_eliminar = document.createElement("i");
        btn_eliminar.classList.add("icofont-trash");


        div_producto.append(img_producto,nombre_producto,cantidad_producto,subtotal_producto,btn_eliminar);
        carrito_display.append(div_producto,total);
    })
    let botones_borrar = document.querySelectorAll(".icofont-trash")
    for (let boton of botones_borrar){
        boton.addEventListener("click",quitar);
    }
    total.innerHTML = `Su total es ${suma_productos()}`;
}

 //Función quitar: elimina un elemento de la lista y actualiza el total
 function quitar(e){
    let hijo = e.target;
    let padre = hijo.parentNode;    
    padre.remove();
}

//función suma productos
function suma_productos(){
    let carrito_parse =sessionStorage.getItem("carrito");
    carrito_parse = JSON.parse(carrito_parse);

    let venta_total = carrito_parse.reduce(calcular_total, 0);
    return(venta_total);
        
}

function calcular_total (acu,producto){
    acu = acu + parseInt(producto.precio);
    return acu
}


let carrito_parse =sessionStorage.getItem("carrito");
carrito_parse = JSON.parse(carrito_parse);
console.log(carrito_parse);