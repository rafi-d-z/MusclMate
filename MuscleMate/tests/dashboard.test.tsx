import renderer from 'react-test-renderer';
import MainMenu from '../src/App';

it('changes the class when hovered', () => {
  const component = renderer.create(<MainMenu />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});