const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken')

//Crear ruta de Base de Datos
const host = 'localhost';
const database_name = 'DatabaseDelilahResto';
const user = 'root';
const password = '';
const port = '3306';

const JWT = {
    PRIVATE_KEY: 'delilahResto'
};
const firma = JWT.PRIVATE_KEY

const sequelize = new Sequelize('mysql://' + user + ':' + password + '@' + host + ':' + port + '/' + database_name);
sequelize.authenticate()
  .then(() => {
    console.log('Conección éxitosa a la base de datos: ' + database_name)
  })
  .catch(err => {
    console.log('No se pudo conectar a MySQL')
  });


const querys = {
    //Crear usuario nuevo y logearse
    crearUsuario: async (nombre, apellido, email, telefono, direccion, contrasena, admin) => {
        try {
             const nuevoUsuario = await sequelize.query('INSERT INTO Usuarios (nombre, apellido, email, telefono, direccion, contrasena, admin) VALUES ("' + nombre + '","' + apellido + '","' + email + '","' + telefono + '","' + direccion + '","' + contrasena + '", "' + admin +'")');
            return nuevoUsuario;
        } catch (err) {
            console.log('Error: ' + err)
            }
    },

    logearUsuario: (user) => {
        return sequelize.query('SELECT * FROM Usuarios WHERE username = "' + user + '" or email = "' + user + '"',
            { type: sequelize.QueryTypes.SELECT });
    },

    autenticacionUsuario: async(nombre) => {
        try {
            const username = await sequelize.query('SELECT nombre FROM Usuarios WHERE nombre = "' + nombre + '"',
                { type: sequelize.QueryTypes.SELECT });
                if (typeof username[0] != 'undefined') {
                    const nombreUsuario = Object.values(username[0]);
                    const nombreValidado = nombreUsuario[0];
                    if (nombre == nombreValidado) {
                        console.log('Los usuarios coinciden');
                        return nombreValidado
                    } else {
                        return res.status(500).json({ error: 'Error, el usuario no coincide' })
                    }
                } 
        } catch (err) {
            console.log('Error: ' + err)
            }
    },

    autenticacionContrasena: async (contrasena, nombre) => {
        try {
            const password = await sequelize.query('SELECT contrasena FROM Usuarios WHERE contrasena = "' + contrasena + '"',
                { type: sequelize.QueryTypes.SELECT });
            if (typeof password[0] != 'undefined') {
                validarContrasena = Object.values(password[0]);
                contrasenaValidada = validarContrasena[0];
                if (contrasena == contrasenaValidada) {
                    console.log('Las contraseñas coinciden');
                    return contrasenaValidada
                } else {
                    return res.status(500).json({ error: 'Error, la contraseña no coincide' })
                }
            }
        } catch (err) {
            console.log('Error: ' + err)
            }
    },

    //Crear Token
    crearToken: async (nombre) => {
        try {
            const token = jwt.sign(nombre, firma);
            return token;
        } catch (err) {
            console.log('Error: ' + err)
        }
    },

    adminOcliente: async(nombre) => {
        try {
            const identificarRol = await sequelize.query('SELECT admin FROM Usuarios WHERE nombre  = "' + nombre + '"',
                { type: sequelize.QueryTypes.SELECT });
                rol = identificarRol[0].admin
                return rol;
        } catch (err) {
            console.log('Error: ' + err);
        }
    },

   // Obtener lista de Productos
    listaProductos: async() => {
        try {
            const productos = await sequelize.query('SELECT * FROM Productos',
            { type: sequelize.QueryTypes.SELECT })
            return productos
        } catch (err) {
            console.log('Error: ' + err)
        }
    },

    productosId: async (id) => {
        try {
            const productoId = await sequelize.query('SELECT * FROM Productos WHERE id = "' + id + '"', 
            { type: sequelize.QueryTypes.SELECT });
            return productoId;
        } catch (err) {
            console.log('Error: ' + err)
        }
    },
 
    // Hacer un Pedido
    hacerPedido: async (username, descripcion) => {
        try {
            const usuarioId = await sequelize.query('SELECT id FROM Usuarios WHERE nombre = "' + username + '"', { type: sequelize.QueryTypes.SELECT });
            const id_replacement = usuarioId[0].id
            const orden = await sequelize.query('INSERT INTO Pedidos (id_usuario, descripcion) VALUES (?, ?)',
            { replacements: [id_replacement, descripcion] });
            return orden
        } catch (err) {
            console.log('Error: ' + err)
        }
    },

    nuevoPedido: async () => {
        try {
            const nuevoPedido = await sequelize.query('SELECT * FROM `Pedidos` ORDER BY `id` DESC LIMIT 1 ', { type: sequelize.QueryTypes.SELECT });
            return nuevoPedido;
        } catch (err) {
            console.log('Error: ' + err)
        }
    },

    // Actualizar Estado de Pedido (Admin)
    actualizarEstadoPedido: async (nuevoEstado, id) => {
            try{
                const estadoPedido = sequelize.query('UPDATE Pedidos SET estado = "' + nuevoEstado + '" WHERE id = ' + id)
                return estadoPedido;
            } catch (err) {
                console.log('Error: ' + err)
            }
        },

    // Obtener Pedido (Admin)
    obtenerPedidos: async() => {
        try {
            const pedidos = await sequelize.query('SELECT * FROM Pedidos',
            { type: sequelize.QueryTypes.SELECT })
            return pedidos
        } catch (err) {
            console.log('Error: ' + err)
        }
    },

    // Eliminar Pedido (Admin)
    eliminarPedido: async(id) => {
        try {
            const pedidoIdEliminar = await sequelize.query('DELETE FROM Pedidos WHERE id = ' + id);
            return pedidoIdEliminar
        } catch (err) {
            console.log('Error: ' + err)
        }
    },
            
    // Crear Producto nuevo (Admin)
    crearProducto: async (nombre, stock, precio) => {
        try {
            const nuevoProducto = sequelize.query('INSERT INTO Productos (nombre, stock, precio) VALUES (?, ?, ?)',
            { replacements: [nombre, stock, precio] });
        return nuevoProducto;
        } catch (err) {
            console.log('Error: ' + err)
        }
    },

    // Actualizar Producto (Admin)
    actualizarProducto: async (nombre, stock, precio, id) => {
        try {
            const productoActualizado = await sequelize.query('UPDATE Productos SET nombre = "' + nombre + '", stock = "' + stock + '", precio = "' + precio + '" WHERE id = ' + id);
        return productoActualizado
        } catch (err) {
            console.log('Error: ' + err)
        }
    },

    // Eliminar Producto (Admin)
    eliminarProducto: async (id) => {
        try {
            const productoIdEliminar = await sequelize.query('DELETE FROM Productos WHERE id = ' + id);
            return productoIdEliminar
        } catch (err) {
            console.log('Error: ' + err)
        }
    }
};

module.exports = querys;