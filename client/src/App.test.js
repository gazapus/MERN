import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Routes from './components/Routes';
import Main from './components/Main';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('App debe contener un componente Routes', function () {
  expect(shallow(<App />).contains(
    <Routes />
  )).toBe(true);
});

it('Main debe contener tal texto', function () {
  expect(shallow(<Main />).contains(
    <p className="text-center">Find your perfect trip, designed by insiders who know and love their cities</p>
  )).toBe(true);
});

it('Prueba', function () {
  const funcion = jest.fn(()=>3);
  expect(funcion(5,6)).toBe(3);
  expect(funcion).toHaveBeenCalledTimes(1);
  expect(funcion).toHaveBeenCalledWith(5,6);

});