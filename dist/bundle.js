/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = indexToCoordinate;
/* harmony export (immutable) */ __webpack_exports__["b"] = assign;
/* harmony export (immutable) */ __webpack_exports__["a"] = calcDamage;
const gridCount = 11;
function indexToCoordinate(index) {
    const x = index % gridCount;
    const y = Math.floor(index / gridCount);
    return [x, y];
}
function assign(target, varArgs) {
    const to = Object(target);
    for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index];
        if (nextSource != null) {
            for (let nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
}
function calcDamage(player, monster) {
    const damageToMonsterPerTurn = player.attack - monster.defence;
    const damageToPlayerPerTurn = monster.attack - player.defence;
    if (damageToMonsterPerTurn < 1)
        return false;
    if (damageToPlayerPerTurn < 1)
        return 0;
    const killMonsterTurns = Math.ceil(monster.life / damageToMonsterPerTurn);
    return killMonsterTurns * damageToPlayerPerTurn;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

const mapping = {
    0: 'up',
    1: 'right',
    2: 'down',
    3: 'left'
};
class Creature {
    constructor(humanProps) {
        this.gridCount = 11;
        __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* assign */](this, humanProps);
        if (humanProps.index != undefined)
            this.setPosition();
    }
    get index() {
        return this.y * this.gridCount + this.x;
    }
    set index(val) {
        const x = val % this.gridCount;
        const y = Math.floor(val / this.gridCount);
        if (this.direction != null) {
            const deltaX = this.x - x;
            const deltaY = this.y - y;
            if (deltaX == -1)
                this.dir = 1;
            else if (deltaX == 1)
                this.dir = 3;
            else if (deltaY == -1)
                this.dir = 2;
            else if (deltaY == 1)
                this.dir = 0;
        }
        this.x = x;
        this.y = y;
        if (this.node)
            this.setPosition();
    }
    set dir(val) {
        if (this.node) {
            this.node.classList.remove(mapping[this.direction]);
            this.node.classList.remove(mapping[this.direction] + 'Walking');
            this.node.classList.add(mapping[val]);
            this.node.classList.add(mapping[val] + 'Walking');
            this.direction = val;
            if (this.timer)
                clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.node.classList.remove(mapping[val] + 'Walking');
            }, 300);
        }
    }
    setPosition() {
        this.node.style.left = this.x * this.size + 'px';
        this.node.style.top = this.y * this.size + (this.type === 'player' ? -20 : 0) + 'px';
    }
    remove() {
        this.node.parentNode.removeChild(this.node);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Creature;

class Player extends Creature {
    constructor(playerProps) {
        const player = document.createElement('div');
        player.className = 'player';
        super({
            node: player,
            type: 'player',
            size: playerProps.size,
            index: playerProps.index,
            direction: playerProps.direction
        });
        __WEBPACK_IMPORTED_MODULE_0__utils__["b" /* assign */](this, playerProps);
        this.node.classList.add(mapping[this.direction]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const defineReactive = (node, match, obj) => {
    let value = obj[match];
    node.nodeValue = node.nodeValue.replace('{{' + match + '}}', obj[match]);
    Object.defineProperty(obj, match, {
        get: () => value,
        set: (val) => {
            if (value === val)
                return;
            node.nodeValue = node.nodeValue.replace(value, val);
            value = val;
        }
    });
};
function compile(nodes, obj) {
    const reg = /\{\{(.+)}}/;
    Array.prototype.slice.call(nodes.childNodes).forEach((node) => {
        if (node.nodeType === 1)
            return compile(node, obj);
        if (node.nodeType === 3) {
            const matches = reg.exec(node.nodeValue);
            if (matches && matches[1])
                defineReactive(node, matches[1], obj);
        }
    });
}
/* harmony default export */ __webpack_exports__["a"] = compile;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

class Book {
    constructor() {
        this.node = document.querySelector('.book');
    }
    show(player, monsters) {
        // this.node.innerHTML = ''
        const damages = monsters.map((monster) => __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* calcDamage */])(player, monster));
        console.log(damages);
        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';
        const monsterPatterns = monsters.map((monster) => {
            const creatureEl = document.createElement('div');
            creatureEl.className = 'creature ' + monster.className;
            return creatureEl;
        });
        monsters.forEach((monster, index) => {
            const monsterEl = document.createElement('div');
            const name = document.createElement('div');
            name.className = 'monster-name';
            name.innerHTML = monster.name;
            monsterEl.appendChild(monsterPatterns[index]);
            monsterEl.appendChild(name);
            const text = document.createElement('div');
            const d = damages[index];
            text.className = 'text';
            text.innerHTML = `
        <span>生命: ${monster.life}</span><span>攻击: ${monster.attack}</span> <br>
        <span>金钱: ${monster.money}</span><span>防御: ${monster.defence} </span> <br>
        <span>经验: ${monster.exp}</span><span>损失: ${d === false ? '-' : d}</span>
          `;
            monsterEl.appendChild(text);
            wrapper.appendChild(monsterEl);
        });
        this.node.appendChild(wrapper);
        this.isShowing = true;
    }
    hide() {
        this.node.innerHTML = '';
        this.isShowing = false;
    }
}
/* harmony default export */ __webpack_exports__["a"] = Book;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mvvm__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


class DashBoard {
    constructor(dashBoardData) {
        // this.life = dashBoardData.life
        // this.money = dashBoardData.money
        // this.attack = dashBoardData.attack
        // this.exp = dashBoardData.exp
        // this.defence = dashBoardData.defence
        // this.playerLevel = dashBoardData.playerLevel
        // this.level = dashBoardData.level
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* assign */])(this, dashBoardData);
        this.node = document.querySelector('header');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mvvm__["a" /* default */])(this.node, this);
    }
    update(dashBoardData) {
        this.life = dashBoardData.life;
        this.money = dashBoardData.money;
        this.attack = dashBoardData.attack;
        this.exp = dashBoardData.exp;
        this.defence = dashBoardData.defence;
        this.playerLevel = dashBoardData.playerLevel;
        this.level = dashBoardData.level;
    }
}
/* harmony default export */ __webpack_exports__["a"] = DashBoard;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

