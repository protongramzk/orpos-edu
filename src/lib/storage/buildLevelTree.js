import {
    loadProgress
}
from "./progress.js";

export function buildLevelTree(
    mode,
    categories
){

    const progress =
        loadProgress();

    return categories.map(cat => {

        const catProg =
            progress?.[mode]
                    ?.[cat.id]
            ?? {};

        const levels =
            cat.levels.map(
                level => {

                const p =
                    catProg[level.id];

                return {

                    ...level,

                    locked:
                        level.id !== 1 &&
                        !p?.unlocked,

                    highscore:
                        p?.highscore ?? 0

                };

            });

        let reached = 0;

        for(
            const lvl of levels
        ){

            if(!lvl.locked)
                reached++;
        }

        return {

            ...cat,

            currentReachedLevel:
                reached,

            levels

        };

    });

}
