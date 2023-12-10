-- TABLAS Y BASE DE DATOS AQUI 
CREATE SCHEMA IF NOT EXISTS proyecto1;

CREATE TABLE IF NOT EXISTS proyecto1.USUARIO (
    id_usuario INTEGER NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono INTEGER NOT NULL,
    email VARCHAR(50) NOT NULL,
    passwordd VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    administrador CHAR(1),
    PRIMARY KEY (id_usuario)
);

CREATE TABLE IF NOT EXISTS proyecto1.LIBRO (
    id_libro INTEGER NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    sinopsis VARCHAR(50) NOT NULL,
    precio_compra FLOAT NOT NULL,
    precio_venta FLOAT NOT NULL,
    autor VARCHAR(50) NOT NULL,
    anio_publicacion INTEGER NOT NULL,
    editorial VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    fecha_devolucion DATE NOT NULL,
    portada BLOB,    
    PRIMARY KEY (id_libro)
);

CREATE TABLE IF NOT EXISTS proyecto1.RENTA (
    id_renta INTEGER NOT NULL AUTO_INCREMENT,
    fecha_devolucion DATE NOT NULL,
    usuario INTEGER NOT NULL,
    libro INTEGER NOT NULL,
    PRIMARY KEY (id_renta),
    FOREIGN KEY (usuario) REFERENCES proyecto1.USUARIO (id_usuario),
    FOREIGN KEY (libro) REFERENCES proyecto1.LIBRO (id_libro)
);

CREATE TABLE IF NOT EXISTS proyecto1.COMENTARIO (
    id_comentario INTEGER NOT NULL AUTO_INCREMENT,
    comentario VARCHAR(50) NOT NULL,
    usuario INTEGER NOT NULL,
    libro INTEGER NOT NULL,
    PRIMARY KEY (id_comentario),
    FOREIGN KEY (usuario) REFERENCES proyecto1.USUARIO (id_usuario),
    FOREIGN KEY (libro) REFERENCES proyecto1.LIBRO (id_libro)
);

CREATE TABLE IF NOT EXISTS proyecto1.HISTORIAL (
    id_historial INTEGER NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(50) NOT NULL,
    usuario INTEGER NOT NULL,
    PRIMARY KEY (id_historial),
    FOREIGN KEY (usuario) REFERENCES proyecto1.USUARIO (id_usuario)
);