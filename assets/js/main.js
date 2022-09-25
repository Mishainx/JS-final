/* Desafío Librerías:
1) Sweet Alert: Al comprar, sale un mensaje con un check de relevancia para indicar al usuario que la compra se realizó con éxito
2) Toastify: una notificación sutil para indicar al usuario que el producto se agrego al corrito correctamente
3) AOS: una sutil animación para cortar la estaticidad de la página
*/

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
    Backbender = new Producto(5, "Backbender", 10000, 0, "principal", `./assets/img/backbender.png`),
    Bolster = new Producto(6, "Bolster", 2000, 10, "principal", `./assets/img/bolster.png`)

];


/*Variables globales*/
let carrito = [];
let productos_iva = productos.map(agregar_iva);
let lista_productos = document.getElementById("contenedor_productos");
let carrito_icono = document.getElementById("carrito_icono");
let carrito_display = document.getElementById("carrito");
let main = document.getElementById("principal");
let total = document.getElementById("total");
let finalizar_compra = document.getElementById("finalizar_comprar");
let clima = document.getElementById("contenedor_clima");
let restore = sessionStorage.getItem ("carrito");
    restore = JSON.parse(restore);
    (restore == null) ? (carrito=[]) : (carrito =[...restore]);


document.addEventListener("DOMContentLoaded", function () {

    // Mostrar productos
    mostrar_productos()

    //Agregar item
    agregar_producto()

    //Mostrar carrito
    mostrar_carrito()

});

//Funciones

// Evento click en ícono carrito
carrito_icono.addEventListener("click", (e) => {
    carrito_display.classList.toggle("active")
    carrito_display.classList.toggle("d-block")
    main.classList.toggle("w-70")
})

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

        let id_producto = document.createElement("p");
        id_producto.textContent = producto.id;
        id_producto.classList.add("id_producto");
        

        let precio_producto = document.createElement("div");

        let simbolo_moneda = document.createElement("p");
        simbolo_moneda.textContent = "$";
        let precio_p = document.createElement("p");
        precio_p.textContent = producto.precio;
        precio_p.classList.add("precio")
        precio_producto.append(simbolo_moneda, precio_p);

        let cantidad_producto = document.createElement("input");
        cantidad_producto.innerText = "Cantidad";
        cantidad_producto.placeholder = "cantidad"
        cantidad_producto.classList.add("cantidad_producto");

        let btn_comprar = document.createElement("button");
        btn_comprar.innerText = "Comprar";
        btn_comprar.classList.add("btn_comprar");

        //Agregar productos a la tarjeta
        div_producto.append(img_producto, titulo_producto, precio_producto, cantidad_producto, btn_comprar, id_producto);

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
                precio: `${padre.querySelector(".precio").innerText * padre.querySelector("input").value}`,
                id: `${padre.querySelector(".id_producto").innerText}`,
            }
            //Agregar item al carrito
            carrito.push(item);

            carrito_json = JSON.stringify(carrito);
            sessionStorage.setItem("carrito", carrito_json);

            carrito_display.innerHTML = ``;
            mostrar_carrito();
            total.innerHTML = `Su total es ${suma_productos()}`;

            Toastify({

                text: "producto agregado",
                position: "left",
                gravity: "bottom",
                style: {
                    background: "linear-gradient(to right, #616495, #53557f)",
                    fontSize: "10px",
                    fontFamily: "tango",
                  },
                                
                duration: 1500
                
                }).showToast();

        }
    }
}

//Función mostrar carrito: parse carrito del local storage y renderiza los productos seleccionados
function mostrar_carrito() {
    let carrito_parse = sessionStorage.getItem("carrito")
    carrito_parse = JSON.parse(carrito_parse)


        if (carrito_parse != null){
            for (let i=0; i<=productos.length;i++){
                const resultado_filter = carrito_parse.filter((producto) => producto.id.includes (1+i));  
                const venta_producto = resultado_filter.reduce((acu , producto) => acu + parseInt(producto.precio)  , 0);
                const cantidad_producto = resultado_filter.reduce((acu , producto) => acu + parseInt(producto.cantidad)  , 0);
                
                if (venta_producto >0 ){
                    const div_producto = document.createElement("div");
                    div_producto.classList.add("item");
                    
                    const img_producto = document.createElement("img");
                    img_producto.src = productos[i].imagen;
                    img_producto.classList.add("item_img");
    
                    const nombre_producto = document.createElement("p");
                    nombre_producto.textContent = productos[i].nombre;
    
                    const cantidad_prod = document.createElement("p");
                    cantidad_prod.textContent = cantidad_producto;
    
                    const subtotal_producto = document.createElement("p");
                    subtotal_producto.textContent = venta_producto;
    
                    const btn_eliminar = document.createElement("i");
                    btn_eliminar.classList.add("icofont-trash");
    
                    const id_producto = document.createElement("p");
                    id_producto.innerText = productos[i].id;
                    id_producto.classList.add("id_producto");
                    
                    div_producto.append(img_producto,nombre_producto,cantidad_prod,subtotal_producto,btn_eliminar, id_producto)
                    carrito_display.append(div_producto,total,finalizar_compra)

                    total.innerHTML = `Su total es ${suma_productos()}`;
                    finalizar_compra.innerHTML = `<button id="sweet_compra">Comprar</button>`
                    finalizar_compra.classList.add ("btn_finalizar_comprar");
                    
                }
    let botones_borrar = document.querySelectorAll(".icofont-trash")

    for (let boton of botones_borrar) {
        boton.addEventListener("click", quitar);
    }

        }

    }}  

    



//Función quitar: elimina un elemento de la lista y actualiza el total
function quitar(e) {
    let hijo = e.target;
    let padre = hijo.parentNode;
    padre.remove();
    let tutu = carrito.length

    for (let i=0; i< tutu ;i++){
        let resultado_find = carrito.find(buscar_id);
        if (resultado_find == undefined) {
            console.log(resultado_find)
            break;
        }

        function buscar_id(producto){
            return producto.id == padre.childNodes[5].textContent;     
        }
       let borrar_carrito = carrito.splice(carrito.indexOf(resultado_find),1);
    }
    carrito_json = JSON.stringify(carrito);
    sessionStorage.setItem("carrito", carrito_json);
    suma_productos() != 0 ?  total.innerHTML = `<p>Su total es = $ ${suma_productos()}</p>` :  total.innerHTML = ``;
    if (suma_productos() ==0){
        finalizar_compra.innerHTML = ``;
    } 


}

/*Función agregar IVA*/

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
console.log(carrito)
function suma_productos(){
    return carrito.reduce((acu , producto) => acu + parseInt(producto.precio)  , 0);
}

    finalizar_compra.addEventListener("click", pago);

    function pago(){
        Swal.fire(
          'Su compra se ha realizado con éxito!',
          'Le enviaremos un email con el detalle.',
          'success'
        )

    sessionStorage.removeItem("carrito");
    carrito = [];
    }



let ciudad = "Buenos Aires"
let api_key = "a5079f78cfd2c332ea073602e5e66262"
let url = "https://api.openweathermap.org/data/2.5/weather?q="
    
fetch(url+ciudad+"&units=metric&appid="+api_key)
    .then(response => response.json())
    .then(data => {
        clima.innerHTML =`<span class="temperatura">  ${data.name} ${data.main.temp }°</span>
                          <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"><img>  `                          
     })

