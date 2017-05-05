'use strict';

describe('Graph Service:', function () {

    var graphService;
    var VisDataSet;

    beforeEach(function () {
        module('graph.service');
        module('ngVis');
    });

    beforeEach(inject(function (_graphService_, _VisDataSet_) {
        graphService = _graphService_;
        VisDataSet = _VisDataSet_;
    }));

    it('Expects Ports Service to be defined', function () {
        expect(graphService).to.not.be.undefined;
    });

    it('Expects functions to be set', function () {
        expect(graphService.getGraphData).to.not.be.undefined;
        expect(typeof graphService.getGraphData).to.be.equal('function');
        expect(graphService.updateGraphData).to.not.be.undefined;
        expect(typeof graphService.updateGraphData).to.be.equal('function');
        expect(graphService.getGraphOptions).to.not.be.undefined;
        expect(typeof graphService.getGraphOptions).to.be.equal('function');
    });

    it('Expects getGraphoptions() to get valid options', function () {
        expect(typeof graphService.getGraphOptions()).to.be.equal('object');
        expect(graphService.getGraphOptions()).to.be.deep.equal(
            {
                autoResize: true,
                width: '60%',
                height: '570px',
                groups: {
                    switch: {
                        font: {
                            face: 'times',
                            size: 14,
                            strokeWidth: 1.5,
                            strokeColor: '#000000',
                            bold: {
                                color: '#000000'
                            }
                        },
                        image: '../app/assets/icons/switch.png',
                        shape: 'image',
                        size: 30,
                    },
                    ports: {
                        font: {
                            face: 'times',
                            size: 10,
                            strokeWidth: 0.5,
                            strokeColor: '#000000',
                            bold: {
                                color: '#000000'
                            }
                        },
                        image: '../app/assets/icons/ports.png',
                        shape: 'image',
                        size: 12,
                    },
                    devices: {
                        font: {
                            face: 'times',
                            size: 10,
                            strokeWidth: 0.5,
                            strokeColor: '#000000',
                            bold: {
                                color: '#000000'
                            }
                        },
                        shape: 'icon',
                        icon: {
                            face: 'FontAwesome',
                            code: '\uf233',
                            size: 25,
                            color: '#000000'
                        }
                    }
                }
            }
        );
    });

    it('Expects getGraphData to return valid nodes and edges', function () {
        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);
        var portdeviceNodes = [2, 1];
        expect(graphService.getGraphData(portdeviceNodes, nodes, edges)).to.not.be.empty;
        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);
        var portdeviceNodes = [];
        expect(graphService.getGraphData(portdeviceNodes, nodes, edges)).to.not.be.empty;
    });

    it('Expects updateGraphData to return valid nodes and edges', function () {
        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);
        var portdeviceNodes = [2, 1];
        var newportDevices = [4, 0, 1];
        expect(graphService.updateGraphData(newportDevices, portdeviceNodes, nodes, edges)).to.not.be.empty;
        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);
        var portdeviceNodes = [2, 1];
        var newportDevices = [1];
        expect(graphService.updateGraphData(newportDevices, portdeviceNodes, nodes, edges)).to.not.be.empty;
        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);
        var portdeviceNodes = [4, 3, 6, 4];
        var newportDevices = [1, 3, 5, 6];
        expect(graphService.updateGraphData(newportDevices, portdeviceNodes, nodes, edges)).to.not.be.empty;
        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);
        var portdeviceNodes = [2, 1];
        var newportDevices = [];
        expect(graphService.updateGraphData(newportDevices, portdeviceNodes, nodes, edges)).to.not.be.empty;
        var nodes = VisDataSet([]);
        var edges = VisDataSet([]);
        var portdeviceNodes = [];
        var newportDevices = [];
        expect(graphService.updateGraphData(newportDevices, portdeviceNodes, nodes, edges)).to.not.be.empty;
    });

});