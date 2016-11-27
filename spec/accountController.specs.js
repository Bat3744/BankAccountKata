describe("accountController", function() {
    
    beforeEach(module('accountApp'));

    var $controller,
        $filter,
        $scope = {},
        $element = angular.element('<div></div>');

    beforeEach(inject(function($controller, $filter){
        controller = $controller('AccountController', { '$scope': $scope, '$element': $element });
        filter = $filter;
    }));

    describe('updateAccount', function() {

        it('should add deposit amount to the current account amount', function() {
            // When
            $scope.depositToAccount({'deposit': '10'});

            // Then
            expect($scope.account.amount).toEqual(10);
        });

        it('should call addOperation', function() {
            // Given
            spyOn($scope, 'addOperation');

            // When
            $scope.depositToAccount({'deposit': '10'});

            // Then
            expect($scope.addOperation).toHaveBeenCalledWith('deposit', '10');
        });
        
    });

    describe('withdrawAccount', function() {

        it('should substract withdraw amount to the current account amount', function() {
            // When
            $scope.withdrawAccount({'withdraw': '10'});
            
            // Then
            expect($scope.account.amount).toEqual(-10);
        });

        it('should call addOperation', function() {
            // Given
            spyOn($scope, 'addOperation');

            // When
            $scope.withdrawAccount({'withdraw': '10'});

            // Then
            expect($scope.addOperation).toHaveBeenCalledWith('withdraw', '10');
        });
        
    });

    describe('addOperation', function() {

        it('should add an operation in DOM', function() {
            // Given
            spyOn($element, 'append');
            var now = filter('date')(new Date(), 'dd/MM/yyyy - hh:mm');

            // When
            $scope.addOperation('deposit', '10');

            // Then
            expect($element.append).toHaveBeenCalledWith('<p>deposit | ' + now + ' | 10 | 0</p>');
        });
        
    });

});