angular.module('myApp').controller('AccordionDemoCtrl', function ($scope, $state) {
  $scope.tog = 1;
  switch($state.current.name){
    case 'main':
          $scope.tog = 1;
          break;
    case 'main.create':
          $scope.tog = 1;
          break;
    case 'main.modified':
        $scope.tog = 1;
        break;
    case 'main.advertisement':
        $scope.tog = 2;
        break;
    case 'main.information':
        $scope.tog = 3;
        break;
    case 'main.password':
        $scope.tog = 4;
        break;
    case 'main.account':
        $scope.tog = 5;
        break;

  }
});