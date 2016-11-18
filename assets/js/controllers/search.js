app.controller('searchController', function ($scope, $modal, $log) {



  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'assets/js/views/searchWindow.html',
      controller: 'ModalInstanceCtrl'    });
  };
});

app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, qoutesIDs) {


  $scope.qoutesIDs = qoutesIDs;
  $scope.selected = $scope.qoutesIDs[0];
  console.log(qoutesIDs);

  $scope.reposition = function () {
    $modalInstance.reposition();
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.select = function($index)
  {
    console.log("selected");
    $scope.selected = $scope.qoutesIDs[$index];
  }
});