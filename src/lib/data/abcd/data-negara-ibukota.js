// Database Negara:Ibukota (100 negara)
export const NegaraIbuKota = {
    // Asia
    Indonesia: "Jakarta",
    Jepang: "Tokyo",
    China: "Beijing",
    India: "New Delhi",
    Singapura: "Singapura",
    Malaysia: "Kuala Lumpur",
    Thailand: "Bangkok",
    Vietnam: "Hanoi",
    Filipina: "Manila",
    Korea: "Seoul",
    Pakistan: "Islamabad",
    Bangladesh: "Dhaka",
    Myanmar: "Naypyidaw",
    Kamboja: "Phnom Penh",
    Laos: "Vientiane",
    Mongolia: "Ulaanbaatar",
    "Sri Lanka": "Colombo",
    Nepal: "Kathmandu",
    Bhutan: "Thimphu",
    Afganistan: "Kabul",
    Irak: "Baghdad",
    Iran: "Teheran",
    "Saudi Arabia": "Riyadh",
    UAE: "Abu Dhabi",
    Qatar: "Doha",
    Oman: "Muscat",
    Yaman: "Sana'a",
    Isreal: "Jerusalem",
    Suriah: "Damaskus",
    Libanon: "Beirut",
    Jordan: "Amman",
    Kuwait: "Kuwait City",
    Bahrain: "Manama",
    Turki: "Ankara",
    Uzbekistan: "Tashkent",
    Kazakhstan: "Nur-Sultan",
    Kyrgyzstan: "Bishkek",
    Tajikistan: "Dushanbe",
    Turkmenistan: "Ashkhabad",
    
    // Eropa
    Inggris: "London",
    Prancis: "Paris",
    Jerman: "Berlin",
    Spanyol: "Madrid",
    Italia: "Roma",
    Belanda: "Amsterdam",
    Belgia: "Brussels",
    Polandia: "Warsawa",
    Swedia: "Stockholm",
    Norwegia: "Oslo",
    Finlandia: "Helsinki",
    Denmark: "Copenhagen",
    Rumania: "Bucharest",
    Bulgaria: "Sofia",
    Serbia: "Belgrade",
    Kroasia: "Zagreb",
    Slovenia: "Ljubljana",
    Slovakia: "Bratislava",
    Ceko: "Prague",
    Hungary: "Budapest",
    Austria: "Vienna",
    Swiss: "Bern",
    Portugal: "Lisbon",
    Yunani: "Athens",
    Ukraine: "Kyiv",
    Rusia: "Moscow",
    Belarus: "Minsk",
    Litania: "Vilnius",
    Latvia: "Riga",
    Estonia: "Tallinn",
    Moldovia: "Chisinau",
    Albania: "Tirana",
    Bosnia: "Sarajevo",
    Montenegro: "Podgorica",
    Makedonia: "Skopje",
    Luksemburg: "Luksemburg",
    Malta: "Valletta",
    Siprus: "Nicosia",
    Islandia: "Reykjavik",
    Irlandia: "Dublin",
    
    // Afrika
    Mesir: "Cairo",
    Nigeria: "Abuja",
    "Afrika Selatan": "Pretoria",
    Kenya: "Nairobi",
    Ethiopia: "Addis Ababa",
    Ghana: "Accra",
    Morocco: "Rabat",
    Algeria: "Algiers",
    Tunisia: "Tunis",
    Libya: "Tripoli",
    Sudan: "Khartoum",
    Uganda: "Kampala",
    Tanzania: "Dar es Salaam",
    Rwanda: "Kigali",
    Zambia: "Lusaka",
    Zimbabwe: "Harare",
    Botswana: "Gaborone",
    Namibia: "Windhoek",
    "Ivory Coast": "Yamoussoukro",
    Senegal: "Dakar",
    Kamerun: "Yaoundé",
    Angola: "Luanda",
    Mozambique: "Maputo",
    Malawi: "Lilongwe",
    
    // Amerika Utara
    Kanada: "Ottawa",
    USA: "Washington DC",
    Meksiko: "Mexico City",
    
    // Amerika Tengah & Karibia
    Guatemala: "Guatemala City",
    Honduras: "Tegucigalpa",
    "El Salvador": "San Salvador",
    Nikaragua: "Managua",
    "Costa Rica": "San José",
    Panama: "Panama City",
    Kuba: "Havana",
    Dominika: "Roseau",
    "Republik Dominika": "Santo Domingo",
    Haiti: "Port-au-Prince",
    
    // Amerika Selatan
    Brasil: "Brasilia",
    Argentina: "Buenos Aires",
    Chile: "Santiago",
    Peru: "Lima",
    Kolombia: "Bogotá",
    Venezuela: "Caracas",
    Ecuador: "Quito",
    Bolivia: "La Paz",
    Paraguay: "Asunción",
    Uruguay: "Montevideo",
    Guyana: "Georgetown",
    Suriname: "Paramaribo",
    
    // Oseania
    Australia: "Canberra",
    "Selandia Baru": "Wellington",
    Fiji: "Suva",
    "Papua Nugini": "Port Moresby",
    Samoa: "Apia",
    Vanuatu: "Port Vila",
    "Solomon Islands": "Honiara"
};

// Helper function: ambil 3 ibukota random (selain yang benar) + 1 yang benar
export function generateAnswerChoices(namaNegaraBenar) {
    const negaraList = Object.keys(NegaraIbuKota);
    const ibuKotaBenar = NegaraIbuKota[namaNegaraBenar];
    
    // Filter negara lain (bukan yang ditanya)
    const negaraLain = negaraList.filter(n => n !== namaNegaraBenar);
    
    // Ambil 3 ibukota random dari negara lain
    const ibuKotaRandom = [];
    const negaraTerpilih = new Set();
    
    while (ibuKotaRandom.length < 3) {
        const randomIdx = Math.floor(Math.random() * negaraLain.length);
        const negraTersebut = negaraLain[randomIdx];
        
        if (!negaraTerpilih.has(negraTersebut)) {
            negaraTerpilih.add(negraTersebut);
            ibuKotaRandom.push(NegaraIbuKota[negraTersebut]);
        }
    }
    
    // Gabung dan shuffle
    const allAnswers = [ibuKotaBenar, ...ibuKotaRandom];
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);
    
    // Cari index jawaban yang benar
    const correctIdx = shuffled.indexOf(ibuKotaBenar);
    
    return { answers: shuffled, correctIndex: correctIdx };
}

// Helper function: generate soal ibukota
export function generateNegaraQuestion(namaNegaraBenar) {
    const { answers, correctIndex } = generateAnswerChoices(namaNegaraBenar);
    
    return {
        q: `Ibukota ${namaNegaraBenar} adalah?`,
        a: answers,
        t: correctIndex
    };
}

