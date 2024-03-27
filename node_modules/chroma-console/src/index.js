"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coco = void 0;
var tinygradient = require('tinygradient');
var sampleJson = {
    glossary: {
        title: 'example glossary',
        GlossDiv: {
            title: 'S',
            GlossList: {
                GlossEntry: {
                    ID: 'SGML',
                    SortAs: 'SGML',
                    GlossTerm: 'Standard Generalized Markup Language',
                    Acronym: 'SGML',
                    Abbrev: 'ISO 8879:1986',
                    GlossDef: {
                        para: 'A meta-markup language, used to create markup languages such as DocBook.',
                        GlossSeeAlso: ['GML', 'XML'],
                    },
                    GlossSee: 'markup',
                },
            },
        },
    },
};
var Coco = /** @class */ (function () {
    function Coco() {
        this.consoleRed = function (value) {
            console.log('\x1b[0;31m', value);
        };
        this.consoleOrange = function (value) {
            console.log('\x1b[38;2;255;100;0m', value);
        };
        this.consoleYellow = function (value) {
            console.log('\x1b[0;33m', value);
        };
        this.consoleGreen = function (value) {
            console.log('\x1b[0;32m', value);
        };
        this.consoleBlue = function (value) {
            console.log('\x1b[0;36m', value);
        };
        this.consolePurple = function (value) {
            console.log('\x1b[38;2;179;124;255m', value);
        };
        this.consoleWhite = function (value) {
            console.log('\x1b[0m', value);
        };
        this.consoleRedOrGreen = function (value) {
            var str = value.replace('!', '').replace('!', '') + '';
            if (eval(value)) {
                console.log('\x1b[0;32m', str + ' => ' + eval(value));
            }
            else {
                console.log('\x1b[0;31m', str + ' => ' + eval(value));
            }
        };
    }
    Coco.isBrowser = function () {
        try {
            if (window === undefined || !window) {
                return false;
            }
            return !!window;
        }
        catch (_a) {
            return false;
        }
    };
    Coco.getGradient = function (keyword) {
        if (!keyword) {
            return tinygradient(this.gradientShorthands.softrainbow);
        }
        var gradient = Object.fromEntries(Object.entries(Coco.gradientShorthands).filter(function (_a) {
            var key = _a[0];
            return key.includes(keyword);
        }));
        var holder = Object.values(gradient);
        return tinygradient(holder[0]);
    };
    Coco.setColor = function (keyword) {
        if (keyword) {
            Coco.gradient = this.getGradient(keyword);
        }
        else {
            Coco.gradient = tinygradient(Coco.gradientShorthands.softrainbow);
        }
    };
    Coco.log = function (inputString) {
        if (Coco.isBrowser()) {
            console.log(this.formatString(inputString));
        }
        else {
            console.log('\x1B[0m', this.formatString(inputString));
        }
    };
    Coco.prototype.buffer = function () {
        var holder = '■▣'.repeat(50);
        Coco.formatString(holder);
    };
    Coco.formatString = function (input) {
        if (typeof input === 'object') {
            input = JSON.stringify(input, null, 2);
        }
        var backupGraident = Coco.gradient;
        if (input.length == 0) {
            return input;
        }
        else if (input.length < 3) {
            var editedGradient = Coco.gradient.stops.slice(0, input.length);
            var output = '';
            for (var i = 0; i < input.length; i++) {
                // @ts-ignore
                var _a = editedGradient[i].color, _r = _a._r, _g = _a._g, _b = _a._b;
                output += "\u001B[38;2;".concat(Math.round(_r), ";").concat(Math.round(_g), ";").concat(Math.round(_b), "m").concat(input[i]);
            }
            output += '\x1b[0m';
            return output;
        }
        else {
            if (input.length < Coco.gradient.stops.length) {
                var holder2 = Coco.gradient.stops.slice(0, input.length - 1);
                Coco.gradient = tinygradient(holder2);
            }
            var colorArray = Coco.gradient.rgb(input.length);
            var output = '';
            for (var i = 0; i < input.length; i++) {
                // @ts-ignore
                var _c = colorArray[i], _r = _c._r, _g = _c._g, _b = _c._b;
                output += "\u001B[38;2;".concat(Math.round(_r), ";").concat(Math.round(_g), ";").concat(Math.round(_b), "m").concat(input[i]);
            }
            output += '\x1B[0m';
            Coco.gradient = backupGraident;
            return output;
        }
    };
    Coco.gradientShorthands = {
        purplehaze: ['#9900ff', '#cc99ff'],
        vaporwave: ['#0000ff', '#ff3399', '#00ffcc'],
        oldmovie: [
            '#F8F9FA',
            '#E9ECEF',
            '#DEE2E6',
            '#CED4DA',
            '#ADB5BD',
            '#6C757D',
            '#495057',
            '#343A40',
            '#212529',
        ],
        firewood: [
            '#03071E',
            '#370617',
            '#6A040F',
            '#9D0208',
            '#D00000',
            '#DC2F02',
            '#E85D04',
            '#F48C06',
            '#FAA307',
        ],
        softrainbow: [
            '#c1153d',
            '#dd901c',
            '#efe52d',
            '#5eef2d',
            '#2750f4',
            '#2914e5',
        ],
    };
    Coco.gradient = tinygradient(Coco.gradientShorthands.softrainbow);
    Coco.loren = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    Coco.start = function () {
        Coco.log('■▣'.repeat(50));
        Coco.log('■▣'.repeat(21) + ' Starting up~ ' + '■▣'.repeat(22));
        Coco.log('■▣'.repeat(50));
        console.log('');
    };
    Coco.end = function () {
        console.log('');
        Coco.log('■▣'.repeat(50));
        Coco.log('■▣'.repeat(21) + ' End of program ' + '■▣'.repeat(21));
        Coco.log('■▣'.repeat(50));
    };
    Coco.testForCharacterLengths = function () {
        Coco.start();
        Coco.log('a');
        Coco.log('aa');
        Coco.log('aaa');
        Coco.log('aaaa');
        Coco.log('aaaaa');
        Coco.log('aaaaaaaaaa');
        Coco.log(Coco.loren);
        Coco.end();
    };
    Coco.debug = function () {
        Coco.testForCharacterLengths();
        Coco.setColor('purplehaze');
        Coco.testForCharacterLengths();
        Coco.setColor('vaporwave');
        Coco.testForCharacterLengths();
        Coco.setColor('oldmovie');
        Coco.testForCharacterLengths();
        Coco.setColor('firewood');
        Coco.testForCharacterLengths();
        Coco.setColor('softrainbow');
        Coco.testForCharacterLengths();
        Coco.log(sampleJson);
    };
    return Coco;
}());
exports.Coco = Coco;
Coco.debug();
