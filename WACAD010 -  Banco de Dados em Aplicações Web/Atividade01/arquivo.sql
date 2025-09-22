-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema loja_web
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema loja_web
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `loja_web` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `loja_web` ;

-- -----------------------------------------------------
-- Table `loja_web`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_web`.`categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja_web`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_web`.`cliente` (
  `id_cliente` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `cpf` CHAR(11) NOT NULL,
  `celular` VARCHAR(15) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `data_nascimento` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE INDEX `cpf` (`cpf` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja_web`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_web`.`endereco` (
  `id_endereco` INT NOT NULL AUTO_INCREMENT,
  `logradouro` VARCHAR(150) NOT NULL,
  `numero` VARCHAR(10) NULL DEFAULT NULL,
  `complemento` VARCHAR(50) NULL DEFAULT NULL,
  `cidade` VARCHAR(80) NULL DEFAULT NULL,
  `estado` CHAR(2) NULL DEFAULT NULL,
  `cep` CHAR(8) NULL DEFAULT NULL,
  `id_cliente` INT NOT NULL,
  PRIMARY KEY (`id_endereco`),
  INDEX `id_cliente` (`id_cliente` ASC) VISIBLE,
  CONSTRAINT `endereco_ibfk_1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `loja_web`.`cliente` (`id_cliente`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja_web`.`compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_web`.`compra` (
  `id_compra` INT NOT NULL AUTO_INCREMENT,
  `data_hora` DATETIME NOT NULL,
  `desconto` DECIMAL(5,2) NULL DEFAULT '0.00',
  `forma_pagamento` VARCHAR(50) NOT NULL,
  `total` DECIMAL(10,2) NOT NULL,
  `id_cliente` INT NOT NULL,
  `id_endereco` INT NOT NULL,
  PRIMARY KEY (`id_compra`),
  INDEX `id_cliente` (`id_cliente` ASC) VISIBLE,
  INDEX `id_endereco` (`id_endereco` ASC) VISIBLE,
  CONSTRAINT `compra_ibfk_1`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `loja_web`.`cliente` (`id_cliente`),
  CONSTRAINT `compra_ibfk_2`
    FOREIGN KEY (`id_endereco`)
    REFERENCES `loja_web`.`endereco` (`id_endereco`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja_web`.`subcategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_web`.`subcategoria` (
  `id_subcategoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `id_categoria` INT NOT NULL,
  PRIMARY KEY (`id_subcategoria`),
  INDEX `id_categoria` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `subcategoria_ibfk_1`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `loja_web`.`categoria` (`id_categoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja_web`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_web`.`produto` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `modelo` VARCHAR(100) NOT NULL,
  `fabricante` VARCHAR(100) NULL DEFAULT NULL,
  `preco_base` DECIMAL(10,2) NOT NULL,
  `quantidade_disponivel` INT NULL DEFAULT '0',
  `id_subcategoria` INT NOT NULL,
  PRIMARY KEY (`id_produto`),
  INDEX `id_subcategoria` (`id_subcategoria` ASC) VISIBLE,
  CONSTRAINT `produto_ibfk_1`
    FOREIGN KEY (`id_subcategoria`)
    REFERENCES `loja_web`.`subcategoria` (`id_subcategoria`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja_web`.`item_compra`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_web`.`item_compra` (
  `id_compra` INT NOT NULL,
  `id_produto` INT NOT NULL,
  `quantidade` INT NOT NULL,
  `preco_unitario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_compra`, `id_produto`),
  INDEX `id_produto` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `item_compra_ibfk_1`
    FOREIGN KEY (`id_compra`)
    REFERENCES `loja_web`.`compra` (`id_compra`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `item_compra_ibfk_2`
    FOREIGN KEY (`id_produto`)
    REFERENCES `loja_web`.`produto` (`id_produto`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `loja_web`.`numero_serie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `loja_web`.`numero_serie` (
  `id_numero_serie` INT NOT NULL AUTO_INCREMENT,
  `numero_serie` VARCHAR(50) NOT NULL,
  `id_produto` INT NOT NULL,
  PRIMARY KEY (`id_numero_serie`),
  UNIQUE INDEX `numero_serie` (`numero_serie` ASC) VISIBLE,
  INDEX `id_produto` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `numero_serie_ibfk_1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `loja_web`.`produto` (`id_produto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
