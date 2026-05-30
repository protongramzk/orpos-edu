<script>

    import HomeScreen from "../lib/components/HomeScreen.svelte";
    import LevelUI from "../lib/components/LevelUI.svelte";

    import { GAME_DATA } from "$lib/data";
    import { GAME_ENGINES } from "$lib/game/registry.js";
    import { buildLevelTree } from "$lib/storage/buildLevelTree.js";

    // =====================
    // STATE
    // =====================

    let scene = $state("home");

    let currentMode = $state(null);
    let currentCategory = $state(null);
    let currentLevel = $state(null);

    // =====================
    // TREE
    // =====================

    let gameTree = $derived(
        buildLevelTree(GAME_DATA)
    );

    // =====================
    // OPEN MODE
    // =====================

    function openMode(modeId) {

        const mode = gameTree.find(m => m.id === modeId);

        if (!mode) return;

        currentMode = mode;
        currentCategory = null;
        currentLevel = null;

        scene = "level";
    }

    // =====================
    // OPEN LEVEL (FIX IMPORTANT)
    // =====================

    function openLevel(category, level) {

        if (!level) return;

        currentCategory = category;
        currentLevel = level;

        scene = "game";
    }

    // =====================
    // NAVIGATION
    // =====================

    function backHome() {

        scene = "home";

        currentMode = null;
        currentCategory = null;
        currentLevel = null;
    }

    function backLevel() {

        scene = "level";

        currentLevel = null;
    }

    // =====================
    // SAFE ENGINE
    // =====================

    function getEngine() {

        if (!currentMode?.id) return null;

        return GAME_ENGINES[currentMode.id] ?? null;
    }

</script>

<!-- HOME -->
{#if scene === "home"}

    <HomeScreen
        onSelect={openMode}
    />

{/if}

<!-- LEVEL -->
{#if scene === "level"}

    <LevelUI

        data={currentMode?.categories ?? []}

        onSelect={openLevel}

        onBack={backHome}

    />

{/if}

<!-- GAME -->
{#if scene === "game"}

    {#if getEngine() && currentLevel}

        <svelte:component

            this={getEngine()}

            mode={currentMode.id}

            category={currentCategory}

            level={currentLevel}

            onExit={backLevel}

        />

    {:else}

        <div class="error">

            ENGINE / LEVEL TIDAK VALID

        </div>

    {/if}

{/if}

<style>

.error{

    min-height:100vh;

    display:flex;

    justify-content:center;

    align-items:center;

    color:red;

    background:#111;

}

</style>
