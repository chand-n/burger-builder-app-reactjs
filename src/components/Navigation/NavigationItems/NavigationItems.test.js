import React from 'react';
import Enzyme, { configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

Enzyme.configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
    let wrapper;
    beforeEach( () => {
        wrapper=  shallow(<NavigationItems />);
    });
    it("should render two <NgnItem /> elements if not authenticated", () => {
           expect(wrapper.find(NavigationItem)).toHaveLength(2);
      }); 
      it("should render three <NgnItem /> elements if authenticated", () => {
         wrapper = shallow(<NavigationItems isAuthenticated />);
         expect(wrapper.find(NavigationItem)).toHaveLength(3);
       }); 
       it("should render logout link if authenticated", () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>));
      }); 
})