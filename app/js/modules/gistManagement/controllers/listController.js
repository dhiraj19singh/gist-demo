'use strict';

module.exports = [
    '$scope',
    '$rootScope',
    '$state',
    'ListService',
    '$window',
    function($scope, $rootScope, $state, ListService, $window) {

        $scope.init = function() {
            $scope.users = [];
            $scope.isUserLoading=true;
            $scope.cfg = {
                currentPage: 1,
                rowsPerPage: 10,
                skip: 0,
            };
            getGistUsers();
        };

        /* get the list of all gist users*/
        function getGistUsers() {
            $scope.isUserLoading=true;
            ListService
                .getUsers()
                .then(function(response) {
                    $scope.users = response.data;
                    $scope.totalItems = $scope.users.length;
                }, function(error) {
                    console.log(error);
                })
                .finally(function(){
                    $scope.isUserLoading=false;
                });
        }

        /*show the specific users of that particular page */
        $scope.showUsers = function(index) {
            return (index >= $scope.cfg.skip && index < ($scope.cfg.skip + $scope.cfg.rowsPerPage));
        };

        /*set the skip after changing the page*/
        $scope.pageChanged = function() {
            $scope.cfg.skip = ($scope.cfg.currentPage - 1) * $scope.cfg.rowsPerPage;
        };

        $scope.showDetails = function(user) {
            $window.open(user.url);
        }
    }
];