const bgMapping = {
    0: 'road',
    1: 'flower1',
    2: 'flower2',
    3: 'tree',
    4: 'wall1',
    5: 'wall2',
    6: 'upstairs1',
    7: 'upstairs2',
    8: 'downstairs',
    9: 'stone'
};
const creatureMapping = {
    0: '',
    1: 'yellowKey',
    2: 'blueKey',
    3: 'redKey',
    4: 'yellowDoor',
    5: 'blueDoor',
    6: 'redDoor',
    7: 'smallFood',
    8: 'bigFood',
    9: 'addAttack',
    10: 'addDefence',
    11: 'downstairs',
    12: 'upstairs',
    13: 'addAttack10',
    14: 'addDefence10',
    15: 'money300',
    16: 'ten',
    17: '',
    18: 'realWall',
    19: 'allKey',
    20: 'levelUp',
    21: 'h21',
    22: 'h22',
    23: 'h23',
    24: '',
    25: '',
    26: 'smallMoneyShop',
    27: 'bigMoneyShop',
    28: 'smallExpShop',
    29: 'bigExpShop',
    31: 'm31',
    32: 'm32',
    33: 'm33',
    34: 'm34',
    35: 'm35',
    36: 'm36',
    37: 'm37',
    38: 'm38',
    39: 'm39',
    40: 'm40',
    41: 'm41',
    42: 'm42',
    43: 'm43',
    44: 'm44',
    45: 'm45',
    46: 'm46',
    47: 'm47',
    48: 'm48',
    49: 'm49',
};
const data = {
    gridCount: 11,
    size: 40,
    index: 82,
    attack: 50,
    defence: 10,
    life: 1000,
    money: 0,
    exp: 0,
    playerLevel: 0,
    level: 0,
    highestLevelEverBeen: 0,
    direction: 0,
    yellowKeys: 0,
    blueKeys: 0,
    redKeys: 0,
    monsters: {
        31: {
            name: '小史莱姆',
            attack: 20,
            defence: 1,
            life: 50,
            exp: 1,
            money: 1,
        },
        32: {
            name: '中史莱姆',
            attack: 15,
            defence: 2,
            life: 70,
            exp: 2,
            money: 2,
        },
        33: {
            name: '大史莱姆',
            attack: 25,
            defence: 5,
            life: 110,
            exp: 4,
            money: 5,
        },
        34: {
            name: '特大史莱姆',
            attack: 40,
            defence: 20,
            life: 150,
            exp: 6,
            money: 8,
        },
        35: {
            name: '小精灵',
            attack: 20,
            defence: 5,
            life: 100,
            exp: 3,
            money: 3,
        },
        36: {
            name: '红精灵',
            attack: 35,
            defence: 10,
            life: 200,
            exp: 5,
            money: 5,
        },
        37: {
            name: '老精灵',
            attack: 50,
            defence: 25,
            life: 125,
            exp: 7,
            money: 10,
        },
        38: {
            name: '欢乐小精灵',
            attack: 75,
            defence: 45,
            life: 300,
            exp: 10,
            money: 13,
        },
        39: {
            name: '呆萌小精灵',
            life: 300,
            attack: 75,
            defence: 45,
            money: 13,
            exp: 10
        },
        40: {
            name: '中二小精灵',
            life: 550,
            attack: 160,
            defence: 90,
            money: 25,
            exp: 20
        },
        41: {
            name: '胖子',
            life: 450,
            attack: 150,
            defence: 90,
            money: 22,
            exp: 19
        },
        42: {
            name: '鼠标史莱姆',
            life: 300,
            attack: 90,
            defence: 50,
            money: 15,
            exp: 12
        },
        43: {
            name: '火烧小精灵',
            life: 100,
            attack: 200,
            defence: 110,
            money: 30,
            exp: 25
        },
        44: {
            name: '无名小精灵',
            life: 700,
            attack: 250,
            defence: 125,
            money: 32,
            exp: 30
        },
        45: {
            name: '暗黑小精灵',
            life: 500,
            attack: 115,
            defence: 65,
            money: 15,
            exp: 15
        },
        46: {
            name: '变态大神',
            life: 500,
            attack: 230,
            defence: 170,
            money: 30,
            exp: 30
        },
        47: {
            name: '无害史莱姆',
            life: 600,
            attack: 260,
            defence: 240,
            money: 47,
            exp: 45
        },
        48: {
            name: '老板',
            life: 1000,
            attack: 500,
            defence: 300,
            money: 60,
            exp: 60
        }
    },
    humans: {
        19: {
            messages: ['获得红黄蓝钥匙各一个']
        },
        21: {
            talked: false,
            messages1: [
                '同学你是来玩膜他的嘛，既然这样，就送你三把钥匙',
                '祝你好运...',
            ],
            messages2: [
                '你的命运，当然要靠自我奋斗！但是也要考虑作者的行程'
            ]
        },
        22: {
            talked: false,
            messages: [
                '作为一个菜鸟小偷，我没能打开第二层的锁...',
                '但我把第二层的门撬开了，表谢我了，扫码给五星好评吧',
            ],
        },
        smallMoneyShop: {
            messages: [
                '如果你有足够的钱，我可以给你续上点属性'
            ]
        },
        smallExpShop: {
            messages: [
                '如果你有足够的人生经验，我可以为你续上点属性'
            ]
        }
    },
    floors: [
        {
            background: [
                3, 2, 3, 2, 3, 0, 2, 1, 3, 2, 3,
                0, 3, 3, 3, 3, 0, 1, 3, 2, 1, 1,
                1, 2, 3, 2, 1, 0, 3, 1, 2, 3, 1,
                1, 2, 3, 2, 1, 0, 3, 2, 2, 1, 2,
                1, 2, 2, 3, 3, 0, 1, 2, 1, 2, 3,
                3, 3, 3, 2, 3, 0, 2, 1, 3, 2, 3,
                0, 3, 3, 3, 0, 0, 1, 3, 2, 1, 1,
                1, 2, 3, 2, 1, 0, 3, 1, 2, 3, 1,
                1, 2, 3, 2, 1, 0, 3, 2, 2, 1, 2,
                1, 2, 2, 3, 3, 0, 1, 2, 1, 2, 3,
                1, 2, 2, 3, 3, 0, 1, 2, 1, 2, 3,
            ],
            creatures: [
                { ind: 5, type: 12 },
                { ind: 70, type: 21 },
                { ind: 60, type: 4 },
            ],
            paths: [
                16, 27, 38, 49, 71, 82, 93, 104, 115
            ],
            endIndex: 71,
            startIndex: 93
        },
        {
            background: [
                9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9,
                9, 9, 9, 9, 9, 4, 9, 9, 9, 4, 9,
                9, 9, 9, 4, 9, 4, 9, 9, 9, 4, 9,
                4, 9, 4, 4, 9, 4, 4, 4, 9, 4, 9,
                9, 9, 9, 4, 9, 9, 9, 9, 9, 4, 9,
                9, 9, 9, 4, 9, 4, 4, 4, 4, 4, 9,
                4, 9, 4, 4, 9, 9, 9, 9, 9, 9, 9,
                9, 9, 9, 4, 4, 9, 4, 4, 4, 9, 4,
                9, 9, 9, 4, 9, 9, 9, 4, 9, 9, 9,
                9, 9, 9, 4, 9, 9, 9, 4, 9, 9, 9,
            ],
            creatures: [
                { ind: 0, type: 12 },
                { ind: 115, type: 11 },
                { ind: 2, type: 1 },
                { ind: 3, type: 31 },
                { ind: 4, type: 32 },
                { ind: 5, type: 31 },
                { ind: 22, type: 7 },
                { ind: 25, type: 4 },
                { ind: 33, type: 1 },
                { ind: 55, type: 1 },
                { ind: 66, type: 10 },
                { ind: 99, type: 7 },
                { ind: 110, type: 7 },
                { ind: 34, type: 33 },
                { ind: 45, type: 4 },
                { ind: 56, type: 34 },
                { ind: 78, type: 4 },
                { ind: 89, type: 34 },
                { ind: 100, type: 8 },
                { ind: 111, type: 8 },
                { ind: 24, type: 33 },
                { ind: 35, type: 9 },
                { ind: 68, type: 2 },
                { ind: 101, type: 1 },
                { ind: 112, type: 1 },
                { ind: 103, type: 3 },
                { ind: 93, type: 6 },
                { ind: 60, type: 4 },
                { ind: 28, type: 7 },
                { ind: 39, type: 7 },
                { ind: 29, type: 1 },
                { ind: 40, type: 1 },
                { ind: 30, type: 7 },
                { ind: 41, type: 7 },
                { ind: 52, type: 36 },
                { ind: 62, type: 31 },
                { ind: 63, type: 35 },
                { ind: 61, type: 37 },
                { ind: 97, type: 4 },
                { ind: 107, type: 1 },
                { ind: 118, type: 1 },
                { ind: 119, type: 1 },
                { ind: 120, type: 1 },
                { ind: 109, type: 2 },
                { ind: 108, type: 38 },
            ],
            paths: [
                1, 6, 7, 8, 9, 10, 21, 32, 43, 54, 65, 76,
                87, 86, 85, 84, 83, 82, 81, 70, 59, 48,
                37, 26, 23, 67, 57, 88, 90, 114, 104, 105, 116
            ],
            startIndex: 104,
            endIndex: 1,
        },
        {
            background: [
                9, 4, 9, 9, 9, 9, 4, 9, 9, 9, 9,
                9, 4, 9, 9, 9, 9, 4, 9, 9, 9, 9,
                9, 4, 9, 9, 9, 9, 4, 9, 9, 9, 9,
                9, 4, 4, 4, 4, 9, 4, 9, 4, 4, 4,
                9, 4, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 4, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 4, 4, 4, 4, 9, 4, 9, 4, 4, 4,
                9, 4, 9, 9, 9, 9, 4, 9, 9, 9, 9,
                9, 4, 9, 9, 9, 9, 4, 9, 9, 9, 9,
                9, 4, 9, 9, 9, 9, 4, 9, 9, 9, 9,
            ],
            creatures: [
                { ind: 110, type: 12 },
                { ind: 0, type: 11 },
                { ind: 56, type: 18 },
                { ind: 90, type: 7 },
                { ind: 91, type: 7 },
                { ind: 101, type: 7 },
                { ind: 102, type: 7 },
                { ind: 112, type: 7 },
                { ind: 113, type: 7 },
                { ind: 92, type: 7 },
                { ind: 93, type: 7 },
                { ind: 103, type: 7 },
                { ind: 104, type: 7 },
                { ind: 114, type: 7 },
                { ind: 115, type: 7 },
                { ind: 97, type: 8 },
                { ind: 98, type: 8 },
                { ind: 108, type: 8 },
                { ind: 109, type: 8 },
                { ind: 119, type: 8 },
                { ind: 120, type: 8 },
                { ind: 95, type: 8 },
                { ind: 96, type: 8 },
                { ind: 106, type: 8 },
                { ind: 107, type: 8 },
                { ind: 117, type: 8 },
                { ind: 118, type: 8 },
                { ind: 2, type: 9 },
                { ind: 3, type: 9 },
                { ind: 13, type: 9 },
                { ind: 14, type: 9 },
                { ind: 24, type: 9 },
                { ind: 25, type: 9 },
                { ind: 4, type: 9 },
                { ind: 5, type: 9 },
                { ind: 15, type: 9 },
                { ind: 16, type: 9 },
                { ind: 26, type: 9 },
                { ind: 27, type: 9 },
                { ind: 9, type: 10 },
                { ind: 10, type: 10 },
                { ind: 21, type: 10 },
                { ind: 20, type: 10 },
                { ind: 31, type: 10 },
                { ind: 32, type: 10 },
                { ind: 7, type: 10 },
                { ind: 8, type: 10 },
                { ind: 18, type: 10 },
                { ind: 19, type: 10 },
                { ind: 29, type: 10 },
                { ind: 30, type: 10 },
                { ind: 38, type: 6 },
                { ind: 40, type: 6 },
                { ind: 82, type: 5 },
                { ind: 84, type: 5 },
                { ind: 54, type: 3 },
                { ind: 65, type: 3 },
                { ind: 76, type: 3 },
            ],
            paths: [
                11, 22, 33, 44, 55, 66, 77, 88, 99,
                46, 47, 48, 49, 50, 51, 52, 53, 57, 58, 59, 60,
                61, 62, 63, 64, 68, 69, 70, 71, 72, 73, 74, 75,
            ],
            startIndex: 11,
            endIndex: 99,
        },
        {
            background: [
                9, 9, 9, 4, 9, 9, 9, 4, 4, 4, 4,
                9, 9, 9, 4, 9, 9, 9, 4, 9, 9, 9,
                9, 9, 9, 4, 4, 9, 4, 4, 9, 4, 9,
                4, 9, 4, 4, 9, 9, 9, 4, 9, 4, 9,
                9, 9, 9, 4, 4, 4, 9, 4, 9, 4, 9,
                9, 4, 9, 9, 9, 9, 9, 4, 9, 4, 9,
                9, 4, 4, 4, 4, 4, 9, 9, 9, 4, 9,
                9, 9, 9, 9, 9, 4, 4, 9, 4, 4, 9,
                4, 4, 4, 4, 9, 4, 9, 9, 9, 4, 9,
                4, 9, 9, 9, 9, 4, 9, 9, 9, 4, 9,
                9, 9, 4, 4, 4, 4, 9, 9, 9, 4, 9,
            ],
            creatures: [
                { ind: 110, type: 11 },
                { ind: 120, type: 12 },
                { ind: 92, type: 35 },
                { ind: 58, type: 35 },
                { ind: 60, type: 35 },
                { ind: 106, type: 35 },
                { ind: 20, type: 35 },
                { ind: 43, type: 35 },
                { ind: 84, type: 4 },
                { ind: 27, type: 4 },
                { ind: 34, type: 4 },
                { ind: 59, type: 32 },
                { ind: 55, type: 31 },
                { ind: 66, type: 31 },
                { ind: 1, type: 32 },
                { ind: 11, type: 32 },
                { ind: 2, type: 1 },
                { ind: 12, type: 1 },
                { ind: 22, type: 1 },
                { ind: 41, type: 1 },
                { ind: 52, type: 1 },
                { ind: 63, type: 1 },
                { ind: 107, type: 1 },
                { ind: 118, type: 1 },
                { ind: 116, type: 9 },
                { ind: 105, type: 10 },
                { ind: 117, type: 8 },
                { ind: 94, type: 32 },
                { ind: 96, type: 32 },
                { ind: 38, type: 33 },
                { ind: 23, type: 33 },
                { ind: 0, type: 13 },
                { ind: 5, type: 26 },
            ],
            paths: [
                111, 100, 101, 102, 103, 81, 80, 79, 78, 77, 44, 45, 46, 57,
                13, 24, 61, 50, 39, 37, 4, 15, 17, 6, 72, 73, 74, 30, 19, 21, 32,
                54, 65, 76, 87, 109, 95, 98, 16
            ],
            startIndex: 111,
            endIndex: 109,
        },
        {
            background: [
                9, 9, 9, 4, 9, 9, 9, 4, 9, 9, 9,
                9, 4, 9, 4, 9, 9, 9, 4, 9, 4, 9,
                9, 4, 9, 4, 4, 9, 4, 4, 9, 4, 9,
                9, 4, 9, 4, 9, 9, 9, 4, 9, 4, 9,
                9, 4, 9, 4, 9, 9, 9, 4, 9, 4, 9,
                9, 4, 9, 4, 4, 9, 4, 4, 9, 4, 9,
                9, 4, 9, 4, 9, 9, 9, 4, 9, 4, 9,
                9, 4, 9, 4, 9, 9, 9, 4, 9, 4, 9,
                9, 4, 9, 4, 4, 9, 4, 4, 9, 4, 9,
                9, 4, 9, 4, 9, 9, 9, 4, 9, 4, 9,
                9, 4, 9, 9, 9, 9, 9, 9, 9, 4, 9,
            ],
            creatures: [
                { ind: 120, type: 11 },
                { ind: 110, type: 12 },
                { ind: 54, type: 35 },
                { ind: 65, type: 35 },
                { ind: 44, type: 35 },
                { ind: 55, type: 35 },
                { ind: 76, type: 32 },
                { ind: 66, type: 32 },
                { ind: 21, type: 4 },
                { ind: 19, type: 4 },
                { ind: 13, type: 4 },
                { ind: 11, type: 4 },
                { ind: 93, type: 5 },
                { ind: 60, type: 6 },
                { ind: 9, type: 36 },
                { ind: 117, type: 36 },
                { ind: 113, type: 36 },
                { ind: 1, type: 36 },
                { ind: 70, type: 38 },
                { ind: 72, type: 38 },
                { ind: 82, type: 38 },
                { ind: 71, type: 41 },
                { ind: 81, type: 9 },
                { ind: 83, type: 9 },
                { ind: 37, type: 39 },
                { ind: 39, type: 39 },
                { ind: 49, type: 39 },
                { ind: 38, type: 40 },
                { ind: 48, type: 10 },
                { ind: 50, type: 10 },
                { ind: 103, type: 1 },
                { ind: 105, type: 1 },
                { ind: 35, type: 33 },
                { ind: 41, type: 33 },
                { ind: 46, type: 7 },
                { ind: 57, type: 7 },
                { ind: 52, type: 7 },
                { ind: 63, type: 7 },
                { ind: 5, type: 22 },
            ],
            paths: [
                99, 88, 77, 33, 22, 0, 2, 24, 68, 79, 90, 101, 112,
                114, 104, 115, 116, 4, 6, 15, 17, 118, 107, 96, 85,
                74, 30, 8, 10, 32, 43, 87, 98, 109, 16, 27
            ],
            startIndex: 109,
            endIndex: 99,
        },
        {
            background: [
                9, 4, 9, 4, 9, 9, 9, 9, 9, 9, 9,
                9, 4, 9, 4, 9, 9, 9, 9, 9, 9, 9,
                9, 4, 9, 4, 9, 9, 4, 4, 9, 4, 4,
                9, 9, 9, 4, 9, 9, 4, 9, 9, 9, 9,
                9, 4, 9, 4, 4, 4, 4, 9, 9, 9, 9,
                9, 4, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 4, 4, 9, 4, 4, 4, 4, 9, 9, 9,
                9, 9, 4, 9, 4, 9, 9, 9, 9, 9, 9,
                4, 4, 4, 9, 4, 9, 4, 9, 4, 9, 4,
                9, 9, 4, 9, 4, 9, 4, 9, 9, 9, 4,
                9, 9, 9, 9, 9, 9, 4, 9, 4, 9, 4,
            ],
            creatures: [
                { ind: 110, type: 11 },
                { ind: 119, type: 12 },
                { ind: 93, type: 4 },
                { ind: 107, type: 4 },
                { ind: 97, type: 4 },
                { ind: 30, type: 4 },
                { ind: 34, type: 4 },
                { ind: 95, type: 5 },
                { ind: 13, type: 9 },
                { ind: 55, type: 9 },
                { ind: 66, type: 10 },
                { ind: 106, type: 10 },
                { ind: 9, type: 1 },
                { ind: 10, type: 2 },
                { ind: 21, type: 1 },
                { ind: 117, type: 1 },
                { ind: 2, type: 7 },
                { ind: 4, type: 8 },
                { ind: 112, type: 35 },
                { ind: 91, type: 35 },
                { ind: 60, type: 35 },
                { ind: 104, type: 35 },
                { ind: 80, type: 36 },
                { ind: 69, type: 36 },
                { ind: 22, type: 39 },
                { ind: 44, type: 39 },
                { ind: 42, type: 34 },
                { ind: 54, type: 34 },
                { ind: 26, type: 34 },
                { ind: 38, type: 34 },
                { ind: 5, type: 37 },
                { ind: 15, type: 37 },
                { ind: 8, type: 37 },
                { ind: 20, type: 37 },
                { ind: 35, type: 37 },
                { ind: 41, type: 38 },
                { ind: 85, type: 38 },
                { ind: 86, type: 41 },
                { ind: 61, type: 33 },
                { ind: 78, type: 28 },
                { ind: 0, type: 19 },
                { ind: 37, type: 14 },
            ],
            paths: [
                11, 33, 77, 99, 100, 111, 24, 46, 57, 58, 102, 113, 114, 115,
                59, 82, 83, 84, 6, 7, 17, 16, 18, 19, 27, 40, 51, 52, 53, 62,
                63, 64, 65, 74, 75, 76, 87, 108, 43
            ],
            startIndex: 111,
            endIndex: 108,
        },
        {
            background: [
                9, 9, 4, 9, 4, 9, 9, 9, 4, 9, 9,
                9, 9, 4, 9, 4, 9, 9, 9, 4, 9, 9,
                9, 9, 9, 9, 9, 9, 9, 9, 4, 9, 9,
                9, 9, 4, 9, 4, 9, 9, 9, 4, 9, 9,
                4, 4, 4, 9, 4, 4, 4, 4, 4, 9, 4,
                9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
                9, 4, 9, 9, 9, 9, 9, 9, 9, 9, 4,
                9, 4, 9, 4, 9, 4, 4, 4, 4, 9, 4,
                9, 4, 9, 4, 9, 9, 4, 4, 9, 9, 4,
                9, 9, 9, 4, 9, 9, 9, 9, 9, 9, 4,
            ],
            creatures: [
                { ind: 119, type: 11 },
                { ind: 114, type: 12 },
                { ind: 5, type: 1 },
                { ind: 17, type: 1 },
                { ind: 29, type: 1 },
                { ind: 59, type: 1 },
                { ind: 60, type: 1 },
                { ind: 61, type: 1 },
                { ind: 12, type: 1 },
                { ind: 22, type: 1 },
                { ind: 116, type: 4 },
                { ind: 117, type: 4 },
                { ind: 92, type: 4 },
                { ind: 80, type: 4 },
                { ind: 90, type: 4 },
                { ind: 53, type: 4 },
                { ind: 24, type: 5 },
                { ind: 26, type: 5 },
                { ind: 47, type: 6 },
                { ind: 97, type: 5 },
                { ind: 14, type: 9 },
                { ind: 3, type: 10 },
                { ind: 81, type: 39 },
                { ind: 79, type: 39 },
                { ind: 101, type: 39 },
                { ind: 57, type: 43 },
                { ind: 63, type: 43 },
                { ind: 1, type: 42 },
                { ind: 11, type: 42 },
                { ind: 23, type: 40 },
                { ind: 27, type: 40 },
                { ind: 36, type: 41 },
                { ind: 6, type: 44 },
                { ind: 18, type: 44 },
                { ind: 20, type: 45 },
                { ind: 32, type: 45 },
                { ind: 42, type: 46 },
                { ind: 9, type: 8 },
                { ind: 10, type: 8 },
                { ind: 21, type: 8 },
                { ind: 0, type: 9 },
                { ind: 7, type: 10 },
            ],
            paths: [
                99, 88, 77, 66, 55, 56, 58, 62, 64, 65, 33, 34, 25, 16, 28, 38, 39, 40,
                31, 43, 82, 83, 84, 85, 86, 107, 108, 118, 103, 104, 115, 110, 111, 112,
            ],
            startIndex: 118,
            endIndex: 115,
        },
        {
            background: [
                9, 9, 9, 9, 9, 9, 9, 9, 4, 4, 4,
                4, 4, 9, 9, 4, 9, 4, 9, 9, 4, 4,
                4, 9, 9, 9, 4, 9, 4, 9, 9, 9, 4,
                9, 9, 4, 4, 4, 9, 4, 4, 4, 9, 9,
                9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 4, 4, 4, 4, 9, 4, 4, 4, 4, 9,
                9, 4, 9, 9, 4, 9, 4, 9, 9, 4, 9,
                9, 4, 9, 9, 4, 9, 4, 9, 9, 4, 9,
                9, 4, 4, 9, 9, 9, 9, 9, 4, 4, 9,
                9, 9, 4, 4, 4, 9, 4, 4, 4, 9, 9,
                4, 9, 9, 9, 9, 9, 9, 9, 9, 9, 4,
            ],
            creatures: [
                { ind: 114, type: 11 },
                { ind: 0, type: 12 },
                { ind: 27, type: 47 },
                { ind: 47, type: 47 },
                { ind: 51, type: 47 },
                { ind: 71, type: 47 },
                { ind: 14, type: 40 },
                { ind: 24, type: 40 },
                { ind: 25, type: 10 },
                { ind: 73, type: 10 },
                { ind: 29, type: 9 },
                { ind: 69, type: 9 },
                { ind: 18, type: 42 },
                { ind: 30, type: 42 },
                { ind: 68, type: 7 },
                { ind: 80, type: 7 },
                { ind: 74, type: 7 },
                { ind: 84, type: 7 },
                { ind: 93, type: 8 },
                { ind: 79, type: 1 },
                { ind: 85, type: 1 },
                { ind: 91, type: 2 },
                { ind: 92, type: 2 },
                { ind: 94, type: 2 },
                { ind: 95, type: 2 },
                { ind: 104, type: 6 },
                { ind: 82, type: 5 },
                { ind: 52, type: 5 },
                { ind: 16, type: 5 },
                { ind: 46, type: 5 },
                { ind: 113, type: 4 },
                { ind: 117, type: 4 },
                { ind: 49, type: 16 },
            ],
            paths: [
                1, 2, 3, 4, 5, 6, 7, 13, 19, 23, 31, 33, 34, 42, 43, 44, 45, 53, 54,
                55, 65, 77, 87, 88, 98, 99, 100, 108, 109, 111, 112, 115, 116,
                118, 119, 66, 76, 48, 38, 60, 50
            ],
            startIndex: 115,
            endIndex: 1,
        },
        {
            background: [
                9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
                9, 9, 9, 9, 4, 4, 4, 9, 9, 9, 9,
                9, 9, 9, 9, 4, 9, 4, 9, 9, 9, 9,
                9, 9, 9, 9, 4, 9, 4, 9, 9, 9, 9,
                9, 9, 9, 9, 4, 9, 4, 9, 9, 9, 9,
                9, 9, 9, 9, 4, 9, 4, 9, 9, 9, 9,
                9, 9, 9, 9, 4, 9, 4, 9, 9, 9, 9,
                9, 9, 9, 9, 4, 9, 4, 9, 9, 9, 9,
                9, 9, 9, 9, 4, 9, 4, 9, 9, 9, 9,
            ],
            creatures: [
                { ind: 115, type: 11 },
                { ind: 49, type: 48 },
            ],
            paths: [
                104, 93, 82, 71, 60
            ],
            startIndex: 104,
            endIndex: 1,
        }
    ]
};
data.floors.forEach((item) => {
    item.background = item.background.map((i) => bgMapping[i]);
    item.creatures = item.creatures.map((i) => {
        const coordinate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* indexToCoordinate */])(i.ind);
        return {
            ind: i.ind,
            type: i.type,
            x: coordinate[0],
            y: coordinate[1],
            className: creatureMapping[i.type]
        };
    });
});
Object.keys(data.monsters).forEach((type) => {
    data.monsters[type].className = creatureMapping[type];
});
class Data {
    constructor(archive) {
        this._data = archive ? archive : data;
    }
    removeCreature(level, ind) {
        const creatures = this._data.floors[level].creatures;
        let index;
        let length = creatures.length;
        while (length--) {
            if (creatures[length].ind === ind) {
                index = length;
                break;
            }
        }
        const creature = this._data.floors[level].creatures.splice(index, 1)[0];
        this._data.floors[level].paths.push(creature.ind);
    }
    getMonsterTypes(level) {
        const creatures = this._data.floors[level].creatures;
        const result = [];
        const obj = {};
        creatures.forEach((creature) => {
            const type = creature.type;
            if (type < 31)
                return;
            if (!obj[type]) {
                result.push(type);
                obj[type] = 1;
            }
        });
        return result;
    }
    getMonsterData(level) {
        return this.getMonsterTypes(level).map((type) => {
            this._data.monsters[type].className = 'm' + type;
            return this._data.monsters[type];
        });
    }
}
/* harmony default export */ __webpack_exports__["a"] = Data;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mvvm__ = __webpack_require__(2);

