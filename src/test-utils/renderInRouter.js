import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const renderInRouter = (
  ui,
  { history = createBrowserHistory(), ...options },
) => {
  const Wrapper = ({ children }) => {
    return <Router history={history}>{children}</Router>;
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export default renderInRouter;
