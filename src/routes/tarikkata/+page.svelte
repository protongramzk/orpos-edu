<script>

    import { goto }
    from "$app/navigation";

    import LevelUI from "$lib/components/LevelUI.svelte";

    import TarikKata from "$lib/components/TarikKata.svelte";

    import { TarikKataDB } from "$lib/data/tarikkata.js";

    import { buildLevelTree } from "$lib/storage/buildLevelTree.js";

    import { completeLevel } from "$lib/storage/progress.js";

    let scene = $state("level");

    let currentCategory = $state(null);

    let currentLevel = $state(null);

    let levels = $derived(
        buildLevelTree(
            "tarikkata",
            TarikKataDB
        )
    );

    function openLevel(category, level){

        currentCategory = category;

        currentLevel = level;

        scene = "game";
    }

    function back(){

        if(scene === "game"){

            scene = "level";

            currentLevel = null;

            return;
        }

        goto("/");
    }

    function handleWin(score){

        completeLevel({

            mode:"tarikkata",

            category:currentCategory.id,

            level:currentLevel.id,

            score:Number(score)

        });

        scene = "level";

        currentLevel = null;
    }

</script>

{#if scene === "level"}

    <LevelUI
        data={levels}
        onSelect={openLevel}
    />

{/if}

{#if scene === "game"}

    <TarikKata

        level={currentLevel}

        judul="TARIK KATA"

        onExit={back}

        onWin={handleWin}

    />

{/if}