class Fight {
    constructor() {
        this.name = 'default';
        this.life = 0;
        this.money = 0;
        this.attack = 0;
        this.exp = 0;
        this.defence = 0;
        this.prepareFight = document.querySelector('.prepareFight');
        this.pattern = this.prepareFight.querySelector('.left');
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__mvvm__["a" /* default */])(this.prepareFight, this);
    }
    setMonster(monsterData, node) {
        this.pattern.innerHTML = '';
        this.name = monsterData.name;
        this.life = monsterData.life;
        this.money = monsterData.money;
        this.attack = monsterData.attack;
        this.exp = monsterData.exp;
        this.defence = monsterData.defence;
        this.pattern.appendChild(node);
    }
    isShowing() {
        return this.prepareFight.style.display === 'block';
    }
    show() {
        this.prepareFight.style.display = 'block';
    }
    hide() {
        this.prepareFight.style.display = 'none';
    }
}
/* harmony default export */ __webpack_exports__["a"] = Fight;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);

class Floors {
    constructor(data) {
        this.creatures = {};
        const createFloor = (floorData, level) => {
            const floorNode = document.createElement('div');
            floorNode.className = 'floor floor-' + level;
            this.creatures[level] = {};
            floorData.background.forEach((className, j) => {
                const grid = document.createElement('div');
                // grid.textContent = j.toString()
                grid.className = 'base ' + className;
                floorNode.appendChild(grid);
            });
            floorData.creatures.forEach((creatureData) => {
                const index = creatureData.ind;
                const creatureEl = document.createElement('div');
                creatureEl.className = 'creature ' + creatureData.className;
                const creature = new __WEBPACK_IMPORTED_MODULE_0__player__["b" /* Creature */]({
                    index,
                    type: 'creature',
                    size: 40,
                    node: creatureEl,
                });
                floorNode.appendChild(creature.node);
                this.creatures[level][index] = creature;
            });
            return floorNode;
        };
        const fragment = document.createElement('div');
        this.floorNodes = data.floors.map((floorData, level) => createFloor(floorData, level));
        this.floorNodes.forEach((floorNode) => fragment.appendChild(floorNode));
        this.node = fragment;
        this.level = data.level;
    }
    showFloor(level) {
        this.node.childNodes[this.level].style.display = 'none';
        this.node.childNodes[level].style.display = 'block';
        this.level = level;
    }
    removeCreature(level, index) {
        const creature = this.creatures[level][index].node;
        creature.parentNode.removeChild(creature);
    }
}
/* harmony default export */ __webpack_exports__["a"] = Floors;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Fly {
    constructor(floorNodes) {
        this.lastSelected = 0;
        this.floorNodes = floorNodes;
        this.fly = document.querySelector('.fly');
        this.levelNode = this.fly.querySelector('.levels');
        this.thumbnailNode = this.fly.querySelector('.thumbnail');
        this.goFloorNode = this.fly.querySelector('.goFloor');
        this.hide();
        const fragment = document.createDocumentFragment();
        this.levels = Array.apply(null, Array(22))
            .map((i, j) => {
            const div = document.createElement('div');
            div.textContent = '第' + j + '层';
            div['data-level'] = j.toString();
            fragment.appendChild(div);
            return div;
        });
        this.levelNode.innerHTML = '';
        this.levelNode.appendChild(fragment);
        this.fly.addEventListener('click', (e) => {
            const target = e.target;
            //todo
            const level = Number(target['data-level']);
            if (level || level === 0)
                this.showFloor(level, this.floorNodes[level].cloneNode(true));
        });
        this.showFloor(0, this.floorNodes[0].cloneNode(true));
    }
    showFloor(level = 0, node) {
        if (this.lastSelected == level && this.lastSelected != 0)
            return;
        this.levels[this.lastSelected].classList.remove('focus');
        node.style.display = 'block';
        this.thumbnailNode.innerHTML = '';
        this.thumbnailNode.appendChild(node);
        this.levels[level].classList.add('focus');
        this.lastSelected = level;
    }
    show(highestLevelEverBeen) {
        this.isShowing = true;
        this.fly.style.display = 'block';
        this.levels.forEach((levelNode, level) => {
            levelNode.style.display = level <= highestLevelEverBeen ? 'block' : 'none';
        });
    }
    hide() {
        this.isShowing = false;
        this.fly.style.display = 'none';
    }
}
/* harmony default export */ __webpack_exports__["a"] = Fly;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class popUp {
    constructor() {
        this.isShopping = false;
        this.node = document.querySelector('.popUp');
        this.messageNode = this.node.querySelector('.message');
        this.node.addEventListener('click', () => {
            this.isShopping || this.next();
        });
    }
    setMessage(messages, cb) {
        this.messages = messages;
        this.index = 0;
        if (typeof cb == 'function')
            this.cb = cb;
        this.next();
        this.show();
    }
    next() {
        const message = this.messages[this.index++];
        if (!message) {
            this.hide();
            this.cb && this.cb();
            this.cb = null;
            return;
        }
        this.messageNode.textContent = message;
    }
    show() {
        this.node.style.display = 'block';
    }
    hide() {
        this.node.style.display = 'none';
    }
    setShop(type, cb) {
        this.isShopping = true;
        this.messageNode.innerHTML = '';
        const fragment = document.createDocumentFragment();
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = type == 'money'
            ? '给我20金币，你可以'
            : '给我20经验，你可以';
        const life = document.createElement('div');
        const attack = document.createElement('div');
        const defence = document.createElement('div');
        life.textContent = ' 增加100点生命';
        attack.textContent = ' 增加3点攻击';
        defence.textContent = ' 增加3点防御';
        fragment.appendChild(title);
        fragment.appendChild(attack);
        fragment.appendChild(defence);
        fragment.appendChild(life);
        this.messageNode.appendChild(fragment);
        this.node.addEventListener('click', (e) => {
            const target = e.target;
            if (target == life)
                cb('life', 100);
            else if (target == attack)
                cb('attack', 3);
            else if (target == defence)
                cb('defence', 3);
            this.hide();
            this.isShopping = false;
        });
        this.show();
    }
}
/* harmony default export */ __webpack_exports__["a"] = popUp;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__script_data__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__script_floors__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__script_dashboard__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__script_fight__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__script_book__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__script_fly__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__script_popUp__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__script_player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__script_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style_index_scss__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__style_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__style_index_scss__);










