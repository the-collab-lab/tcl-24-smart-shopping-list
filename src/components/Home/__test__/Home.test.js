import { shallow } from 'enzyme';
import { useFirebase } from '../../../hooks/useFirebase';
import { useForm } from '../../../hooks/useForm';
import useNotification from '../../../hooks/useNotification';
import Home from '../Home';

jest.mock('../../../hooks/useForm');
jest.mock('../../../hooks/useNotification');
jest.mock('../../../hooks/useFirebase');

describe('Home', () => {
  it('deberia renderisar', () => {
    const values = { token: '' };
    const handleInputChange = jest.fn();
    const reset = jest.fn();

    useForm.mockReturnValue([values, handleInputChange, reset]);

    const load = '';
    const setLoad = jest.fn();
    const error = '';
    const setError = jest.fn();

    useNotification.mockReturnValue({ load, setLoad, error, setError });

    const getAll = jest.fn();

    useFirebase.mockReturnValue({ getAll });

    const wrapper = shallow(<Home />);

    expect(wrapper).toMatchSnapshot();
  });

  it('debe llamar el handle input change y limpiar la caja de texto', () => {
    const values = { token: '' };
    const handleInputChange = jest.fn();
    const reset = jest.fn();

    useForm.mockReturnValue([values, handleInputChange, reset]);

    const load = '';
    const setLoad = jest.fn();
    const error = '';
    const setError = jest.fn();

    useNotification.mockReturnValue({ load, setLoad, error, setError });

    const getAll = jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn().mockImplementation(() => Promise.resolve(true)),
      })),
    }));

    useFirebase.mockReturnValue({ getAll });

    const wrapper = shallow(<Home />);
    const value = '123123';

    wrapper.find('input').simulate('change', { target: { value } });
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(handleInputChange).toHaveBeenCalled();
    expect(wrapper.find('input').prop('value')).toBe('');
  });
});
