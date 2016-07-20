//TODO: rename component definition files to index.js so I can just refer to the folder on import
//TODO: add .name to end of const defintion so I can just do .module('app', [Common, Components]) rather than Common.name etc
//TODO: maybe remove all controllerAs overrides, defaults to $ctrl


import angular from 'angular';
import angularMaterialize from 'angular-materialize';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

const root = angular
  .module('app', [
    Common.name,
    // Common,
    Components.name,
    // Components,
    uiRouter,
    angularMaterialize
  ])
  .config(($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .component('app', AppComponent);
  // .name;

export default root;