const home = document.querySelector('.home');
const gameBox = document.querySelector('main');
const goFloor = document.querySelector('.goFloor');
const book = new __WEBPACK_IMPORTED_MODULE_4__script_book__["a" /* default */]();
const popUp = new __WEBPACK_IMPORTED_MODULE_6__script_popUp__["a" /* default */]();
const fight = new __WEBPACK_IMPORTED_MODULE_3__script_fight__["a" /* default */]();
let dataObj;
let dashboard;
let floors;
let player;
let data;
let fly;
let handler;
function init(archive) {
    gameBox.innerHTML = '';
    dataObj = archive ? new __WEBPACK_IMPORTED_MODULE_0__script_data__["a" /* default */](archive) : new __WEBPACK_IMPORTED_MODULE_0__script_data__["a" /* default */]();
    data = dataObj._data;
    if (dashboard)
        dashboard.update(data);
    else
        dashboard = new __WEBPACK_IMPORTED_MODULE_2__script_dashboard__["a" /* default */](data);
    floors = new __WEBPACK_IMPORTED_MODULE_1__script_floors__["a" /* default */](data);
    player = new __WEBPACK_IMPORTED_MODULE_7__script_player__["a" /* Player */](data);
    fly = new __WEBPACK_IMPORTED_MODULE_5__script_fly__["a" /* default */](floors.floorNodes);
    gameBox.appendChild(floors.node);
    gameBox.appendChild(player.node);
    floors.showFloor(data.level);
    home.style.display = 'none';
}
function checkNext(index, level) {
    const dataOfFloor = data.floors[level];
    if (dataOfFloor.paths.indexOf(index) > -1)
        return Promise.resolve(true);
    let type = -1;
    let length = dataOfFloor.creatures.length;
    // todo
    while (length--) {
        const creature = dataOfFloor.creatures[length];
        if (creature.ind === index) {
            type = creature.type;
            break;
        }
    }
    // downstairs & upstairs
    if (type === 11 || type === 12) {
        const newLevel = level + (type == 11 ? -1 : 1);
        const newIndex = data.floors[newLevel][type == 11 ? 'endIndex' : 'startIndex'];
        player.node.classList.add('noTransition');
        if (newLevel > data.highestLevelEverBeen)
            data.highestLevelEverBeen = newLevel;
        update('level', newLevel);
        update('index', newIndex);
        setTimeout(() => player.node.classList.remove('noTransition'), 100);
        floors.showFloor(newLevel);
        return Promise.resolve(false);
    }
    // encounter item
    if (type > 0 && type < 20) {
        if (type === 1)
            update('yellowKeys', player.yellowKeys + 1);
        else if (type === 2)
            update('blueKeys', player.blueKeys + 1);
        else if (type === 3)
            update('redKeys', player.redKeys + 1);
        else if (type === 4) {
            if (player.yellowKeys === 0)
                return Promise.resolve(false);
            update('yellowKeys', player.yellowKeys - 1);
        }
        else if (type === 5) {
            if (player.blueKeys === 0)
                return Promise.resolve(false);
            update('blueKeys', player.blueKeys - 1);
        }
        else if (type === 6) {
            if (player.redKeys === 0)
                return Promise.resolve(false);
            update('redKeys', player.redKeys - 1);
        }
        else if (type === 7)
            update('life', player.life + 200);
        else if (type === 8)
            update('life', player.life + 500);
        else if (type === 9)
            update('attack', player.attack + 3);
        else if (type === 10)
            update('defence', player.defence + 3);
        else if (type === 13)
            update('attack', player.attack + 10);
        else if (type === 14)
            update('defence', player.defence + 20);
        else if (type === 15)
            update('defence', player.money + 10);
        else if (type === 16) {
            popUp.setMessage(['得到十字架，所有属性提升40%!'], () => {
                update('life', Math.floor(data.life * 1.4));
                update('attack', Math.floor(data.attack * 1.4));
                update('defence', Math.floor(data.defence * 1.4));
            });
        }
        else if (type === 18)
            return Promise.resolve(false);
        else if (type === 19) {
            popUp.setMessage(data.humans[19].messages, () => {
                update('redKeys', data.redKeys + 1);
                update('blueKeys', data.blueKeys + 1);
                update('yellowKeys', data.yellowKeys + 1);
            });
        }
        const obj = floors.creatures[level][index];
        obj.remove();
        dataObj.removeCreature(level, index);
        return Promise.resolve(true);
    }
    // encounter monster
    if (type > 30 && type < 50) {
        const monster = data.monsters[type];
        const monsterEl = document.createElement('div');
        monsterEl.className = 'creature ' + monster.className;
        fight.setMonster(monster, monsterEl);
        fight.show();
        return new Promise(function (resolve) {
            handler = resolve;
        }).then((isConfirmed) => {
            fight.hide();
            if (!isConfirmed)
                return false;
            if (win(type, player)) {
                const monster = floors.creatures[level][index];
                monster.remove();
                dataObj.removeCreature(level, index);
                if (type == 48)
                    popUp.setMessage(['你赢了'], () => home.style.display = 'block');
                return true;
            }
            return false;
        });
    }
    if (type === 21) {
        const humanData = data.humans[21];
        if (!humanData.talked) {
            popUp.setMessage(humanData.messages1, () => {
                update('yellowKeys', player.yellowKeys + 1);
                update('blueKeys', player.blueKeys + 1);
                update('redKeys', player.redKeys + 1);
            });
            humanData.talked = true;
            return Promise.resolve(false);
        }
        popUp.setMessage(humanData.messages2);
        return Promise.resolve(false);
    }
    if (type === 22) {
        const humanData = data.humans[22];
        if (humanData.talked)
            return Promise.resolve(false);
        popUp.setMessage(humanData.messages, () => {
            const wall = floors.creatures[2][56];
            wall.remove();
            dataObj.removeCreature(2, 56);
            humanData.talked = true;
        });
        return Promise.resolve(false);
    }
    if (type === 26) {
        if (data.money < 20) {
            popUp.setMessage(data.humans.smallMoneyShop.messages);
            return Promise.resolve(false);
        }
        popUp.setShop('money', (prop, num) => {
            update(prop, data[prop] + num);
            update('money', data.money - 20);
        });
        return Promise.resolve(false);
    }
    if (type === 28) {
        if (data.exp < 20) {
            popUp.setMessage(data.humans.smallExpShop.messages);
            return Promise.resolve(false);
        }
        popUp.setShop('exp', (prop, num) => {
            update(prop, data[prop] + num);
            update('exp', data.exp - 20);
        });
        return Promise.resolve(false);
    }
    return Promise.resolve(false);
}
function win(type, player) {
    const monster = data.monsters[type];
    const damage = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__script_utils__["a" /* calcDamage */])(player, monster);
    if (damage === false || player.life <= damage)
        return false;
    update('life', player.life - damage);
    update('exp', player.exp + monster.exp);
    update('money', player.money + monster.money);
    return true;
}
function update(property, value) {
    const type = typeof data[property];
    data[property] = value;
    if (type != 'object') {
        player[property] = value;
        dashboard[property] = value;
    }
}
document.addEventListener('keyup', function (e) {
    if (fight.isShowing() || !player)
        return;
    const code = e.keyCode;
    const index = player.index;
    const gridCount = data.gridCount;
    if ((code == 37 || code == 65) && index % gridCount !== 0)
        walk(37);
    else if ((code === 38 || code == 87) && index > gridCount - 1)
        walk(38);
    else if ((code === 39 || code == 68) && index % gridCount !== gridCount - 1)
        walk(39);
    else if ((code === 40 || code == 83) && index < gridCount * (gridCount - 1))
        walk(40);
});
function walk(code) {
    const gridCount = data.gridCount;
    const mapping = {
        37: -1,
        38: -gridCount,
        39: 1,
        40: gridCount,
    };
    const newIndex = player.index + mapping[code.toString()];
    checkNext(newIndex, data.level).then((allowToGo) => {
        if (allowToGo === true)
            update('index', newIndex);
    });
}
goFloor.addEventListener('click', function () {
    const selected = fly.lastSelected;
    update('level', selected);
    update('index', data.floors[selected].startIndex);
    floors.showFloor(selected);
    fly.hide();
});
document.querySelector('.bookIcon').addEventListener('click', function () {
    if (book.isShowing)
        book.hide();
    else
        book.show(player, dataObj.getMonsterData(data.level));
});
document.querySelector('.flyIcon').addEventListener('click', function () {
    if (fly.isShowing)
        fly.hide();
    else
        fly.show(data.highestLevelEverBeen);
});
document.querySelector('.newGame').addEventListener('click', function () {
    init();
});
document.querySelector('.continue').addEventListener('click', function () {
    init(JSON.parse(localStorage.getItem('mt')));
});
document.querySelector('.homeIcon').addEventListener('click', function () {
    home.style.display = 'block';
});
document.querySelector('.save').addEventListener('click', function () {
    localStorage.setItem('mt', JSON.stringify(data));
    popUp.setMessage(['保存成功']);
});
document.querySelector('.goFighting').addEventListener('click', () => handler && handler(true));
document.querySelector('.stopFighting').addEventListener('click', () => handler && handler(false));


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map