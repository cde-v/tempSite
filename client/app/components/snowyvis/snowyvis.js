import angular from 'angular';
import uiRouter from 'angular-ui-router';
import snowyvisComponent from './snowyvis.component';

let snowyvisModule = angular.module('snowyvis', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('snowyvis', {
      url: '/snowyvis',
      template: '<snowyvis></snowyvis>'
    });
})

.directive('snowyvis', snowyvisComponent);

export default snowyvisModule;
