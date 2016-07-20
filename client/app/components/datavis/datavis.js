import angular from 'angular';
import uiRouter from 'angular-ui-router';
import datavisComponent from './datavis.component';

let datavisModule = angular.module('datavis', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('datavis', {
      url: '/datavis',
      template: '<datavis></datavis>'
    });
})

.directive('datavis', datavisComponent);

export default datavisModule;
