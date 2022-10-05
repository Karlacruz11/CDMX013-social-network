/**
 * @jest-environment jsdom
 */
import { register } from '../src/Components/Register.js';
import { login } from '../src/Components/Login.js';

jest.mock('../src/main.js');
jest.mock('../src/lib/imports.js');

describe('Test de Registro', () => {
  test('El componente es una función', () => {
    expect(typeof register).toBe('function');
  });

  test('Existe el form de registro', () => {
    const registro = register();
    const form = registro.querySelector('.form-register');
    expect(form).not.toBeNull();
  });

  test('El usuario crea una cuenta', () => {
    const registro = register();
    const form = registro.querySelector('.form-register');
    const correo = registro.querySelector('#user-mail');
    const contraseña = registro.querySelector('#user-pass');
    correo.value = 'correo@correo.com';
    contraseña.value = '123456';
    form.submit();
    setTimeout(() => { expect(window.location.pathname).toBe('/home'); }, 7000);
  });
  /* Aqui se pone lo mismo que arriba pero con una contraseña
   que sea 123 y se usa el SnapShot en vez de el toBe */
});

