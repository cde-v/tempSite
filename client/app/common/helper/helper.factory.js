let HelperFactory = function($window) {
    var helpers = {
        watchWinSize: watchWinSize
    };
    function onWinResize(listener) {
        var winObj = angular.element($window);
        winObj.bind('resize', listener);
        return function () {
            winObj.unbind('resize', listener);
        };
    }
    function watchWinSize(scope, listener) {
        scope.$on('$destroy', onWinResize(listener));
    }
    return helpers;
};

export default HelperFactory;
