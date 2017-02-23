import {indexToCoordinate} from './utils'

const bgMapping: any = {
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
}

const creatureMapping: any = {
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
}

const data: any = {
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
        {ind: 5, type: 12},
        {ind: 70, type: 21},
        {ind: 60, type: 4},
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
        {ind: 0, type: 12},
        {ind: 115, type: 11},
        {ind: 2, type: 1},
        {ind: 3, type: 31},
        {ind: 4, type: 32},
        {ind: 5, type: 31},
        {ind: 22, type: 7},
        {ind: 25, type: 4},
        {ind: 33, type: 1},
        {ind: 55, type: 1},
        {ind: 66, type: 10},
        {ind: 99, type: 7},
        {ind: 110, type: 7},
        {ind: 34, type: 33},
        {ind: 45, type: 4},
        {ind: 56, type: 34},
        {ind: 78, type: 4},
        {ind: 89, type: 34},
        {ind: 100, type: 8},
        {ind: 111, type: 8},
        {ind: 24, type: 33},
        {ind: 35, type: 9},
        {ind: 68, type: 2},
        {ind: 101, type: 1},
        {ind: 112, type: 1},
        {ind: 103, type: 3},
        {ind: 93, type: 6},
        {ind: 60, type: 4},
        {ind: 28, type: 7},
        {ind: 39, type: 7},
        {ind: 29, type: 1},
        {ind: 40, type: 1},
        {ind: 30, type: 7},
        {ind: 41, type: 7},
        {ind: 52, type: 36},
        {ind: 62, type: 31},
        {ind: 63, type: 35},
        {ind: 61, type: 37},
        {ind: 97, type: 4},
        {ind: 107, type: 1},
        {ind: 118, type: 1},
        {ind: 119, type: 1},
        {ind: 120, type: 1},
        {ind: 109, type: 2},
        {ind: 108, type: 38},
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
        {ind: 110, type: 12},
        {ind: 0, type: 11},
        {ind: 56, type: 18},
        {ind: 90, type: 7},
        {ind: 91, type: 7},
        {ind: 101, type: 7},
        {ind: 102, type: 7},
        {ind: 112, type: 7},
        {ind: 113, type: 7},
        {ind: 92, type: 7},
        {ind: 93, type: 7},
        {ind: 103, type: 7},
        {ind: 104, type: 7},
        {ind: 114, type: 7},
        {ind: 115, type: 7},
        {ind: 97, type: 8},
        {ind: 98, type: 8},
        {ind: 108, type: 8},
        {ind: 109, type: 8},
        {ind: 119, type: 8},
        {ind: 120, type: 8},
        {ind: 95, type: 8},
        {ind: 96, type: 8},
        {ind: 106, type: 8},
        {ind: 107, type: 8},
        {ind: 117, type: 8},
        {ind: 118, type: 8},
        {ind: 2, type: 9},
        {ind: 3, type: 9},
        {ind: 13, type: 9},
        {ind: 14, type: 9},
        {ind: 24, type: 9},
        {ind: 25, type: 9},
        {ind: 4, type: 9},
        {ind: 5, type: 9},
        {ind: 15, type: 9},
        {ind: 16, type: 9},
        {ind: 26, type: 9},
        {ind: 27, type: 9},
        {ind: 9, type: 10},
        {ind: 10, type: 10},
        {ind: 21, type: 10},
        {ind: 20, type: 10},
        {ind: 31, type: 10},
        {ind: 32, type: 10},
        {ind: 7, type: 10},
        {ind: 8, type: 10},
        {ind: 18, type: 10},
        {ind: 19, type: 10},
        {ind: 29, type: 10},
        {ind: 30, type: 10},
        {ind: 38, type: 6},
        {ind: 40, type: 6},
        {ind: 82, type: 5},
        {ind: 84, type: 5},
        {ind: 54, type: 3},
        {ind: 65, type: 3},
        {ind: 76, type: 3},

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
        {ind: 110, type: 11},
        {ind: 120, type: 12},
        {ind: 92, type: 35},
        {ind: 58, type: 35},
        {ind: 60, type: 35},
        {ind: 106, type: 35},
        {ind: 20, type: 35},
        {ind: 43, type: 35},
        {ind: 84, type: 4},
        {ind: 27, type: 4},
        {ind: 34, type: 4},
        {ind: 59, type: 32},
        {ind: 55, type: 31},
        {ind: 66, type: 31},
        {ind: 1, type: 32},
        {ind: 11, type: 32},
        {ind: 2, type: 1},
        {ind: 12, type: 1},
        {ind: 22, type: 1},
        {ind: 41, type: 1},
        {ind: 52, type: 1},
        {ind: 63, type: 1},
        {ind: 107, type: 1},
        {ind: 118, type: 1},
        {ind: 116, type: 9},
        {ind: 105, type: 10},
        {ind: 117, type: 8},
        {ind: 94, type: 32},
        {ind: 96, type: 32},
        {ind: 38, type: 33},
        {ind: 23, type: 33},
        {ind: 0, type: 13},
        {ind: 5, type: 26},
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
        {ind: 120, type: 11},
        {ind: 110, type: 12},
        {ind: 54, type: 35},
        {ind: 65, type: 35},
        {ind: 44, type: 35},
        {ind: 55, type: 35},
        {ind: 76, type: 32},
        {ind: 66, type: 32},
        {ind: 21, type: 4},
        {ind: 19, type: 4},
        {ind: 13, type: 4},
        {ind: 11, type: 4},
        {ind: 93, type: 5},
        {ind: 60, type: 6},
        {ind: 9, type: 36},
        {ind: 117, type: 36},
        {ind: 113, type: 36},
        {ind: 1, type: 36},
        {ind: 70, type: 38},
        {ind: 72, type: 38},
        {ind: 82, type: 38},
        {ind: 71, type: 41},
        {ind: 81, type: 9},
        {ind: 83, type: 9},
        {ind: 37, type: 39},
        {ind: 39, type: 39},
        {ind: 49, type: 39},
        {ind: 38, type: 40},
        {ind: 48, type: 10},
        {ind: 50, type: 10},
        {ind: 103, type: 1},
        {ind: 105, type: 1},
        {ind: 35, type: 33},
        {ind: 41, type: 33},
        {ind: 46, type: 7},
        {ind: 57, type: 7},
        {ind: 52, type: 7},
        {ind: 63, type: 7},
        {ind: 5, type: 22},

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
        {ind: 110, type: 11},
        {ind: 119, type: 12},
        {ind: 93, type: 4},
        {ind: 107, type: 4},
        {ind: 97, type: 4},
        {ind: 30, type: 4},
        {ind: 34, type: 4},
        {ind: 95, type: 5},
        {ind: 13, type: 9},
        {ind: 55, type: 9},
        {ind: 66, type: 10},
        {ind: 106, type: 10},
        {ind: 9, type: 1},
        {ind: 10, type: 2},
        {ind: 21, type: 1},
        {ind: 117, type: 1},
        {ind: 2, type: 7},
        {ind: 4, type: 8},
        {ind: 112, type: 35},
        {ind: 91, type: 35},
        {ind: 60, type: 35},
        {ind: 104, type: 35},
        {ind: 80, type: 36},
        {ind: 69, type: 36},
        {ind: 22, type: 39},
        {ind: 44, type: 39},
        {ind: 42, type: 34},
        {ind: 54, type: 34},
        {ind: 26, type: 34},
        {ind: 38, type: 34},
        {ind: 5, type: 37},
        {ind: 15, type: 37},
        {ind: 8, type: 37},
        {ind: 20, type: 37},
        {ind: 35, type: 37},
        {ind: 41, type: 38},
        {ind: 85, type: 38},
        {ind: 86, type: 41},
        {ind: 61, type: 33},
        {ind: 78, type: 28},
        {ind: 0, type: 19},
        {ind: 37, type: 14},
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
        {ind: 119, type: 11},
        {ind: 114, type: 12},
        {ind: 5, type: 1},
        {ind: 17, type: 1},
        {ind: 29, type: 1},
        {ind: 59, type: 1},
        {ind: 60, type: 1},
        {ind: 61, type: 1},
        {ind: 12, type: 1},
        {ind: 22, type: 1},
        {ind: 116, type: 4},
        {ind: 117, type: 4},
        {ind: 92, type: 4},
        {ind: 80, type: 4},
        {ind: 90, type: 4},
        {ind: 53, type: 4},
        {ind: 24, type: 5},
        {ind: 26, type: 5},
        {ind: 47, type: 6},
        {ind: 97, type: 5},
        {ind: 14, type: 9},
        {ind: 3, type: 10},
        {ind: 81, type: 39},
        {ind: 79, type: 39},
        {ind: 101, type: 39},
        {ind: 57, type: 43},
        {ind: 63, type: 43},
        {ind: 1, type: 42},
        {ind: 11, type: 42},
        {ind: 23, type: 40},
        {ind: 27, type: 40},
        {ind: 36, type: 41},
        {ind: 6, type: 44},
        {ind: 18, type: 44},
        {ind: 20, type: 45},
        {ind: 32, type: 45},
        {ind: 42, type: 46},
        {ind: 9, type: 8},
        {ind: 10, type: 8},
        {ind: 21, type: 8},
        {ind: 0, type: 9},
        {ind: 7, type: 10},
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
        {ind: 114, type: 11},
        {ind: 0, type: 12},
        {ind: 27, type: 47},
        {ind: 47, type: 47},
        {ind: 51, type: 47},
        {ind: 71, type: 47},
        {ind: 14, type: 40},
        {ind: 24, type: 40},
        {ind: 25, type: 10},
        {ind: 73, type: 10},
        {ind: 29, type: 9},
        {ind: 69, type: 9},
        {ind: 18, type: 42},
        {ind: 30, type: 42},
        {ind: 68, type: 7},
        {ind: 80, type: 7},
        {ind: 74, type: 7},
        {ind: 84, type: 7},
        {ind: 93, type: 8},
        {ind: 79, type: 1},
        {ind: 85, type: 1},
        {ind: 91, type: 2},
        {ind: 92, type: 2},
        {ind: 94, type: 2},
        {ind: 95, type: 2},
        {ind: 104, type: 6},
        {ind: 82, type: 5},
        {ind: 52, type: 5},
        {ind: 16, type: 5},
        {ind: 46, type: 5},
        {ind: 113, type: 4},
        {ind: 117, type: 4},
        {ind: 49, type: 16},
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
        {ind: 115, type: 11},
        {ind: 49, type: 48},
      ],
      paths: [
        104, 93, 82, 71, 60
      ],
      startIndex: 104,
      endIndex: 1,
    }
  ]
}

