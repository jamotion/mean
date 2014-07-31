'use strict';

describe('Pack1Directive', function () {

    beforeEach(module('pack1'));
    //Load the html template
    beforeEach(module('packages/pack1/directives/Pack1.html'));

    var scope, elm;

    beforeEach(inject(function ($rootScope, $compile) {

        elm = angular.element('<Pack1-directive></Pack1-directive>');
        scope = $rootScope.$new();
        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should have empty content', function () {
        expect(elm.find('h1').text()).toBe('Example template of directive');
    });
});