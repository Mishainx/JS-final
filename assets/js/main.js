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
let pedido = 0;

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
 let orden_compra = document.getElementById ("orden_compra");
 


document.addEventListener("DOMContentLoaded", function(){

        // Mostrar productos
        mostrar_productos()

        //Agregar item
        agregar_producto()

        

});

//Funciones



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

        let precio_producto = document.createElement("p");
        precio_producto.textContent = producto.precio ;

        let cantidad_producto = document.createElement("input");
        cantidad_producto.innerText = "Cantidad";
        cantidad_producto.classList.add("cantidad_producto");

        let btn_comprar = document.createElement("button");
        btn_comprar.innerText = "Comprar";
        btn_comprar.classList.add("btn_comprar");

        //Agregar productos a la tarjeta
        div_producto.append(img_producto,titulo_producto,precio_producto,cantidad_producto,btn_comprar);
        
        // Agregamos productos al DOM
        lista_productos.append(div_producto);

    })

}

//Función agregar_producto: Genera un item en la lista de pedido
function agregar_producto(){
    
    let botones_comprar = document.querySelectorAll(".btn_comprar");
    for (let boton of botones_comprar){
        boton.addEventListener("click", agregar_elemento);
    }

    function agregar_elemento(e){
        let hijo = e.target;
        let padre = hijo.parentNode;
        if(padre.querySelector("input").value>0){

            let titulo_lista = document.getElementById("titulo_lista");
            titulo_lista.textContent = "Orden compra";

            let rubros_lista = document.getElementById("rubros_lista");
            rubros_lista.innerHTML = `<p>Item</p>
                                      <p>Nombre</p>
                                      <p>Cantidad</p>
                                      <p>Precio</p>
                                      <p>Acción</p>`;   

            let lista = document.createElement("div");
            lista.classList.add("lista");

            let miniatura = document.createElement("img");
            miniatura.src= `${padre.querySelector("img").src}`;
            miniatura.classList.add("miniatura")

            let nombre_item = document.createElement("p");
            nombre_item.textContent =  `${padre.querySelector("h3").innerText}`;

            let cantidad_item = document.createElement("p");
            cantidad_item.textContent =  `${padre.querySelector("input").value}`;
            miniatura.classList.add("cantidad")


            let precio_item = document.createElement("p");
            precio_item.textContent =  `${padre.querySelector("p").innerText*padre.querySelector("input").value}`;

            let boton_borrar = document.createElement("button");
            boton_borrar.classList.add("borrar");
            boton_borrar.textContent = "Borrar";

            let total = document.getElementById("total");
            total.textContent = `Su total es $ ${sumar()}`;

            orden_compra.append(lista);
            lista.append(miniatura,nombre_item,cantidad_item,precio_item,boton_borrar);


        // Sumar total
        function sumar(){     
            pedido = pedido + padre.querySelector("p").innerText*padre.querySelector("input").value;
            return pedido;
        }   

        // Restar producto
            let botones_borrar = document.querySelectorAll(".borrar");
            for (let btn of botones_borrar){
                
                btn.addEventListener("click",quitar)
        
            }    

        }         
      }
 }

 //Función quitar: elimina un elemento de la lista y actualiza el total
 function quitar(e){
    let hijo = e.target;
    let padre = hijo.parentNode;
    let padre_contenido = document.querySelectorAll("p");
    
    padre.remove();

    pedido = pedido - padre.childNodes[3].innerText;

    if (pedido != 0){
        total.textContent = `Su total es $ ${pedido}`;
    }
    else{
        titulo_lista.innerHTML = ``;
        total.innerHTML = ``;
        rubros_lista.innerHTML = ``;
    }
} 









