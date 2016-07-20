import angular from 'angular';
import uiRouter from 'angular-ui-router';
import resumeComponent from './resume.component';

let resumeModule = angular.module('resume', [
  uiRouter
])

.component('resume', resumeComponent);

export default resumeModule;
