<script>

    import { goto }
    from "$app/navigation";

    import LevelUI
    from "$lib/components/LevelUI.svelte";

    import RemoveOne
    from "$lib/components/RemoveOne.svelte";

    import {
        RemoveOneDB
    }
    from "$lib/data/removeone.js";

    import {
        buildLevelTree
    }
    from "$lib/storage/buildLevelTree.js";

    import {
        completeLevel
    }
    from "$lib/storage/progress.js";

    let scene =
        $state("level");

    let currentLevel =
        $state(null);

    let currentCategory =
        $state(null);

    let refresh =
        $state(0);

    let levels =
        $derived.by(() => {

            refresh;

            return buildLevelTree(

                "removeone",

                RemoveOneDB

            );

        });

    function openLevel(
        category,
        level
    ){

        currentCategory =
            category;

        currentLevel =
            level;

        scene =
            "game";

    }

    function back(){

        if(
            scene === "game"
        ){

            scene =
                "level";

            return;

        }

        goto("/");

    }

    function win(score){

        completeLevel({

            mode:
                "removeone",

            category:
                currentCategory.id,

            level:
                currentLevel.id,

            score

        });

        refresh++;

        scene =
            "level";

    }

</script>

{#if scene === "level"}

    <LevelUI

        data={levels}

        onSelect={
            openLevel
        }

    />

{/if}

{#if scene === "game"}

    <RemoveOne

        level={
            currentLevel
        }

        onExit={back}

        onWin={win}

    />

{/if}
