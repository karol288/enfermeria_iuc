-- DROP DATABASE asistenciaiuc
DROP DATABASE asistenciaiuc;

-- CREATE DATABASE asistenciaiuc
CREATE DATABASE asistenciaiuc;



-- DROP TABLE Parentesco
DROP TABLE IF EXISTS Parentesco CASCADE;

-- CREATE TABLE Parentesco
CREATE TABLE Parentesco (
	id_Parentesco BIGSERIAL NOT NULL,
	Nombre varchar(100) NOT NULL,
	CONSTRAINT pk_Parentesco PRIMARY KEY(id_Parentesco)
);


-- DROP TABLE Areas
DROP TABLE IF EXISTS Areas CASCADE;

-- CREATE TABLE Areas
CREATE TABLE Areas (
	id_Area BIGSERIAL NOT NULL,
	Nombre_Area varchar(100) NOT NULL,
	CONSTRAINT pk_Areas PRIMARY KEY(id_Area)
);


-- DROP TABLE Enfermedades_Base
DROP TABLE IF EXISTS Enfermedades_Base CASCADE;

-- CREATE TABLE Enfermedades_Base
CREATE TABLE Enfermedades_Base (
	id_Enfermedad_Base BIGSERIAL NOT NULL,
	Nombre varchar(100) NOT NULL,
	CONSTRAINT pk_Enfermedades_Base PRIMARY KEY(id_Enfermedad_Base)
);


-- DROP TABLE Tipos_Estado_Asistencia
DROP TABLE IF EXISTS Tipos_Estado_Asistencia CASCADE;

-- CREATE TABLE Tipos_Estado_Asistencia
CREATE TABLE Tipos_Estado_Asistencia (
	id_tipo_estado_asistencia BIGSERIAL NOT NULL,
	Nombre varchar(100) NOT NULL,
	Descripcion int4 NOT NULL,
	CONSTRAINT pk_Tipos_Estado_Asistencia PRIMARY KEY(id_tipo_estado_asistencia)
);


-- DROP TABLE Tipo_Permiso_Estudiante
DROP TABLE IF EXISTS Tipo_Permiso_Estudiante CASCADE;

-- CREATE TABLE Tipo_Permiso_Estudiante
CREATE TABLE Tipo_Permiso_Estudiante (
	id_Tipo_Permiso BIGSERIAL NOT NULL,
	Permiso varchar(100) NOT NULL,
	CONSTRAINT pk_Tipo_Permiso PRIMARY KEY(id_Tipo_Permiso)
);


-- DROP TABLE Tipo_Funcionario
DROP TABLE IF EXISTS Tipo_Funcionario CASCADE;

-- CREATE TABLE Tipo_Funcionario
CREATE TABLE Tipo_Funcionario (
	id_Tipo_Funcionario SERIAL NOT NULL,
	Nombre varchar(100) NOT NULL,
	CONSTRAINT pk_Tipo_Funcionario PRIMARY KEY(id_Tipo_Funcionario)
);


-- DROP TABLE Alergias
DROP TABLE IF EXISTS Alergias CASCADE;

-- CREATE TABLE Alergias
CREATE TABLE Alergias (
	id_Alergia BIGSERIAL NOT NULL,
	Nombre_Alergia varchar(100) NOT NULL,
	CONSTRAINT pk_Alergias PRIMARY KEY(id_Alergia)
);


-- DROP TABLE Roles
DROP TABLE IF EXISTS Roles CASCADE;

-- CREATE TABLE Roles
CREATE TABLE Roles (
	id_rol BIGSERIAL NOT NULL,
	Nombre_Rol varchar(101) NOT NULL,
	Descripcion_Rol varchar(100) NOT NULL,
	CONSTRAINT pk_Roles PRIMARY KEY(id_rol),
	CONSTRAINT uk_rol UNIQUE(Nombre_Rol)
);


-- DROP TABLE Profesion
DROP TABLE IF EXISTS Profesion CASCADE;

-- CREATE TABLE Profesion
CREATE TABLE Profesion (
	id_Profesion BIGSERIAL NOT NULL,
	nombre_profesion int4 NOT NULL,
	CONSTRAINT pk_Profesion PRIMARY KEY(id_Profesion)
);


-- DROP TABLE Permiso
DROP TABLE IF EXISTS Permiso CASCADE;

