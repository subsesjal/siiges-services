const createUserInitial = {
  usuario: 'Superadmin',
  rolId: 3,
  correo: 'admin@yopmail.com',
  contrasena: '1234Qwerty@',
  actualizado: true,
  estatus: 1,
  persona: {
    nombre: 'Super',
    apellidoPaterno: 'Admin',
  },
};
const createUser = {
  usuario: 'Calamateo',
  rolId: 3,
  correo: 'calamate0@yopmail.com',
  contrasena: '1234Qwerty@',
  actualizado: true,
  estatus: 1,
  persona: {
    nombre: 'Daniel',
    apellidoPaterno: 'Calamateo',
  },
};
const createUserWithoutPerson = {
  usuario: 'tester',
  rolId: 3,
  correo: 'tester@gmail.com',
  contrasena: 'Qwerty1234@',
};
const loginUser = {
  usuario: 'arianag',
  contrasena: 'Aa/1234567890',
};
const updateUserInformation = {
  correo: 'test@gmail.com',
  persona: {
    nombre: 'Bruce',
    apellidoMaterno: 'Wayne',
    domicilio: {
      municipioId: 532,
      estadoId: 14,
      calle: 'Av Fuella',
      numeroExterior: '1289',
      numeroInterior: 'A',
      codigoPostal: 44490,
      colonia: 'Americana',
    },
  },
};
const userPasswordIncorrect = {
  usuario: 'arianag',
  contrasena: '34jifj3933wfA',
};
const errorPasswordUserCreate = {
  usuario: 'Calamateo1',
  rolId: 3,
  correo: 'calamate0@yopmail.com',
  contrasena: '1234Qwerty',
};
const errorUserCreate = {
  usuario: '',
  rolId: 3,
  correo: 'calamate0@yopmail.com',
  contrasena: '1234Qwerty@',
};

const errorMessage = {
  userError: "[usuario]: can't usuario with identifier: [object Object]",
  userIntegerError: 'params/usuarioId must be integer',
};

const changePasswordByUserId = {
  userId: 5,
  oldPassword: loginUser.contrasena,
  newPassword: 'Aa/1234567890',
};

module.exports = {
  createUser,
  createUserInitial,
  createUserWithoutPerson,
  updateUserInformation,
  loginUser,
  userPasswordIncorrect,
  errorPasswordUserCreate,
  errorUserCreate,
  errorMessage,
  changePasswordByUserId,
};
