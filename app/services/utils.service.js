'use strict';

angular.module('utils.service', [])

    .factory('utilsService', [function () {

        var devices = [];

        return {
            convertTime: function (uptime) {
                var seconds = (uptime / 1000) % 60;
                var minutes = ((uptime / (1000 * 60)) % 60);
                var hours = ((uptime / (1000 * 60 * 60)) % 24);
                var time;

                if ((hours | 0) > 0) {

                    time = (hours | 0) + "h " + (minutes | 0) + "m " + (seconds | 0) + "s ";

                } else if ((minutes | 0) > 0) {

                    time = (minutes | 0) + "m " + (seconds | 0) + "s ";

                } else {

                    time = (seconds | 0) + "s ";

                }
                return time;
            },
            memorySet: function (memFree, memTotal) {

                var value = (((memTotal - memFree) / memTotal) * 100);
                var state;


                if (value < 55.0) {

                    state = 'list-group-item list-group-item-success';

                } else if (value < 80.0) {

                    state = 'list-group-item list-group-item-warning';

                } else {

                    state = 'list-group-item list-group-item-danger';

                }

                return {
                    value: value,
                    state: state
                };
            }
        }
    }]);