-- CREATE TABLE Permiso
CREATE TABLE Permiso (
	id_Permisos SERIAL NOT NULL,
	Nombre_Permiso varchar(30) NOT NULL,
	Descripcion_Permiso varchar(100) NOT NULL,
	CONSTRAINT pk_Permisos PRIMARY KEY(id_Permisos),
	CONSTRAINT uk_permiso UNIQUE(Nombre_Permiso)
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


-- DROP TABLE Docentes
DROP TABLE IF EXISTS Docentes CASCADE;

-- CREATE TABLE Docentes
CREATE TABLE Docentes (
	id_Docentes BIGSERIAL NOT NULL,
	TipoDoc_Docente varchar(4) NOT NULL,
	NumeroDoc_Docente varchar(30) NOT NULL,
	Nombre_completo varchar(100) NOT NULL,
	Sexo varchar(1) NOT NULL,
	Fecha_nacimiento date NOT NULL,
	id_Profesion int4 NOT NULL,
	CONSTRAINT pk_docentes PRIMARY KEY(id_Docentes),
	CONSTRAINT chk_sexo CHECK(sexo='F' or sexo='M'),
	CONSTRAINT uk_docente UNIQUE(TipoDoc_Docente,NumeroDoc_Docente),
  CONSTRAINT Ref_Docentes_to_Profesion FOREIGN KEY (id_Profesion)
    REFERENCES Profesion(id_Profesion)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Acudientes
DROP TABLE IF EXISTS Acudientes CASCADE;

-- CREATE TABLE Acudientes
CREATE TABLE Acudientes (
	id_Acudiente BIGSERIAL NOT NULL,
	TipoDoc_Acudiente varchar(4) NOT NULL,
	Numero_Doc_Acudiente varchar(30) NOT NULL,
	Nombre_Completo varchar(100) NOT NULL,
	Direccion varchar(100) NOT NULL,
	Telefono varchar(30) NOT NULL,
	Email varchar(100) NOT NULL,
	id_Parentesco int4 NOT NULL,
	CONSTRAINT pk_Acudientes PRIMARY KEY(id_Acudiente),
	CONSTRAINT uk_acudiente UNIQUE(TipoDoc_Acudiente,Numero_Doc_Acudiente),
  CONSTRAINT Ref_Acudientes_to_Parentesco FOREIGN KEY (id_Parentesco)
    REFERENCES Parentesco(id_Parentesco)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Asignatura
DROP TABLE IF EXISTS Asignatura CASCADE;

-- CREATE TABLE Asignatura
CREATE TABLE Asignatura (
	id_Asignatura BIGSERIAL NOT NULL,
	Nombre_Asignatura varchar(100) NOT NULL,
	id_Area int4 NOT NULL,
	CONSTRAINT pk_Asignatura PRIMARY KEY(id_Asignatura),
  CONSTRAINT Ref_Asignatura_to_Areas FOREIGN KEY (id_Area)
    REFERENCES Areas(id_Area)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Horario
DROP TABLE IF EXISTS Horario CASCADE;

-- CREATE TABLE Horario
CREATE TABLE Horario (
	id_Horario SERIAL NOT NULL,
	Curso_A_Dar_Clase varchar(6) NOT NULL,
	Nombre_Dia varchar(40) NOT NULL,
	Hora_Inicio_Clase time NOT NULL,
	Hora_Fin_Clase time NOT NULL,
	id_Asignatura int4 NOT NULL,
	CONSTRAINT pk_Horario PRIMARY KEY(id_Horario),
  CONSTRAINT Ref_Horario_to_Asignatura FOREIGN KEY (id_Asignatura)
    REFERENCES Asignatura(id_Asignatura)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Cargo_Asignado
DROP TABLE IF EXISTS Cargo_Asignado CASCADE;

-- CREATE TABLE Cargo_Asignado
CREATE TABLE Cargo_Asignado (
	id_Cargo_Asignado SERIAL NOT NULL,
	Cargo varchar(100) NOT NULL,
	id_Tipo_Funcionario int4 NOT NULL,
	CONSTRAINT pk_Cargo_Asignado PRIMARY KEY(id_Cargo_Asignado),
  CONSTRAINT Ref_Cargo_Asignado_to_Tipo_Funcionario FOREIGN KEY (id_Tipo_Funcionario)
    REFERENCES Tipo_Funcionario(id_Tipo_Funcionario)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Rols_Permisos
DROP TABLE IF EXISTS Rols_Permisos CASCADE;

-- CREATE TABLE Rols_Permisos
CREATE TABLE Rols_Permisos (
	id_Roles_Permiso BIGSERIAL NOT NULL,
	id_Rol int4 NOT NULL,
	id_Permisos int4 NOT NULL,
	CONSTRAINT pk_Roles_Permiso PRIMARY KEY(id_Roles_Permiso),
  CONSTRAINT Ref_Rols_Permisos_to_Roles FOREIGN KEY (id_Rol)
    REFERENCES Roles(id_rol)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Rols_Permisos_to_Permiso FOREIGN KEY (id_Permisos)
    REFERENCES Permiso(id_Permisos)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Asistencia
DROP TABLE IF EXISTS Asistencia CASCADE;

-- CREATE TABLE Asistencia
CREATE TABLE Asistencia (
	id_Asistencia BIGSERIAL NOT NULL,
	Num_Hora_clase int4 NOT NULL,
	Temas_Clase varchar(100) NOT NULL,
	Fecha_Asistencia date NOT NULL,
	id_Asignatura int4 NOT NULL,
	id_Docentes int8 NOT NULL,
	CONSTRAINT pk_Asistencia PRIMARY KEY(id_Asistencia),
  CONSTRAINT Ref_Asistencia_to_Asignatura FOREIGN KEY (id_Asignatura)
    REFERENCES Asignatura(id_Asignatura)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Asistencia_to_Docentes FOREIGN KEY (id_Docentes)
    REFERENCES Docentes(id_Docentes)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Funcionarios
DROP TABLE IF EXISTS Funcionarios CASCADE;

-- CREATE TABLE Funcionarios
CREATE TABLE Funcionarios (
	id_Funcionario BIGSERIAL NOT NULL,
	TipoDoc_Funcionario varchar(4) NOT NULL,
	NumeroDoc_Funcionario varchar(30) NOT NULL,
	Nombre_Completo varchar(100) NOT NULL,
	Fecha_Nacimiento date NOT NULL,
	id_Profesion int4 NOT NULL,
	id_Cargo_Asignado int4 NOT NULL,
	CONSTRAINT pk_Funcionarios PRIMARY KEY(id_Funcionario),
	CONSTRAINT uk_funcionario UNIQUE(TipoDoc_Funcionario,NumeroDoc_Funcionario),
  CONSTRAINT Ref_Funcionarios_to_Profesion FOREIGN KEY (id_Profesion)
    REFERENCES Profesion(id_Profesion)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Funcionarios_to_Cargo_Asignado FOREIGN KEY (id_Cargo_Asignado)
    REFERENCES Cargo_Asignado(id_Cargo_Asignado)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Estudiantes
DROP TABLE IF EXISTS Estudiantes CASCADE;

-- CREATE TABLE Estudiantes
CREATE TABLE Estudiantes (
	id_Estudiante BIGSERIAL NOT NULL,
	TipoDoc_Estudiante varchar(4) NOT NULL,
	NumeroDoc_Estudiante varchar(30) NOT NULL,
	Nombre_Completo varchar(100) NOT NULL,
	Fecha_nacimiento date NOT NULL,
	Sexo varchar(1) NOT NULL,
	Curso_actual varchar(6) NOT NULL,
	FechaIngresoIUC date NOT NULL,
	FechaEgresoIUC date,
	FechaIngresoPAE date ,
	FechaEgresoPAE date ,
	id_Acudiente int4 NOT NULL,
	CONSTRAINT pk_estudiante PRIMARY KEY(id_Estudiante),
	CONSTRAINT chk_sexo CHECK(sexo = 'M' or sexo= 'F'),
	CONSTRAINT uk_estudiante UNIQUE(TipoDoc_Estudiante,NumeroDoc_Estudiante),
  CONSTRAINT Ref_Estudiantes_to_Acudientes FOREIGN KEY (id_Acudiente)
    REFERENCES Acudientes(id_Acudiente)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Enfermedades_Base_Estudiantes
DROP TABLE IF EXISTS Enfermedades_Base_Estudiantes CASCADE;

-- CREATE TABLE Enfermedades_Base_Estudiantes
CREATE TABLE Enfermedades_Base_Estudiantes (
	id_Enfermedad_Estudiantes BIGSERIAL NOT NULL,
	id_Enfermedad_Base int4 NOT NULL,
	id_Estudiante int4 NOT NULL,
	CONSTRAINT pk_Enfermedades_Base_Estudiante PRIMARY KEY(id_Enfermedad_Estudiantes),
  CONSTRAINT Ref_Enfermedades_Base_Estudiantes_to_Enfermedades_Base FOREIGN KEY (id_Enfermedad_Base)
    REFERENCES Enfermedades_Base(id_Enfermedad_Base)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Enfermedades_Base_Estudiantes_to_Estudiantes FOREIGN KEY (id_Estudiante)
    REFERENCES Estudiantes(id_Estudiante)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Alergias_Estudiantes
DROP TABLE IF EXISTS Alergias_Estudiantes CASCADE;

-- CREATE TABLE Alergias_Estudiantes
CREATE TABLE Alergias_Estudiantes (
	id_Alergias_Estudiantes BIGSERIAL NOT NULL,
	id_Alergia int4 NOT NULL,
	id_Estudiante int8 NOT NULL,
	CONSTRAINT pk_Alergias_Estudiantes PRIMARY KEY(id_Alergias_Estudiantes),
  CONSTRAINT Ref_Alergias_Estudiantes_to_Alergias FOREIGN KEY (id_Alergia)
    REFERENCES Alergias(id_Alergia)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Alergias_Estudiantes_to_Estudiantes FOREIGN KEY (id_Estudiante)
    REFERENCES Estudiantes(id_Estudiante)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Asistencia_Detallada
DROP TABLE IF EXISTS Asistencia_Detallada CASCADE;

-- CREATE TABLE Asistencia_Detallada
CREATE TABLE Asistencia_Detallada (
	id_Asistencia_Detallada BIGSERIAL NOT NULL,
	Fecha_Asistencia date NOT NULL,
	Hora_Asistencia time,
	id_tipo_estado_asistencia int4 NOT NULL,
	id_Estudiante int8 NOT NULL,
	CONSTRAINT pk_Asistencia_Detallada PRIMARY KEY(id_Asistencia_Detallada),
  CONSTRAINT Ref_Asistencia_Detallada_to_Tipos_Estado_Asistencia FOREIGN KEY (id_tipo_estado_asistencia)
    REFERENCES Tipos_Estado_Asistencia(id_tipo_estado_asistencia)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Asistencia_Detallada_to_Estudiantes FOREIGN KEY (id_Estudiante)
    REFERENCES Estudiantes(id_Estudiante)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Permisos_Estudiante
DROP TABLE IF EXISTS Permisos_Estudiante CASCADE;

-- CREATE TABLE Permisos_Estudiante
CREATE TABLE Permisos_Estudiante (
	id_PermisoEstudiante BIGSERIAL NOT NULL,
	id_Funcionario int4 NOT NULL,
	id_Tipo_Permiso int4 NOT NULL,
	id_Docentes int4 NOT NULL,
	id_Estudiante int8 NOT NULL,
	CONSTRAINT pk_PermisosEstudiante PRIMARY KEY(id_PermisoEstudiante),
  CONSTRAINT Ref_Permisos_Estudiante_to_Funcionarios FOREIGN KEY (id_Funcionario)
    REFERENCES Funcionarios(id_Funcionario)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Permisos_Estudiante_to_Tipo_Permiso_Estudiante FOREIGN KEY (id_Tipo_Permiso)
    REFERENCES Tipo_Permiso_Estudiante(id_Tipo_Permiso)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Permisos_Estudiante_to_Docentes FOREIGN KEY (id_Docentes)
    REFERENCES Docentes(id_Docentes)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE,
  CONSTRAINT Ref_Permisos_Estudiante_to_Estudiantes FOREIGN KEY (id_Estudiante)
    REFERENCES Estudiantes(id_Estudiante)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);


-- DROP TABLE Asistencia_PAE
DROP TABLE IF EXISTS Asistencia_PAE CASCADE;

-- CREATE TABLE Asistencia_PAE
CREATE TABLE Asistencia_PAE (
	id_Asistencia_PAE BIGSERIAL NOT NULL,
	Fecha_Asistencia date NOT NULL,
	Hora_Asistencia time,
	id_Estudiante int8 NOT NULL,
	CONSTRAINT pk_Asistencia_PAE PRIMARY KEY(id_Asistencia_PAE),
  CONSTRAINT Ref_Asistencia_PAE_to_Estudiantes FOREIGN KEY (id_Estudiante)
    REFERENCES Estudiantes(id_Estudiante)
	MATCH SIMPLE
	ON DELETE NO ACTION
	ON UPDATE NO ACTION
	NOT DEFERRABLE
);

