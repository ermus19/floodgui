'use strict';

angular.module('stats.controller', [])

    .controller('stats.controller', function ($scope, $interval, storageService, devicesService, utilsService, restService) {

        $scope.location = storageService.getLocation();

        $scope.showUptime = false;
        $scope.showMemory = false;
        $scope.showVersion = false;
        $scope.showApiHealth = false;
        $scope.showFirewallStatus = false;
        $scope.showOFversion = false;
        $scope.showHostsCount = false;
        $scope.showSwitch = false;

        $scope.memoryState = 'list-group-item';
        $scope.apiHealthState = 'list-group-item';

        restService.getVersion().query().$promise.then(function (data) {

            var version;
            version = data.version;
            $scope.version = version;
            $scope.showVersion = true;

        });
        var getStats = $interval(function () {

            restService.getSwitches().query().$promise.then(function (data) {

                if (data.length === 1) {

                    $scope.OFVersion = data[0].openFlowVersion;
                    $scope.showOFversion = true;
                    devicesService.setSwitchID(data[0].switchDPID);
                    $scope.showSwitch = true;

                } else{

                    devicesService.setSwitchID(undefined);
                    $scope.showSwitch = false;

                }

            });

            restService.getSummary().query().$promise.then(function (data) {

                $scope.hosts = data['# hosts'];
                $scope.showHostsCount = true;

            });

            restService.getMemory().query().$promise.then(function (data) {

                var memTotal, memFree;
                memFree = data.free;
                memTotal = data.total;

                var result = utilsService.memorySet(memFree, memTotal);
                $scope.memory = result.value.toFixed(1) + " %";
                $scope.memoryState = result.state;
                $scope.showMemory = true;

            });

            restService.getFirewallStatus().query().$promise.then(function (data) {

                var status;
                status = data.result;
                $scope.firewallStatus = status;
                $scope.showFirewallStatus = true;

            });

            restService.getApiHealth().query().$promise.then(function (data) {

                var health;
                health = data.healthy;

                healthSet(health);

            });


        }, 5000);

        var getUptime = $interval(function () {

            restService.getUptime().query().$promise.then(function (data) {

                var uptime = data.systemUptimeMsec;
                $scope.uptime = utilsService.convertTime(uptime);
                $scope.showUptime = true;

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

        $scope.$on('$destroy', function () {
            $interval.cancel(getUptime);
            $interval.cancel(getStats);
        });

    });