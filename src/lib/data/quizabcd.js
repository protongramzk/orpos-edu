// src/lib/data/quizmaster.js
import { QuizNegara } from './abcd/quiz-negara';
import { QuizTeknologi } from './abcd/quiz-teknologi';
import { QuizSains } from './abcd/quiz-sains';
import {QuizUUD} from './abcd/QuizUUD';
import { QuizUUD1945 } from './abcd/QuizUUD1'; // Pasal 1-18
import { QuizUUD1945_Part2 } from './abcd/QuizUUD2'; // Pasal 19-27  
import { QuizUUD1945_Part3 } from './abcd/QuizUUD3'; // Pasal 28-37
import { NegaraIbuKota, generateNegaraQuestion } from './abcd/data-negara-ibukota';

export const QuizABCDDB = [
    QuizNegara,
    QuizTeknologi,
    QuizSains,
    QuizUUD,
    QuizUUD1945,
    QuizUUD1945_Part2,
    QuizUUD1945_Part3
];

export { NegaraIbuKota, generateNegaraQuestion };
export default QuizABCDDB;
