# Delilah-Resto-Project
3th Acámica Project

## Delilah Resto Project es una API para el manejo de ordenes, productos, pedidos y clientes de un Restaurant.

¡Bienvenido/a a mi tercer proyecto!

Pasos para la inicialización del servidor:

0) Clona o descarga el repositorio.

I) Descarga e instala "Node.js". Si no lo tienes instalado lo puedes descargar en: 'https://nodejs.org/es/download/'
 
II) Descarga e inicia "XAMPP" en tu computadora. Lo puedes descargar en: "https://www.apachefriends.org/".
  a. Inicia los servidores de Apache y MySQL.
  b. Ingresa a la siguiente url desde tu navegador: localhost/phpmyadmin
  c. Importa la base de datos que se encuenta en la carpeta BD/'DatabaseDelilahResto.sql'
  
III) Abrir la terminal ubicados en el archivo principal que se encuenta en src/'app.js'
  a. Ejecutar el comando 'npm i' para instalar las dependencias utilizadas
  b. Ejecutar el comando 'node app.js' o 'nodemon app.js' para inicializar el servidor

IV) Utilizaremos POSTMAN para probar nuestros endpoints con sus respectivos métodos.
  a. Puedes importar el archivo 'Delilah Resto Endpoints.postman_collection.json' a Postman y empezar a probar los Endpoints
  b. O puedes consultarlos aquí:
 
## Método GET
  -/Productos                               
  Devuelve Lista de Produtos
  
  -/Productos/:id                           
  Devuelve Productos por ID
  
  -/Pedidos                                 
  Admin: Ver el estado de los Pedidos
  
## Método POST
  -/usuarios/nuevo                          
  Crear nuevo Usuario
  
  -/usuarios/login                          
  Logearse
  
  -/pedidos                                 
  Realizar un nuevo Pedido
  
  -/productos                               
  Admin: Crear nuevo Producto
  
## Método PUT
  -/pedidos/:id                             
  Admin: Actualizar estado de Pedidos
  
  -/productos/:id                           
  Admin: Actualizar Productos
  
## Método DELETE
  -/pedidos/:id                             
  Admin: Eliminar Pedidos por Id
  
  -/productos/:id                           
  Admin: Eliminar Productos por Id
  
V) a. Para realizar cualquier acción como ADMIN debera utilizar las credenciales proporcionadas al iniciar sesión como:
    nombre: admin
    contrasena: admin
    
   b. O puede crear su propio usuario ADMINISTRADOR indicando lo siguiente al crear su cuenta:
    admin: 1