data.floors.forEach((item: any) => {
  item.background = item.background.map((i: number): string => bgMapping[i])
  item.creatures = item.creatures.map((i: any) => {
    const coordinate = indexToCoordinate(i.ind)
    return {
      ind: i.ind,
      type: i.type,
      x: coordinate[0],
      y: coordinate[1],
      className: creatureMapping[i.type]
    }
  })
})

Object.keys(data.monsters).forEach((type: any) => {
  data.monsters[type].className = creatureMapping[type]
})


class Data {
  _data: any

  constructor(archive?: any) {
    this._data = archive ? archive : JSON.parse(JSON.stringify(data))
  }

  removeCreature(level: number, ind: number) {
    const creatures = this._data.floors[level].creatures
    let index
    let length = creatures.length
    while (length--) {
      if (creatures[length].ind === ind) {
        index = length
        break
      }
    }
    const creature = this._data.floors[level].creatures.splice(index, 1)[0]
    this._data.floors[level].paths.push(creature.ind)
  }


  getMonsterTypes(level: number) {
    const creatures = this._data.floors[level].creatures
    const result: any = []
    const obj: any = {}
    creatures.forEach((creature: any) => {
      const type = creature.type
      if (type < 31) return
      if (!obj[type]) {
        result.push(type)
        obj[type] = 1
      }
    })
    return result
  }

  getMonsterData(level: number) {
    return this.getMonsterTypes(level).map((type: number) => {
      this._data.monsters[type].className = 'm' + type
      return this._data.monsters[type]
    })
  }
}

export default Data
