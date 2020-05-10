const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const querys = require('./model');
const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Servidor Iniciado en el puerto 3000');
})
const JWT = {
    PRIVATE_KEY: 'delilahResto'
};
const firma = JWT.PRIVATE_KEY;

//Middlewares de autenticacion y autorización

const autenticacion = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, firma);
        if (verifyToken) {
            req.user = verifyToken;
            return next();
        } else {
            res.status(403).json({ error: 'Error en la validación del usuario' })
        }
    } catch (err) {
        res.status(403).json({ error: 'Error en la validación del usuario' })
    }
};

const autenticoAdmins = (req, res, next) => {
    try {
        const adminAutorizado = async() => {
            const id = await querys.adminOcliente(req.user);
            if (id == 1) {
                return next()
            } else {
                res.status(403).json({ error: 'No tienes los permisos suficientes para entrar a esta ruta. Debe ser Admin' })
            }
            }
        adminAutorizado();
    } catch (err) {
        res.status(403).json({ error: 'Error al autenticar sus permisos' })
    }
};

//Crear usuario nuevo
app.post('/usuarios/nuevo', async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, direccion, contrasena, admin } = req.body;
        const nuevoUsuario = await querys.crearUsuario(nombre, apellido, email, telefono, direccion, contrasena, admin)
        if (nuevoUsuario) {
            res.status(200).json({ msg: 'Usuario Nuevo registrado con éxito' });
        } else {
            res.status(500).json({ error: 'Error, debe completar todos los campos' })
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

 //Logearse
app.post('/usuarios/login', async (req, res) => {
    try {
        const { nombre } = req.body;
        const nombreUsuario = await querys.autenticacionUsuario(nombre);
        if (nombreUsuario == nombre) {
            const { contrasena } = req.body;
            const contrasenaUsuario = await querys.autenticacionContrasena(contrasena);
            if (contrasenaUsuario == contrasena) {
                const token = await querys.crearToken(nombre);
                const bienvenida = await querys.adminOcliente(nombreUsuario)
                if (bienvenida == 1) {
                    res.json({ 'Bienvenido! Usted tiene permisos de ADMIN, su token es ': token });
                } else {
                    res.json({ 'Bienvenido! Usted tiene permisos de CLIENTE, su token es ': token });
                }
            } else {
                res.status(500).json({ msg: 'Error, su contraseña es incorrecta'})
            }
        } else {
            res.status(500).json({ error: 'Error, su usuario es incorrecto' })
        }
    } catch (err) {
        res.status(500).json({ error: 'A ocurrido un error al validar' })
    }
});

// Obtener lista de Productos 
app.get('/productos', autenticacion, (req, res) => {
    try {
        querys.listaProductos().then( (productos) => res.status(200).json({ productos: productos }) )
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

app.get('/productos/:id', autenticacion, (req, res) => {
    try {
        const { id } = req.params;
        querys.productosId(id).then( (prod) => res.status(200).json({ producto: prod }));
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// Hacer un Pedido
app.post('/pedidos', autenticacion, async (req, res) => {
    try {
        let { username, descripcion } = req.body
        const pedidoRecibido = await querys.hacerPedido(username, descripcion);
        const nuevoPedido = await querys.nuevoPedido();
        const newPedido = nuevoPedido[0];
        if (pedidoRecibido) {
            res.status(200).json(newPedido)
        } else {
            res.status(400).json({ msg: 'Error, llene correctamente el pedido'})
        }
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

// Obtener Pedidos (Admin)
app.get('/pedidos', autenticacion, autenticoAdmins, (req, res) => {
    try {
        querys.obtenerPedidos().then( (pedidos) => res.status(200).json({ pedidos }))
    } catch {
        res.status(500).json({ error: "Error" })
    }
});

// Actualizar Estado de Pedido (Admin)
app.put('/pedidos/:id', autenticacion, autenticoAdmins, (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const estadoActualizado = querys.actualizarEstadoPedido(estado, id)
        if (estadoActualizado) {
            res.status(200).json({ msg: "Estado del pedido Actualizado con éxito" })
        } else {
            res.status(401).json({ msg: "No tiene permisos para realizar la solicitud" })
        }
    }
    catch {
        res.status(500).json({ error: "Error" })
    }
});

// Eliminar Pedido (Admin)
app.delete('/pedidos/:id', autenticacion, autenticoAdmins, (req, res) => {
    try {
        const { id } = req.params;
        const pedidoEliminar = querys.eliminarPedido(id);
        if (pedidoEliminar) {
            res.status(200).json({ msg: "Pedido eliminado satisfactoriamente" })
        } else {
            res.status(401).json({ msg: "No tiene permisos para realizar la solicitud" })
        }
    }
    catch {
        res.status(500).json({ error: "Error" })
    }
});

// Crear Produto nuevo (Admin)
app.post('/productos', autenticacion, autenticoAdmins, (req, res) => {
    try {
        const { nombre, stock, precio } = req.body;
        const newProducto = querys.crearProducto(nombre, stock, precio);
        productoCreado = newProducto[0];
        if (newProducto) {
            res.status(200).json({ msg: "Creado con éxito" })
        } else {
            res.status(401).json({ msg: "Uste no tiene permisos" })
        }
    }
    catch {
        res.status(500).json({ error: "Error" })
    }
});

// Actualizar Producto (Admin)
app.put('/productos/:id', autenticacion, autenticoAdmins, (req, res) => {
    try {
        const { nombre, stock, precio } = req.body
        const { id } = req.params
        const actualizar_producto = querys.actualizarProducto(nombre, stock, precio, id);
        if (actualizar_producto) {
            res.status(200).json({ msg: "Producto actualizado con éxito" })
        } else {
            res.status(401).json({ msg: "Usted no tiene permisos" })
        }
    }
    catch {
        res.status(500).json({ error: "Error" })
    }
});

// Eliminar Producto (Admin)
app.delete('/productos/:id', autenticacion, autenticoAdmins, (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminar = querys.eliminarProducto(id);
        if (productoEliminar) {
            res.status(200).json({ msg: "Producto eliminado con éxito" })
        } else {
            res.status(401).json({ msg: "Usted no tiene permisos" })
        }
    }
    catch {
        res.status(500).json({ error: "Error" })
    }
});