import React from 'react';
import { render } from '@testing-library/react';
import { configure, shallow } from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({adapter: new Adapter()});

/* test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
}); */

describe('App', ()=>{
  it('should render the App without crashing', ()=> {
    shallow(<App/>);
  });
});
