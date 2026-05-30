const KEY = "orpos-progress";


// =====================
// LOAD
// =====================

export function loadProgress(){

    try{

        return JSON.parse(
            localStorage.getItem(KEY)
        ) || {};

    }
    catch{

        return {};
    }
}


// =====================
// SAVE
// =====================

export function saveProgress(data){

    localStorage.setItem(
        KEY,
        JSON.stringify(data)
    );
}


// =====================
// GET LEVEL
// =====================

export function getLevelData(
    mode,
    category,
    level
){

    const db =
        loadProgress();

    return db?.[mode]
             ?. [category]
             ?. [level]
           ?? null;
}


// =====================
// COMPLETE LEVEL
// =====================

export function completeLevel({

    mode,
    category,
    level,
    score

}){

    const db =
        loadProgress();

    // create mode

    if(!db[mode])
        db[mode] = {};

    // create category

    if(
        !db[mode][category]
    ){
        db[mode][category] = {};
    }

    // current

    const current =
        db[mode][category][level]
        ?? {
            unlocked:true,
            highscore:0
        };

    // update score

    current.highscore =
        Math.max(
            current.highscore,
            score
        );

    current.unlocked =
        true;

    db[mode][category][level] =
        current;

    // unlock next level

    const next =
        level + 1;

    if(
        !db[mode][category][next]
    ){

        db[mode][category][next] = {

            unlocked:true,

            highscore:0

        };

    }

    saveProgress(db);

    return db;
}
