import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '../useForm';

describe('useForm', () => {
  const initialState = { token: '' };

  it('debe retornar el estado inicial', () => {
    const { result } = renderHook(() => useForm(initialState));

    const [values, handleInputChange, reset] = result.current;

    expect(values).toEqual(initialState);
    expect(typeof handleInputChange).toBe('function');
    expect(typeof reset).toBe('function');
  });

  it('debe cambiar el valor del formulario', () => {
    const { result } = renderHook(() => useForm(initialState));
    const [, handleInputChange] = result.current;

    act(() => {
      handleInputChange({
        target: {
          name: 'token',
          value: '123',
        },
      });
    });

    const [values] = result.current;

    expect(values).toEqual({ ...initialState, token: '123' });
  });

  it('debe de re establecer el formulario con la funcion reset', () => {
    const { result } = renderHook(() => useForm(initialState));
    const [, handleInputChange, reset] = result.current;

    act(() => {
      handleInputChange({
        target: {
          name: 'token',
          value: '123',
        },
      });
      reset();
    });
    const [values] = result.current;

    expect(values).toEqual(initialState);
  });
});
