import { shallow } from 'enzyme';
import NavBar from '../NavBar';

describe('NavBar', () => {
  it('Deberia renderisar', () => {
    const wrapper = shallow(<NavBar />);

    expect(wrapper).toMatchSnapshot();
  });

  it('deberia tener 2 rutas', () => {
    const wrapper = shallow(<NavBar />);

    // console.log(wrapper.find('NavLink').debug())
    expect(wrapper.find('NavLink').length).toBe(2);
  });

  it('Deberia tener una ruta para /list y /addItem', () => {
    const wrapper = shallow(<NavBar />);

    expect(wrapper.find('NavLink').at(0).prop('to')).toBe('/list');
    expect(wrapper.find('NavLink').at(1).prop('to')).toBe('/addItem');
  });

  it('Las rutas deberian tener nav-link en su className', () => {
    const wrapper = shallow(<NavBar />);

    expect(wrapper.find('NavLink').at(0).prop('className')).toBe('nav-link');
    expect(wrapper.find('NavLink').at(1).prop('className')).toBe('nav-link');
  });
});
