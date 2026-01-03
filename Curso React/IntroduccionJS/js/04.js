// Objetos
const persona = {
    nombre: 'Tony',
    apellido: 'Stark',
    edad: 40,
    direccion: {
        calle: 'Calle 123',
        ciudad: 'New York'
    }
};

console.log('Persona:', persona);
console.log('Nombre:', persona.nombre);
console.log('Ciudad:', persona.direccion.ciudad);
console.log('Tipo de dato de persona:', typeof persona);

console.table(persona);