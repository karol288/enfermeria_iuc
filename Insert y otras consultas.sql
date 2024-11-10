-- Active: 1707198693448@@127.0.0.1@5432@asistenciaiuc@public
INSERT INTO Roles(id_rol,Nombre_Rol,Descripcion_Rol) Values 
(1,'Docente','Dar clase,Dar permisos'),
(2,'Funcionario','Apoyar los procesos formativos del colegio'),
(3,'Rector','Posee acceso a todos los modulos de la aplicación'),
(4,'Administrador','Brinda soporte a la aplicación, obteniendo acceso a todos los modulos');

--password: 123
INSERT INTO public.usuarios
(id_usuarios, nombre, "password", sal, id_rol)
VALUES(1, 'Administrador', 'ee751dfca15c18afb4b818f08437ee14be664e65c51232a4428ee0b2464ea052727bf69854d2051a1cae7450d7aa07d6c7ccc5d94b76695202a6fd36cca960ef', '43bbae03dcee86122a7808b20eb9d72b3755fcc82ddccc8bcde3aad6b82664bd', 4);

INSERT INTO Alergias (id_Alergia, Nombre_Alergia) values
(1,'Polvo'),
(2,'Pelo de mascotas'),
(3,'Lácteos'),
(4,'Polen'),
(5,'Felpa'),
(6,'Penicilina'),
(7,'Ainex');

-------------Pruebas--------------------------------------------
select * from alergias a ;
select *, encode(sha512(($2||u.sal)::bytea),'hex'), u."password"= encode(sha512($2|| u.sal ::bytea),'hex') from usuarios u; 

SELECT id_Usuarios, id_roles FROM Usuarios u where Nombre = $1 and password = encode(sha512($2|| u.sal ::bytea),'hex');
     
INSERT INTO Usuarios (Nombre, password, sal, id_rol) 
            values ($1, encode(sha512(($2||$3)::bytea),'hex'), $3, $4);

 select encode(sha512(($2 || $3)::bytea), 'hex')
 
select length(u."password"), length(u.sal) from usuarios u;

select * from asistencia_pae ap ;

select * from estudiantes e 

--1. Reporte por un estudiante
select 
fecha_asistencia, hora_asistencia, e.tipodoc_estudiante, e.numerodoc_estudiante ,
e.nombre_completo, e.fechaingresopae, e.fechaegresopae, e.fechaingresoiuc
from asistencia_pae ap join estudiantes e on e.id_estudiante = ap.id_estudiante 
where e.tipodoc_estudiante = $1 and e.numerodoc_estudiante = $2 

---2. Un estudiante puede o no registrar asistencia?
select 
e.id_estudiante ,
e.tipodoc_estudiante, e.numerodoc_estudiante ,
e.nombre_completo, e.fechaingresopae, e.fechaegresopae, e.fechaegresoiuc 
from 
estudiantes e 
where
e.fechaingresopae is not null 
and (e.fechaegresopae > current_date or e.fechaegresopae is null)
and e.fechaegresoiuc is null 
and e.tipodoc_estudiante = $1 and e.numerodoc_estudiante = $2;

INSERT INTO asistencia_pae 
                   (fecha_asistencia,hora_asistencia,id_estudiante) 
                   VALUES (current_date, current_time , $1) RETURNING id_asistencia_pae;

select 
                     e.id_estudiante,
                     e.tipodoc_estudiante, e.numerodoc_estudiante ,
                     e.nombre_completo, e.fechaingresopae, e.fechaegresopae, e.fechaegresoiuc 
                     from 
                     estudiantes e join asistencia_pae ap 
                     on ap.id_estudiante = e.id_estudiante
                     where
                     e.fechaingresopae is not null 
                     and (e.fechaegresopae > current_date or e.fechaegresopae is null)
                     and e.fechaegresoiuc is null 
                     and e.id_estudiante = $1
                     and ap.fecha_asistencia = current_date
                     
select 
                   fecha_asistencia,
                   hora_asistencia,
                   e.tipodoc_estudiante,
                   e.numerodoc_estudiante,
                   e.nombre_completo,
                   e.fechaingresopae,
                   e.fechaegresopae,
                   e.fechaingresoiuc
                   from
                   asistencia_pae ap join estudiantes e
                   on e.id_estudiante = ap.id_estudiante 
                   where e.tipodoc_estudiante = $1 and e.numerodoc_estudiante = $2
                   
                   
                   
Insert into estudiantes
(tipodoc_estudiante, numerodoc_estudiante,nombre_completo, fecha_nacimiento, sexo, curso_actual, fechaingresoiuc, fechaegresoiuc, fechaingresopae, fechaegresopae, id_acudiente) values
('TI', '1056124247', 'ALVAREZ GONZALEZ SALOME','2007-01-01','F','11-6','2014-01-01',NULL,'2020-05-01',NULL,1),
('TI', '1057784285', 'ANGULO RIVERA CAROLINA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1055755310', 'ARENAS ARCILA VALERIA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1057784260', 'ARENAS RAMIREZ VALENTINA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1055359184', 'BARRETO RAMIREZ YASMIN','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1056123694', 'CARMONA FLOREZ MARIA JOSE','2007-01-01','F','11-6','2014-01-01',NULL,'2020-05-01',NULL,1),
('TI', '1054866634', 'CARMONA MARTINEZ LAURA SOFIA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1054867164', 'CASTRO MONTES JOSEPH MATIAS','2007-01-01','M','11-6','2014-01-01',NULL,NULL,NULL,1),
('CC', '1055753526', 'CEBALLOS CASTAÑO YERALDI','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1056124182', 'CHALARCA SALAZAR LEANDRO','2007-01-01','M','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1054865913', 'CORTES RESTREPO XIMENA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1055754583', 'GALLEGO ISAZA SALOME','2007-01-01','F','11-6','2014-01-01',NULL,'2020-05-01',NULL,1),
('TI', '1054865493', 'GARCIA GONZALEZ GABRIELA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1054864769', 'GARCIA OSORIO MARIA ALEJANDRA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('CC', '1055753682', 'IGLESIAS CASTILLO JULIANA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1055754892', 'MARTINEZ LOAIZA JUAN MANUEL','2007-01-01','M','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1056124821', 'MURILLO MONTOYA SANTIAGO','2007-01-01','M','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1054863997', 'OSPINA PARDO JUAN JOSE','2007-01-01','M','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1056124472', 'PEREZ CHAURA JHON DEIBY','2007-01-01','M','11-6','2014-01-01',NULL,'2020-05-01',NULL,1),
('CC', '1111195354', 'RODRIGUEZ MEDELLIN MILENA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('PPT', '6476504', 'ROJAS CONTRERAS IRIANNY YAJAIRA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('CC', '1053874103', 'ROJAS GIRALDO MILKA ALEJANDRA','2007-01-01','F','11-6','2014-01-01',NULL,'2020-05-01','2020-05-30',1),
('TI', '1054866987', 'URREGO CASTAÑO JUAN STEBAN','2007-01-01','M','11-6','2014-01-01',NULL,NULL,NULL,1),
('TI', '1056124127', 'VELASQUEZ LOPEZ ISABELA','2007-01-01','F','11-6','2014-01-01',NULL,NULL,NULL,1),
('CC', '1056122584', 'YAQUIVE CASTRO KEVIN MAURICIO','2007-01-01','M','11-6','2014-01-01',NULL,NULL,NULL,1)
