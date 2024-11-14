create database enfermeria;
encoding='UNICODE';



-- DROP TABLE Roles
DROP TABLE IF EXISTS roles CASCADE;

-- CREATE TABLE Roles
CREATE TABLE roles (
	id_rol BIGSERIAL NOT NULL,
	nombre_rol varchar(101) NOT NULL,
	descripcion_rol varchar(100) NOT NULL,
	CONSTRAINT pk_roles PRIMARY KEY(id_rol),
	CONSTRAINT uk_rol UNIQUE(nombre_rol)
);

-- DROP TABLE Usuarios
DROP TABLE IF EXISTS Usuarios CASCADE;

-- CREATE TABLE Usuarios
CREATE TABLE Usuarios (
	id_Usuarios BIGSERIAL NOT NULL,
	Nombre varchar(30) NOT NULL,
	password varchar(128) NOT NULL,
	Sal varchar(128),
	id_rol int4 NOT NULL,
	CONSTRAINT pk_Usuario PRIMARY KEY(id_Usuarios),
  CONSTRAINT Ref_Usuarios_to_Roles FOREIGN KEY (id_rol)
    REFERENCES Roles(id_rol)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


drop table if exists estudiante cascade;

create table estudiante (
	id_estudiante serial not null,
	nombre varchar(500) not null,
	apellido varchar(50) not null,
	tarjeta_identidad int4 not null,
	curso varchar(40) not null,
	alergias_medicamentos varchar(700) not null,
	constraint id_estudiante primary key(id_estudiante),
	constraint uk_tarjeta_identidad unique(nombre,apellido,tarjeta_identidad)
);


drop table if exists visita cascade;

create table visita (
	id_visita serial not null,
	hora time(6) not null,
	fecha date not null,
	motivo_visita int4 not null,
	id_estudiante int4 not null,
	constraint id_visita primary key(id_visita),
	constraint fecha_hora unique(hora,fecha)
);


drop table if exists codigo_medicamento cascade;

create table codigo_medicamento (
	id_codigo_medicamento serial not null,
	codigo_medicamento varchar(40) not null,
	nombre_medicamento varchar(50) not null,
	cantidad varchar(80),
	primary key(id_codigo_medicamento)
);


drop table if exists medicamento_dado cascade;

create table medicamento_dado (
	id_medicamento_dado serial not null,
	dosis_recomendada varchar(450) not null,
	id_visita int4 not null,
	id_codigo_medicamento int4 not null,
	primary key(id_medicamento_dado)
);


drop table if exists autorizacion cascade;

create table autorizacion (
	id_autorizacion serial not null,
	detalles_autorizacion varchar(800) not null,
	id_estudiante int4 not null,
	id_tutor int4 not null,
	id_medicamento_dado int4 not null,
	primary key(id_autorizacion)
);


drop table if exists diagnostico cascade;

create table diagnostico (
	id_diagnostico serial not null,
	salida_institucion varchar(40) not null,
	mejoramiendo varchar(800) not null,
	id_estudiante int4 not null,
	id_visita int4 not null,
	primary key(id_diagnostico)
);


drop table if exists tutor cascade;

create table tutor (
	id_tutor serial not null,
	nombre varchar(10) not null,
	apellido varchar(10) not null,
	relacion_estudiante varchar(20),
	correo varchar(20) not null,
	telefono int4 not null,
	constraint id_tutor primary key(id_tutor)
);


drop table if exists alergias cascade;

create table alergias (
	id_alergias serial not null,
	alergias_medicamentos varchar(800),
	id_estudiante int4 not null,
	primary key(id_alergias)
);


drop table if exists historial cascade;

create table historial (
	id_historial BIGSERIAL not null,
	id_estudiante int4 not null,
	id_diagnostico int4 not null,
	primary key(id_historial)
);



alter table visita add constraint ref_visita_to_estudiante foreign key (id_estudiante)
	references estudiante(id_estudiante)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table medicamento_dado add constraint ref_medicamento_dado_to_visita foreign key (id_visita)
	references visita(id_visita)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table medicamento_dado add constraint ref_medicamento_dado_to_codigo_medicamento foreign key (id_codigo_medicamento)
	references codigo_medicamento(id_codigo_medicamento)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table autorizacion add constraint ref_autorizacion_to_estudiante foreign key (id_estudiante)
	references estudiante(id_estudiante)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table autorizacion add constraint ref_autorizacion_to_tutor foreign key (id_tutor)
	references tutor(id_tutor)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table autorizacion add constraint ref_autorizacion_to_medicamento_dado foreign key (id_medicamento_dado)
	references medicamento_dado(id_medicamento_dado)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table diagnostico add constraint ref_diagnostico_to_estudiante foreign key (id_estudiante)
	references estudiante(id_estudiante)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table diagnostico add constraint ref_diagnostico_to_visita foreign key (id_visita)
	references visita(id_visita)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table alergias add constraint ref_alergias_to_estudiante foreign key (id_estudiante)
	references estudiante(id_estudiante)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table historial add constraint ref_historial_to_estudiante foreign key (id_estudiante)
	references estudiante(id_estudiante)
	match simple
	on delete no action
	on update no action
	not deferrable;

alter table historial add constraint ref_historial_to_diagnostico foreign key (id_diagnostico)
	references diagnostico(id_diagnostico)
	match simple
	on delete no action
	on update no action
	not deferrable;

