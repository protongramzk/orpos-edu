// src/lib/data/index.js

import {
    QuizABCDDB
}
from "./quizabcd.js";

import {
    TarikKataDB
}
from "./tarikkata.js";

import {
    BenarSalahDB
}
from "./benarsalah.js";

export const GAME_DATA = [

    {
        id: "quizabcd",

        title: "ABC QUIZ",

        categories: QuizABCDDB
    },

    {
        id: "tarikkata",

        title: "TARIK GARIS",

        categories: TarikKataDB
    },

    {
        id: "benarsalah",

        title: "BENAR SALAH",

        categories: BenarSalahDB
    }

];
