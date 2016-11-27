var app = angular.module('accountApp', []);

app.controller('AccountController', function($scope, $element, $filter) {

  $scope.account = {
    amount: 0
  };

  $scope.depositToAccount = function(account) {
    $scope.account.amount += parseFloat(account.deposit);
    this.addOperation('deposit', account.deposit);
  };

  $scope.withdrawAccount = function(account) {
    $scope.account.amount -= parseFloat(account.withdraw);
    this.addOperation('withdraw', account.withdraw);
  };

  $scope.addOperation = function(type, amount) {
    var now = $filter('date')(new Date(), 'dd/MM/yyyy - hh:mm'),
      currentOperation = '<p>' + type + ' | ' + now + ' | ' + amount + ' | ' + $scope.account.amount + '</p>',
      isFirstOperation = $element.find('p').length == 0;

      if (isFirstOperation) {
        $element.append('<p> Operation | Date | Amount |  Balance </p>');
      }
    
    $element.append(currentOperation);
  };
  
});