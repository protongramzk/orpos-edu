// src/lib/data/quiz-negara.js
import { NegaraIbuKota, generateNegaraQuestion } from './data-negara-ibukota';

// Kelompok negara per region untuk struktur level
const negaraPerRegion = {
    part1_asia: [
        "Indonesia", "Jepang", "China", "India", "Singapura",
        "Malaysia", "Thailand", "Vietnam", "Filipina", "Korea",
        "Pakistan", "Bangladesh", "Myanmar", "Kamboja", "Laos",
        "Mongolia", "Sri Lanka", "Nepal", "Bhutan", "Afganistan",
        "Irak", "Iran", "Saudi Arabia", "UAE", "Qatar"
    ],
    part2_middle_east_eropa: [
        "Oman", "Yaman", "Isreal", "Suriah", "Libanon",
        "Jordan", "Kuwait", "Bahrain", "Turki", "Uzbekistan",
        "Kazakhstan", "Kyrgyzstan", "Tajikistan", "Turkmenistan",
        "Inggris", "Prancis", "Jerman", "Spanyol", "Italia",
        "Belanda", "Belgia", "Polandia", "Swedia", "Norwegia",
        "Finlandia"
    ],
    part3_eropa_timur_afrika: [
        "Denmark", "Rumania", "Bulgaria", "Serbia", "Kroasia",
        "Slovenia", "Slovakia", "Ceko", "Hungary", "Austria",
        "Swiss", "Portugal", "Yunani", "Ukraine", "Rusia",
        "Belarus", "Litania", "Latvia", "Estonia", "Moldovia",
        "Albania", "Bosnia", "Montenegro", "Makedonia", "Luksemburg",
        "Malta", "Siprus", "Islandia", "Irlandia",
        "Mesir", "Nigeria", "Afrika Selatan", "Kenya", "Ethiopia"
    ],
    part4_afrika_americas_oseania: [
        "Ghana", "Morocco", "Algeria", "Tunisia", "Libya",
        "Sudan", "Uganda", "Tanzania", "Rwanda", "Zambia",
        "Zimbabwe", "Botswana", "Namibia", "Ivory Coast", "Senegal",
        "Kamerun", "Angola", "Mozambique", "Malawi",
        "Kanada", "USA", "Meksiko", "Guatemala", "Honduras",
        "El Salvador", "Nikaragua", "Costa Rica", "Panama", "Kuba",
        "Dominika", "Republik Dominika", "Haiti",
        "Brasil", "Argentina", "Chile", "Peru", "Kolombia",
        "Venezuela", "Ecuador", "Bolivia", "Paraguay", "Uruguay",
        "Guyana", "Suriname",
        "Australia", "Selandia Baru", "Fiji", "Papua Nugini",
        "Samoa", "Vanuatu", "Solomon Islands"
    ]
};

// Generator untuk questions per part
function generateQuestionsForRegion(negaraList) {
    return negaraList.map(negara => generateNegaraQuestion(negara));
}

// Main Quiz Data
export const QuizNegara = {
    id: "negara",
    title: "NEGARA & IBUKOTA",
    levels: [
        {
            id: 1,
            name: "Asia Tenggara & Selatan (25 negara)",
            questions: generateQuestionsForRegion(negaraPerRegion.part1_asia)
        },
        {
            id: 2,
            name: "Timur Tengah & Eropa Barat (25 negara)",
            questions: generateQuestionsForRegion(negaraPerRegion.part2_middle_east_eropa)
        },
        {
            id: 3,
            name: "Eropa Timur & Afrika (30 negara)",
            questions: generateQuestionsForRegion(negaraPerRegion.part3_eropa_timur_afrika)
        },
        {
            id: 4,
            name: "Afrika, Amerika & Oseania (20 negara)",
            questions: generateQuestionsForRegion(negaraPerRegion.part4_afrika_americas_oseania)
        }
    ]
};

export default QuizNegara;
