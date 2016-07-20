import angular from 'angular';
import HelperFactory from './helper.factory';

let helperModule = angular.module('helper', [])

.factory('HelperFactory', HelperFactory);

export default helperModule;
