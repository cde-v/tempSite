import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularMaterialize from 'angular-materialize';
import heroComponent from './hero.component';

let heroModule = angular.module('hero', [
  uiRouter,
  angularMaterialize
])

.component('hero', heroComponent);

export default heroModule;
