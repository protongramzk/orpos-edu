<script>

    import { goto }
    from "$app/navigation";

    import LevelUI
    from "$lib/components/LevelUI.svelte";

    import QuizABCD
    from "$lib/components/QuizABCD.svelte";

    import {
        QuizABCDDB
    } from "$lib/data/quizabcd.js";

    import {
        buildLevelTree
    } from "$lib/storage/buildLevelTree.js";

    import {
        completeLevel
    } from "$lib/storage/progress.js";

    let scene = $state("level");

    let currentCategory = $state(null);

    let currentLevel = $state(null);

    let levels = $derived(
        buildLevelTree(
            "quizabcd",
            QuizABCDDB
        )
    );

    function openLevel(
        category,
        level
    ){
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

            mode:"quizabcd",

            category:
                currentCategory.id,

            level:
                currentLevel.id,

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

    <QuizABCD

        level={currentLevel}

        judul="ABC QUIZ"

        onExit={back}

        onWin={handleWin}

    />

{/if}
<style>

.root{

    min-height:100vh;

    background:#111;

    color:white;

    padding:16px;

    box-sizing:border-box;

}

.topbar{

    display:flex;

    gap:12px;

    align-items:center;

    margin-bottom:20px;

}

.topbar button{

    width:48px;

    height:48px;

    border:none;

    background:var(--accent);

    color:var(--accent-text);

}

.grid{

    display:grid;

    grid-template-columns:
    repeat(2,1fr);

    gap:12px;

}

.card{

    aspect-ratio:1;

    border:none;

    background:#1b1b1b;

    color:white;

    border-top:5px solid
    var(--accent);

    cursor:pointer;

    font-weight:bold;

}

</style>
