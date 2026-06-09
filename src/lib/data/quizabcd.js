// src/lib/data/quizmaster.js
import { QuizNegara } from './abcd/quiz-negara';
import { QuizTeknologi } from './abcd/quiz-teknologi';
import { QuizSains } from './abcd/quiz-sains';
import {QuizUUD} from './abcd/QuizUUD';
import { NegaraIbuKota, generateNegaraQuestion } from './abcd/data-negara-ibukota';

export const QuizABCDDB = [
    {
        id: "sejarah",
        title: "SEJARAH AI",
        levels: [
            {
                id: 1,
                questions: [
                    {
                        q: "Siapa pencetus istilah AI?",
                        a: ["Alan Turing", "John McCarthy", "Bill Gates", "Tesla"],
                        t: 1
                    },
                    {
                        q: "Turing Test dibuat oleh?",
                        a: ["Alan Turing", "Newton", "Einstein", "Jobs"],
                        t: 0
                    }
                ]
            },
            {
                id: 2,
                questions: [
                    {
                        q: "Deep Blue milik?",
                        a: ["Google", "IBM", "Intel", "AMD"],
                        t: 1
                    }
                ]
            }
        ]
    },
    QuizNegara,
    QuizTeknologi,
    QuizSains,
    QuizUUD
];

export { NegaraIbuKota, generateNegaraQuestion };
export default QuizABCDDB;
