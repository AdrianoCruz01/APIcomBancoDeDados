CREATE DATABASE Hackthon;

CREATE TABLE produtos (
	id serial,
  	nome varchar(30) NOT NULL,
  	empresa varchar(30) NOT NULL,
  	foto varchar(800),
  	valor int NOT NULL,
  	descricao text NOT NULL,
  	especificacoes varchar(50) NOT NULL,
  	etiquetasEcologicas varchar(100) NULL
);

CREATE TABLE IS NOT EXISTS usuarios (
	id serial primary key,
	nome text NOT NULL,
	email text NOT NULL,
	senha text NOT NULL
);