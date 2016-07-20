import angular from 'angular';
import Navbar from './navbar/navbar';
import Footbar from './footbar/footbar';
import Hero from './hero/hero';
import Helper from './helper/helper';

let commonModule = angular.module('app.common', [
  Navbar.name,
  Footbar.name,
  Hero.name,
  Helper.name
]);

export default commonModule;
