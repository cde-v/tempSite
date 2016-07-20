import angular from 'angular';
import uiRouter from 'angular-ui-router';
import portfolioComponent from './portfolio.component';

let portfolioModule = angular.module('portfolio', [
  uiRouter
])

.component('portfolio', portfolioComponent);

export default portfolioModule;
