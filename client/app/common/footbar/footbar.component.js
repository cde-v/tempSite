import template from './footbar.html';
import controller from './footbar.controller';
import './footbar.scss';

let footbarComponent = {
    restrict: 'E',
    bindings: {},
    template,
    controller,
    controllerAs: 'vm'
};

export default footbarComponent;
