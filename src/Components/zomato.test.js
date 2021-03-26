import React from 'react'; 
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Zomato from './zomato';
import restaurantList from './zomato';

//test of the component zomato.js contains an array restaurantList and if it is called

configure({adapter: new Adapter()})

describe('<zomato />', ()=>{
    it('should render restaurents list', ()=>{
        const wrapper =shallow(<Zomato />);
        expect(wrapper.find(restaurantList)).toHaveBeenCalled
    });
});