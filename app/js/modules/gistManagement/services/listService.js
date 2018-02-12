'use strict';

module.exports = ['$q',
    'API',
    'HttpService',
    function(
        $q,
        API,
        HttpService
    ) {
        function getUsers() {
            return HttpService.httpRequest({
                type: 'GET',
                url: API.userList
            });
        };

        return {
            getUsers: getUsers
        }

    }
];