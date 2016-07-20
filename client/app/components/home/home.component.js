import template from './home.html';
import controller from './home.controller';
import './home.scss';

let homeComponent = function() {
  return {
    restrict: 'EA',
    template,
    controller,
    controllerAs: 'vm',
    link: homeComponentLink
  };
};

function homeComponentLink(scope, element, attrs) {

  let keyboard;
  let letters;
  let letterC;
  let letterD;
  let letterE;
  let letterV;
  let height;
  let w;
  let h;

  let buffer = 0.6;
  let rotate = 0;
  let animStarted = false;

  $(window).load(initLetters);
  $(window).on('scroll', scrollHandler);
  $('.parallax').parallax();

  function scrollHandler() {
    let scrollTop = $(this).scrollTop();
    
    let calc = 2 * scrollTop / (height * buffer);
    let iCalc = 1 - calc;

    if (calc >= 0.8) {
      calc = 0.8;
      iCalc = 0.2;
      letters.css({ 'opacity': calc });
      keyboard.css({ 'opacity': iCalc });
      if(!animStarted) skewLetters();
    } else {
      letters.css({ 'opacity': calc });
      keyboard.css({ 'opacity': iCalc });
    }
  }

  function initLetters() {
    keyboard = $('#keyboard');
    letters = $('.letters');
    letterC = $('#letterc');
    letterD = $('#letterd');
    letterE = $('#lettere');
    letterV = $('#letterv');
    height = keyboard.outerHeight();

    w = keyboard[0].width;
    h = keyboard[0].height;

    let wOffset = keyboard.offset().left;
    let hOffset = keyboard.offset().top;

    let wScaleRatio = keyboard[0].naturalWidth / w;
    let hScaleRatio = keyboard[0].naturalHeight / h;

    letterC.css({
      width: (letterC[0].width / wScaleRatio) + 'px',
      height: (letterC[0].height / hScaleRatio) + 'px',
      left: w * 0.516 + 'px',
      top: h * 0.839 + hOffset - (hOffset / hScaleRatio) + 'px'
    });

    letterD.css({
      width: (letterD[0].width / wScaleRatio) + 'px',
      height: (letterD[0].height / hScaleRatio) + 'px',
      left: w * 0.345 + 'px',
      top: h * 0.788 + hOffset - (hOffset / hScaleRatio) + 'px'
    });

    letterE.css({
      width: (letterE[0].width / wScaleRatio) + 'px',
      height: (letterE[0].height / hScaleRatio) + 'px',
      left: w * 0.199 + 'px',
      top: h * 0.706 + hOffset - (hOffset / hScaleRatio) + 'px'
    });

    letterV.css({
      width: (letterV[0].width / wScaleRatio) + 'px',
      height: (letterV[0].height / hScaleRatio) + 'px',
      left: w * 0.571 + 'px',
      top: h * 0.731 + hOffset - (hOffset / hScaleRatio) + 'px'
    });
  }

  function skewLetters() {

    letterC.css({
      'transition': 'all 1s linear 0.5s',
      // 'transform': 'skew(-72deg, 20deg)'
      'transform': 'scale(1) rotate(360deg)',
      'opacity': 0
      // 'transform': 'matrix(1.03528, 3.8637, -0.479158, 2.07546, 0, 0)'
    });

    letterD.css({
      'transition': 'all 1s linear 1s',
      // 'transform': 'skew(-72deg, 20deg)'
      'transform': 'scale(1) rotate(360deg)',
      'opacity': 0
      // 'transform': 'matrix(1.03528, 3.8637, -0.479158, 2.07546, 0, 0)'
    });

    letterE.css({
      'transition': 'all 1s linear 1.5s',
      // 'transform': 'skew(-72deg, 20deg)'
      'transform': 'scale(1) rotate(360deg)',
      'opacity': 0
      // 'transform': 'matrix(1.03528, 3.8637, -0.479158, 2.07546, 0, 0)'
    });

    letterV.css({
      'transition': 'all 1s linear 2s',
      // 'transform': 'skew(-72deg, 20deg)'
      'transform': 'scale(1) rotate(360deg)',
      'opacity': 0
      // 'transform': 'matrix(1.03528, 3.8637, -0.479158, 2.07546, 0, 0)'
    });
  }




}

export default homeComponent;
