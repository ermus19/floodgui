'use strict';

angular.module('stats.controller', [])

    .controller('stats.controller', function ($scope, $interval, configService, restService) {

        $scope.location = configService.getLocation();

        $scope.showUptime = false;
        $scope.showMemory = false;
        $scope.showVersion = false;
        $scope.showApiHealth = false;
        $scope.showFirewallStatus = false;

        $scope.memoryState = 'list-group-item';
        $scope.apiHealthState = 'list-group-item';

        var getStats = $interval(function () {

            restService.getMemory().query().$promise.then(function (data) {

                var memTotal, memFree;
                memFree = data.free;
                memTotal = data.total;

                memorySet(memFree, memTotal);

            });

            restService.getFirewallStatus().query().$promise.then(function (data) {

                var status;
                status = data.result;
                $scope.firewallStatus = status;
                $scope.showFirewallStatus = true;

            });

            restService.getVersion().query().$promise.then(function (data) {

                var version;
                version = data.version;
                $scope.version = version;
                $scope.showVersion = true;

            });

            restService.getApiHealth().query().$promise.then(function (data) {

                var health;
                health = data.healthy;

                healthSet(health);

            });


        }, 5000);

        var getUptime = $interval(function(){

            restService.getUptime().query().$promise.then(function (data) {

                var uptime = data.systemUptimeMsec;

                uptimeSet(uptime);

            });

        }, 1000);

        var healthSet = function (health) {

            if (health) {

                $scope.apiHealth = 'good';
                $scope.apiHealthState = 'list-group-item list-group-item-success';

            } else {

                $scope.apiHealth = 'bad';
                $scope.apiHealthState = 'list-group-item list-group-item-danger';
            }

            $scope.showApiHealth = true;
        };

        var uptimeSet = function (uptime) {

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

            $scope.uptime = time;
            $scope.showUptime = true;
        };

        var memorySet = function (memFree, memTotal) {

            var value = (((memTotal - memFree) / memTotal) * 100);
            $scope.memory = value.toFixed(1) + " %";

            if (value < 55.0) {

                $scope.memoryState = 'list-group-item list-group-item-success';

            } else if (value < 80.0) {

                $scope.memoryState = 'list-group-item list-group-item-warning';

            } else {

                $scope.memoryState = 'list-group-item list-group-item-danger';

            }

            $scope.showMemory = true;
        };


    });