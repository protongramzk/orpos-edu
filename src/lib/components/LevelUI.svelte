<script>

    import {
        fly
    } from "svelte/transition";

    let {
        data = [],
        onSelect = () => {}
    } = $props();

    let currentCategory = $state(null);

    function openCategory(cat){

        currentCategory = cat;

    }

    function back(){

        currentCategory = null;

    }

    function choose(level){

        if(level.locked)
            return;

        onSelect(
            currentCategory,
            level
        );

    }

    function calcProgress(cat){

        return (

            cat.currentReachedLevel
            /
            cat.levels.length

        ) * 100;

    }

</script>

<div class="level-ui">

    {#if !currentCategory}

        <div
            transition:fly={{
                x:-100,
                duration:250
            }}
        >

            <div class="header">

                <span
                    class="material-icons"
                >
                    leaderboard
                </span>

                LEVEL SELECT

            </div>

            <div class="category-list">

                {#each data as cat}

                    <button
                        class="category-card"
                        onclick={() =>
                            openCategory(cat)
                        }
                    >

                        <div
                            class="cat-icon"
                        >

                            <span
                                class="material-icons"
                            >
                                folder
                            </span>

                        </div>

                        <div
                            class="cat-content"
                        >

                            <div
                                class="cat-top"
                            >

                                <div
                                    class="cat-title"
                                >

                                    {cat.title}

                                </div>

                                <div
                                    class="cat-counter"
                                >

                                    {cat.currentReachedLevel}
                                    /
                                    {cat.levels.length}

                                </div>

                            </div>

                            <div
                                class="progress-wrap"
                            >

                                <div
                                    class="progress"
                                    style:width={
                                        `${calcProgress(cat)}%`
                                    }
                                ></div>

                            </div>

                        </div>

                    </button>

                {/each}

            </div>

        </div>

    {/if}

    {#if currentCategory}

        <div
            transition:fly={{
                x:150,
                duration:250
            }}
        >

            <div class="topbar">

                <button
                    class="back-btn"
                    onclick={back}
                >

                    <span
                        class="material-icons"
                    >
                        arrow_back
                    </span>

                </button>

                <div class="title">

                    {currentCategory.title}

                </div>

            </div>

            <div class="level-grid">

                {#each currentCategory.levels as lvl}

                    <button

                        class="
                            level-card
                            {lvl.locked
                            ? 'locked'
                            : ''}
                        "

                        onclick={() =>
                            choose(lvl)
                        }
                    >

                        <div
                            class="lvl-top"
                        >

                            <div
                                class="lvl-id"
                            >

                                {lvl.id}

                            </div>

                            {#if lvl.locked}

                                <span
                                    class="material-icons lock"
                                >
                                    lock
                                </span>

                            {/if}

                        </div>

                        {#if !lvl.locked}

                            <div
                                class="score-box"
                            >

                                <span
                                    class="material-icons"
                                >
                                    military_tech
                                </span>

                                {lvl.highscore}

                            </div>

                        {/if}

                    </button>

                {/each}

            </div>

        </div>

    {/if}

</div>
<style>

    :global(:root){

        --accent:#00a8ff;

        --accent-text:#fff;

    }

    .level-ui{

        min-height:100vh;

        background:#111;

        color:white;

        padding:16px;

        box-sizing:border-box;

        font-family:sans-serif;

    }

    /* ================= */

    .header{

        display:flex;

        align-items:center;

        gap:10px;

        color:var(--accent);

        font-size:32px;

        font-weight:bold;

        margin-bottom:20px;

    }

    /* ================= */

    .category-list{

        display:flex;

        flex-direction:column;

        gap:14px;

    }

    .category-card{

        border:none;

        background:#1c1c1c;

        border-left:6px solid
        var(--accent);

        color:white;

        padding:18px;

        display:flex;

        gap:16px;

        cursor:pointer;

        text-align:left;

        transition:
            .18s transform,
            .18s background;

    }

    .category-card:hover{

        transform:
            translateX(8px);

        background:#262626;

    }

    .category-card:active{

        transform:
            scale(.98);

    }

    .cat-icon{

        display:flex;

        align-items:center;

        color:var(--accent);

    }

    .cat-content{

        flex:1;

    }

    .cat-top{

        display:flex;

        justify-content:space-between;

        align-items:center;

        margin-bottom:12px;

    }

    .cat-title{

        font-size:22px;

        font-weight:bold;

    }

    .cat-counter{

        color:var(--accent);

        font-size:14px;

    }

    /* ================= */

    .progress-wrap{

        height:10px;

        background:#2a2a2a;

    }

    .progress{

        height:100%;

        background:var(--accent);

        transition:.25s;

    }

    /* ================= */

    .topbar{

        display:flex;

        align-items:center;

        gap:14px;

        margin-bottom:20px;

    }

    .back-btn{

        width:52px;

        height:52px;

        border:none;

        background:var(--accent);

        color:var(--accent-text);

        display:flex;

        align-items:center;

        justify-content:center;

        cursor:pointer;

        transition:.15s;

    }

    .back-btn:hover{

        filter:brightness(1.1);

    }

    .back-btn:active{

        transform:scale(.95);

    }

    .title{

        font-size:28px;

        font-weight:bold;

        color:var(--accent);

    }

    /* ================= */

    .level-grid{

        display:grid;

        grid-template-columns:
            repeat(
                auto-fill,
                minmax(120px,1fr)
            );

        gap:14px;

    }

    .level-card{

        border:none;

        background:#1c1c1c;

        border-top:5px solid
        var(--accent);

        color:white;

        min-height:120px;

        padding:14px;

        display:flex;

        flex-direction:column;

        justify-content:space-between;

        cursor:pointer;

        transition:
            .18s transform,
            .18s background;

    }

    .level-card:hover{

        transform:
            translateY(-4px);

        background:#262626;

    }

    .level-card:active{

        transform:
            scale(.97);

    }

    .lvl-top{

        display:flex;

        justify-content:
        space-between;

    }

    .lvl-id{

        font-size:34px;

        font-weight:bold;

        color:var(--accent);

    }

    .score-box{

        display:flex;

        align-items:center;

        gap:6px;

        color:var(--accent);

        font-weight:bold;

    }

    .lock{

        color:#aaa;

    }

    /* ================= */

    .locked{

        opacity:.45;

        filter:grayscale(1);

        cursor:not-allowed;

    }

    .locked:hover{

        transform:none;

        background:#1c1c1c;

    }

    /* ================= */

    .material-icons{

        user-select:none;

    }

</style>
