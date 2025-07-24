SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET time_zone = "+00:00";

CREATE TABLE `detail` (
  `iddetail` int(11) NOT NULL,
  `idorders` int(11) NOT NULL,
  `idproducts` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_esperanto_ci;

INSERT INTO `detail` (`iddetail`, `idorders`, `idproducts`, `quantity`) VALUES
(5, 4, 1, 2),
(6, 4, 2, 1),
(7, 4, 7, 1),
(8, 5, 2, 1),
(9, 5, 1, 1),
(10, 6, 9, 1),
(11, 6, 10, 1),
(12, 7, 28, 1),
(13, 8, 9, 1);

CREATE TABLE `orders` (
  `idorders` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `pay` varchar(100) NOT NULL,
  `changes` int(11) DEFAULT NULL,
  `date` DATETIME NOT NULL DEFAULT current_timestamp(),
  `state` varchar(100) NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_esperanto_ci;

INSERT INTO `orders` (`idorders`, `iduser`, `pay`, `changes`, `date`, `state`) VALUES
(4, 11, 'efectivo', 9000, '2025-07-18 23:14:11', 'completado'),
(5, 12, 'efectivo', 9000, '2025-07-21 02:56:24', 'pendiente'),
(6, 13, 'efectivo', 8000, '2025-07-22 23:35:28', 'pendiente'),
(7, 14, 'nequi', 0, '2025-07-22 23:42:40', 'pendiente'),
(8, 15, 'efectivo', 5000, '2025-07-22 23:47:56', 'pendiente');

CREATE TABLE `products` (
  `idproducts` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` int(100) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `thumbnail` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_esperanto_ci;

INSERT INTO `products` (`idproducts`, `title`, `description`, `price`, `brand`, `category`, `thumbnail`) VALUES
(1, 'Sencillo', '', 5000, 'Perro', 'Perros', '/image/perrosencillo.webp'),
(2, 'A la Plancha', '', 6000, 'Perro', 'Perros', '/image/perroalaplancha.webp'),
(3, 'Gemelos', '', 8000, 'Perro', 'Perros', '/image/perrogemelos.webp'),
(4, 'Gratinado', '', 8000, 'Perro', 'Perros', '/image/perrogratinado.webp'),
(5, 'Hawaiano', '', 12000, 'Perro', 'Perros', '/image/perrohawaiano.webp'),
(6, 'Minisuizo', '', 13000, 'Perro', 'Perros', '/image/perrominisuizo.webp'),
(7, 'Suizo', '', 15000, 'Perro', 'Perros', '/image/perrosuizo.webp'),
(8, 'Ranchero', '', 17000, 'Perro', 'Perros', '/image/perroranchero.webp'),
(9, 'Clasica', '', 15000, 'Hamburgueza', 'Hamburguezas', '/image/hamburgueza.webp'),
(10, 'De Pollo', '', 17000, 'Hamburgueza', 'Hamburguezas', '/image/hamburguezapollo.webp'),
(11, 'Mixta', '', 23000, 'Hamburgueza', 'Hamburguezas', '/image/hamburguizamixta.webp'),
(12, 'Doble Carne', '', 25000, 'Hamburgueza', 'Hamburguezas', '/image//image/hamburguezadoblecarne.webp.webp'),
(13, 'Jamón y Queso', '', 12000, 'Sándwich', 'Sándwichs', '/image/sandwichjamonyqueso.webp'),
(14, 'Sándwich de Pollo', '', 12000, 'Sándwich', 'Sándwichs', '/image/sandwichpollo.webp'),
(15, 'Sándwich Mixta', '', 18000, 'Sándwich', 'Sándwichs', '/image/sandwichmixta.webp'),
(16, '2 Personas Mixta', '', 28000, 'Salvajada', 'Salvajadas', '/image/salvajada2personasmixta.webp'),
(17, 'Salvaje 4 Personas', '', 45000, 'Salvajada', 'Salvajadas', '/image/salvajada4personas.webp'),
(18, '!QUE LOCURA¡ 6 Personas', '', 70000, 'Salvajada', 'Salvajadas', '/image/salvajadaquelocura.webp'),
(19, 'Sencilla', '', 12000, 'Salchipapa', 'Salchipapas', '/image/salchipapasencilla.webp'),
(20, 'Gratinada', '', 15000, 'Salchipapa', 'Salchipapas', '/image/salchipapagratinada.webp'),
(21, 'Combinada', '', 17000, 'Salchipapa', 'Salchipapas', '/image/salchipapacombinada.webp'),
(22, 'Salchipollo', '', 18000, 'Salchipapa', 'Salchipapas', '/image/salchipollo.webp'),
(23, 'Salchisuiza', '', 18000, 'Salchipapa', 'Salchipapas', '/image/salchipapasuiza.webp'),
(24, 'Salchiranchera', '', 20000, 'Salchipapa', 'Salchipapas', '/image/salchiranchera.webp'),
(25, 'Suizaranchera', '', 23000, 'Salchipapa', 'Salchipapas', 'image/suizaranchera.webp'),
(26, 'Pollosuiza', '', 23000, 'Salchipapa', 'Salchipapas', 'image/pollosuiza.webp'),
(27, 'Polloranchera', '', 23000, 'Salchipapa', 'Salchipapas', 'image/polloranchera.webp'),
(28, 'Pechuga', '', 22000, 'Asado', 'Asados', '/image/asadodepollo.webp'),
(29, 'Lomo de Cerdo', '', 22000, 'Asado', 'Asados', '/image/lomodecerdo.webp'),
(30, 'Mixto', '', 30000, 'Asado', 'Asados', '/image/asadomixto.webp'),
(31, 'Chorizo', '', 2000, 'Adicional', 'Adicionales', '/image/adicionalchorizo.webp'),
(32, 'Tocineta', '', 3000, 'Adicional', 'Adicionales', '/image/adicionaltocineta.webp'),
(33, 'Salchicha de Pollo', '', 3000, 'Adicional', 'Adicionales', '/image/salchichadepollo.webp'),
(34, 'Suiza', '', 4000, 'Adicional', 'Adicionales', '/image/adicionalsuiza.webp'),
(35, 'Papa Francesa', '', 5000, 'Adicional', 'Adicionales', '/image/papafrancesa.webp'),
(36, 'Mosarella con Maiz', '', 6000, 'Adicional', 'Adicionales', '/image/mosarellaconmaiz.webp');

CREATE TABLE `users` (
  `iduser` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_esperanto_ci;

INSERT INTO `users` (`iduser`, `name`, `address`, `phone`) VALUES
(11, 'Erwin Padilla', 'CRA 4 91-40', '3022822194'),
(12, 'Luis Mario', 'CRA 5 #92-70', '3006623100'),
(13, 'Luis Angel', 'CRA 52B #72-40', '3014464753'),
(14, 'Eduardo Lopez', 'CRA 6 #93-20', '3121344567'),
(15, 'Eduardo Lopez', 'CRA 6 #93-20', '3121344567');

ALTER TABLE `detail`
  ADD PRIMARY KEY (`iddetail`),
  ADD KEY `idorders` (`idorders`),
  ADD KEY `idproducts` (`idproducts`);

ALTER TABLE `orders`
  ADD PRIMARY KEY (`idorders`),
  ADD KEY `iduser` (`iduser`);

ALTER TABLE `products`
  ADD PRIMARY KEY (`idproducts`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`iduser`) USING BTREE;


ALTER TABLE `detail`
  MODIFY `iddetail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `orders`
  MODIFY `idorders` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `products`
  MODIFY `idproducts` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

ALTER TABLE `users`
  MODIFY `iduser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

ALTER TABLE `detail`
  ADD CONSTRAINT `detail_ibfk_1` FOREIGN KEY (`idproducts`) REFERENCES `products` (`idproducts`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_ibfk_2` FOREIGN KEY (`idorders`) REFERENCES `orders` (`idorders`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `users` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE;