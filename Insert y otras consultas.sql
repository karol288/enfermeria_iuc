INSERT INTO Roles(id_rol,Nombre_Rol,Descripcion_Rol ) Values 
(1,'Admi','encargado de la pagina'),
(2,'usuario','Apoyar los procesos formativos del colegio'),
(3,'Rector','Posee acceso a todos los modulos de la aplicación'),
(4,'Administrador','Brinda soporte a la aplicación, obteniendo acceso a todos los modulos');


INSERT INTO usuarios
(id_usuarios, nombre, "password", sal, id_rol)
VALUES(1, 'Administrador', 'ee751dfca15c18afb4b818f08437ee14be664e65c51232a4428ee0b2464ea052727bf69854d2051a1cae7450d7aa07d6c7ccc5d94b76695202a6fd36cca960ef', '43bbae03dcee86122a7808b20eb9d72b3755fcc82ddccc8bcde3aad6b82664bd', 4);


update roles set nombre_rol = 'enfermera' where id_rol = 1;