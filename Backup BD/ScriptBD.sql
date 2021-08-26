CREATE TABLE usuario
(
    id serial,
    nombre character varying(50) NOT NULL,
    apellido character varying(50) NOT NULL,
    username character varying(50) NOT NULL,
    userpassword character varying(50) NOT NULL,
	CONSTRAINT usuario_pkey PRIMARY KEY (id)
)

CREATE TABLE publicacion
(
    id serial,
    idusuario integer NOT NULL,
    titulo character varying(100) NOT NULL,
    mensaje character varying(500) NOT NULL,
    fecha date NOT NULL,
    CONSTRAINT publicacion_pkey PRIMARY KEY (id),
    CONSTRAINT publicacion_id_fkey FOREIGN KEY (idusuario) REFERENCES usuario (id)
)

CREATE TABLE respuesta
(
    id serial,
    idusuario integer NOT NULL,
    idpublicacion integer NOT NULL,
    respuesta character varying(300) NOT NULL,
    fecha date NOT NULL,
    CONSTRAINT respuesta_pkey PRIMARY KEY (id),
    CONSTRAINT respuesta_idpublicacion_fkey FOREIGN KEY (idpublicacion) REFERENCES publicacion (id),
    CONSTRAINT respuesta_idusuario_fkey FOREIGN KEY (idusuario) REFERENCES usuario (id)
)
