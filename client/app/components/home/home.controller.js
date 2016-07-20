class HomeController {
  constructor($window, $scope) {
    this.name = 'home';
    this.$window = $window;
    $scope.scroll = 0;
  }
}

export default HomeController;
