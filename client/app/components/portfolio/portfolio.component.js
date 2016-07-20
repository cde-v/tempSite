import template from './portfolio.html';
import controller from './portfolio.controller';
import './portfolio.scss';

let portfolioComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default portfolioComponent;
