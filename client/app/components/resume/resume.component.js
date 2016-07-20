import template from './resume.html';
import controller from './resume.controller';
import './resume.scss';

let resumeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default resumeComponent;
