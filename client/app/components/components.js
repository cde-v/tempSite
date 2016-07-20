import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Datavis from './datavis/datavis';
import Snowyvis from './snowyvis/snowyvis';

const componentModule = angular
  .module('app.components', [
    Home.name,
    About.name,
    Datavis.name,
    Snowyvis.name
  ]);

export default componentModule;
