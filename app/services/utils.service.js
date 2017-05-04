'use strict';

angular.module('utils.service', [])

    .factory('utilsService', [function () {

        return {
            convertTime: function (uptime) {
                var seconds = (uptime / 1000) % 60;
                var minutes = ((uptime / (1000 * 60)) % 60);
                var hours = ((uptime / (1000 * 60 * 60)) % 24);
                var time;

                if ((hours | 0) > 0) {

                    time = (hours | 0) + "h " + (minutes | 0) + "m " + (seconds | 0) + "s";

                } else if ((minutes | 0) > 0) {

                    time = (minutes | 0) + "m " + (seconds | 0) + "s";

                } else {

                    time = (seconds | 0) + "s";

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

                } else if (isNaN(value)) {

                    value = '-';
                    state = '';

                } else {

                    state = 'list-group-item list-group-item-danger';

                }

                return {
                    value: value,
                    state: state
                };
            },
            convertBw: function (bw) {

                var convertedBw;

                if (bw === 0) {

                    return '-';

                } else if (bw < 1000) {

                    convertedBw = bw;
                    return convertedBw + ' bit/s';

                }
                else if (bw < 1000000) {

                    convertedBw = bw / 1000;
                    return convertedBw.toFixed(2) + ' kbit/s';

                } else {

                    convertedBw = bw / 1000000;
                    return convertedBw.toFixed(2) + ' Mbit/s';

                }
            }
        }
    }]);