<script>

    import {
        fly
    } from "svelte/transition";

    let {
        data = [],
        onSelect = () => {},
        onBack = () => {}
    } = $props();

    let currentCategory = $state(null);

    function openCategory(cat){

        currentCategory = cat;

    }

    function back(){

        if(currentCategory){
            currentCategory = null;
        } else {
            onBack();
        }

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

<div class="level-ui min-h-screen bg-dark text-white p-4">

    {#if !currentCategory}

        <div
            transition:fly={{
                x:-100,
                duration:250
            }}
        >

            <div class="topbar flex items-center gap-14 mb-5">

                <button
                    class="back-btn w-13 h-13 border-none bg-accent text-accent-content flex items-center justify-center cursor-pointer transition-all hover-brightness active-scale-95"
                    onclick={back}
                >

                    <span
                        class="material-icons"
                    >
                        arrow_back
                    </span>

                </button>

                <div class="header flex items-center gap-10 text-accent text-4xl font-bold">

                    <span
                        class="material-icons"
                    >
                        leaderboard
                    </span>

                    LEVEL SELECT

                </div>

            </div>

            <div class="category-list flex flex-col gap-14">

                {#each data as cat}

                    <button
                        class="category-card border-none bg-card-alt border-l-6 text-white p-5 flex gap-4 cursor-pointer text-left transition-all hover-translate-x-2 hover-bg-hover-alt active-scale-98"
                        onclick={() =>
                            openCategory(cat)
                        }
                    >

                        <div
                            class="cat-icon flex items-center text-accent"
                        >

                            <span
                                class="material-icons"
                            >
                                folder
                            </span>

                        </div>

                        <div
                            class="cat-content flex-1"
                        >

                            <div
                                class="cat-top flex justify-between items-center mb-3"
                            >

                                <div
                                    class="cat-title text-xl font-bold"
                                >

                                    {cat.title}

                                </div>

                                <div
                                    class="cat-counter text-accent text-sm"
                                >

                                    {cat.currentReachedLevel}
                                    /
                                    {cat.levels.length}

                                </div>

                            </div>

                            <div
                                class="progress-wrap progress-bar bg-progress-wrap"
                            >

                                <div
                                    class="progress progress-fill"
                                    style:width={`${calcProgress(cat)}%`}
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

            <div class="topbar flex items-center gap-14 mb-5">

                <button
                    class="back-btn w-13 h-13 border-none bg-accent text-accent-content flex items-center justify-center cursor-pointer transition-all hover-brightness active-scale-95"
                    onclick={back}
                >

                    <span
                        class="material-icons"
                    >
                        arrow_back
                    </span>

                </button>

                <div class="title text-3xl font-bold text-accent">

                    {currentCategory.title}

                </div>

            </div>

            <div class="level-grid grid grid-cols-auto-fill gap-14">

                {#each currentCategory.levels as lvl}

                    <button

                        class="
                            level-card
                            border-none
                            bg-card-alt
                            border-t-5
                            text-white
                            min-h-120
                            p-4
                            flex
                            flex-col
                            justify-between
                            cursor-pointer
                            transition-all
                            {lvl.locked
                            ? 'opacity-45 grayscale cursor-not-allowed'
                            : 'hover-translate-y-neg-1 hover-bg-hover-alt active-scale-97'}
                        "

                        onclick={() =>
                            choose(lvl)
                        }
                    >

                        <div
                            class="lvl-top flex justify-between"
                        >

                            <div
                                class="lvl-id text-4xl font-bold text-accent"
                            >

                                {lvl.id}

                            </div>

                            {#if lvl.locked}

                                <span
                                    class="material-icons lock text-gray"
                                >
                                    lock
                                </span>

                            {/if}

                        </div>

                        {#if !lvl.locked}

                            <div
                                class="score-box flex items-center gap-2 text-accent font-bold"
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
