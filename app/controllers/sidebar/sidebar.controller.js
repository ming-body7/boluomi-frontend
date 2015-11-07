angular.module('myApp').controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = false;
  $scope.status = {
    isFirstOpen: false,
    isFirstDisabled: false,
    isSecondOpen: false,
    isSecondDisabled: false
  };
  $scope.testdata = 1;
});