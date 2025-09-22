-- CreateTable
CREATE TABLE `Categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` CHAR(11) NOT NULL,
    `celular` VARCHAR(15) NULL,
    `email` VARCHAR(100) NULL,
    `data_nascimento` DATE NULL,

    UNIQUE INDEX `Cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `Cliente_email_key`(`email`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Endereco` (
    `id_endereco` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(150) NOT NULL,
    `numero` VARCHAR(10) NULL,
    `complemento` VARCHAR(50) NULL,
    `cidade` VARCHAR(80) NULL,
    `estado` CHAR(2) NULL,
    `cep` CHAR(8) NULL,
    `id_cliente` INTEGER NOT NULL,

    PRIMARY KEY (`id_endereco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compra` (
    `id_compra` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora` DATETIME(0) NOT NULL,
    `desconto` DECIMAL(5, 2) NULL DEFAULT 0.00,
    `forma_pagamento` VARCHAR(50) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `id_endereco` INTEGER NOT NULL,

    PRIMARY KEY (`id_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategoria` (
    `id_subcategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id_subcategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id_produto` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(100) NOT NULL,
    `fabricante` VARCHAR(100) NULL,
    `preco_base` DECIMAL(10, 2) NOT NULL,
    `quantidade_disponivel` INTEGER NULL DEFAULT 0,
    `id_subcategoria` INTEGER NOT NULL,

    PRIMARY KEY (`id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemCompra` (
    `id_compra` INTEGER NOT NULL,
    `id_produto` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `preco_unitario` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id_compra`, `id_produto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NumeroSerie` (
    `id_numero_serie` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_serie` VARCHAR(50) NOT NULL,
    `id_produto` INTEGER NOT NULL,

    UNIQUE INDEX `NumeroSerie_numero_serie_key`(`numero_serie`),
    PRIMARY KEY (`id_numero_serie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Endereco` ADD CONSTRAINT `Endereco_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `Cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Compra` ADD CONSTRAINT `Compra_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `Endereco`(`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcategoria` ADD CONSTRAINT `Subcategoria_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_id_subcategoria_fkey` FOREIGN KEY (`id_subcategoria`) REFERENCES `Subcategoria`(`id_subcategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `ItemCompra_id_compra_fkey` FOREIGN KEY (`id_compra`) REFERENCES `Compra`(`id_compra`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCompra` ADD CONSTRAINT `ItemCompra_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id_produto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NumeroSerie` ADD CONSTRAINT `NumeroSerie_id_produto_fkey` FOREIGN KEY (`id_produto`) REFERENCES `Produto`(`id_produto`) ON DELETE RESTRICT ON UPDATE CASCADE;
