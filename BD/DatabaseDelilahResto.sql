-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 07-05-2020 a las 20:45:49
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `DatabaseDelilahResto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pedidos`
--

CREATE TABLE `Pedidos` (
  `id` int(10) NOT NULL,
  `id_usuario` int(10) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `descripcion` varchar(64) NOT NULL,
  `estado` enum('Nuevo','En Proceso','Listo','Enviado','Cancelado','Entregado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Pedidos`
--

INSERT INTO `Pedidos` (`id`, `id_usuario`, `fecha`, `descripcion`, `estado`) VALUES
(1, 1, '2020-05-04', 'Hamburguesa con Agua.', 'Entregado'),
(2, 2, '2020-05-03', 'Sandwich Veggie, Bagel de Salmón y Ensalada Veggie.', 'Nuevo'),
(3, 3, '2020-05-02', '5 Sandiwch Focaccia con Agua saborizada. ', 'En Proceso'),
(4, 3, '2020-05-07', 'Hamburguesa Clásica.', 'Nuevo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pedidos-Productos`
--

CREATE TABLE `Pedidos-Productos` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_pedido` int(10) NOT NULL,
  `id_producto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Pedidos-Productos`
--

INSERT INTO `Pedidos-Productos` (`id`, `id_pedido`, `id_producto`) VALUES
(1, 1, 2),
(2, 2, 3),
(3, 3, 6),
(4, 2, 1),
(5, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Productos`
--

CREATE TABLE `Productos` (
  `id` int(10) NOT NULL,
  `nombre` varchar(64) DEFAULT NULL,
  `stock` int(10) NOT NULL,
  `precio` int(64) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Productos`
--

INSERT INTO `Productos` (`id`, `nombre`, `stock`, `precio`) VALUES
(1, 'Bagel del Salmon', 50, 425),
(2, 'Hamburguesa clásica', 100, 350),
(3, 'Sandwich veggie', 150, 310),
(4, 'Ensalada veggie', 200, 340),
(5, 'Focaccia', 50, 300),
(6, 'Sandwich Focaccia', 100, 440),
(7, 'Veggie Avocado', 150, 310),
(8, 'Tabule', 300, 310);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id` int(10) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `telefono` int(30) UNSIGNED NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `contrasena` varchar(30) NOT NULL,
  `admin` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id`, `nombre`, `apellido`, `email`, `telefono`, `direccion`, `contrasena`, `admin`) VALUES
(1, 'admin', 'admin', 'admin@admin.com', 1196473821, 'Admin Avenue 3000', 'admin', 1),
(2, 'Michael', 'Jackson', 'michaeljackson@gmail.com', 1196473822, 'Hipolito Yrigoyen 3547', 'muydificil', 0),
(3, 'Leonel', 'Messi', 'leomessi@gmail.com', 1110101010, 'Av. Barcelona 5533', 'elmejor', 0),
(4, 'Javierl', 'Cirilo', 'Javier@gmail.com', 117773851, 'Javier Avenue 3000', 'javier123', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `Pedidos-Productos`
--
ALTER TABLE `Pedidos-Productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `Productos`
--
ALTER TABLE `Productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `Pedidos-Productos`
--
ALTER TABLE `Pedidos-Productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `Productos`
--
ALTER TABLE `Productos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD CONSTRAINT `Pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`);

--
-- Filtros para la tabla `Pedidos-Productos`
--
ALTER TABLE `Pedidos-Productos`
  ADD CONSTRAINT `Pedidos-Productos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `Pedidos` (`id`),
  ADD CONSTRAINT `Pedidos-Productos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `Productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
