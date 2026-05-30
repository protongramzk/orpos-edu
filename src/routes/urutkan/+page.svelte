<script>

    import { goto }
    from "$app/navigation";

    import LevelUI from "$lib/components/LevelUI.svelte";

    import Urutkan from "$lib/components/Urutkan.svelte";

    import { UrutkanDB } from "$lib/data/urutkan.js";

    import { buildLevelTree } from "$lib/storage/buildLevelTree.js";

    import { completeLevel } from "$lib/storage/progress.js";

    let scene = $state("level");

    let currentCategory = $state(null);

    let currentLevel = $state(null);

    let levels = $derived(
        buildLevelTree(
            "urutkan",
            UrutkanDB
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

            mode:"urutkan",

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

    <Urutkan

        level={currentLevel}

        judul="URUTKAN"

        onExit={back}

        onWin={handleWin}

    />

{/if}
