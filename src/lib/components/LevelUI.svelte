<script>

    let {
        data = [],
        onSelect = () => {}
    } = $props();

    // =====================
    // STATE
    // =====================

    let currentCategory = $state(null);

    // =====================
function choose(level){

    if(level.locked)
        return;

    onSelect(
        currentCategory,
        level
    );
}
    function openCategory(cat) {

        currentCategory = cat;
    }

    function back() {

        currentCategory = null;
    }

    function calcProgress(cat) {

        return (
            (cat.currentReachedLevel /
            cat.levels.length) * 100
        );
    }

</script>

<div class="level-ui">

    <!-- ================= -->
    <!-- CATEGORY MODE -->
    <!-- ================= -->

    {#if !currentCategory}

        <div class="header">

            LEVEL SELECT

        </div>

        <div class="category-list">

            {#each data as cat}

                <button
                    class="category-card"
                    onclick={() => openCategory(cat)}
                >

                    <div class="cat-top">

                        <div class="cat-title">

                            {cat.title}

                        </div>

                        <div class="cat-counter">

                            {cat.currentReachedLevel}
                            /
                            {cat.levels.length}

                        </div>

                    </div>

                    <div class="progress-wrap">

                        <div
                            class="progress"
                            style:width={
                                `${calcProgress(cat)}%`
                            }
                        ></div>

                    </div>

                </button>

            {/each}

        </div>

    {/if}

    <!-- ================= -->
    <!-- LEVEL MODE -->
    <!-- ================= -->

    {#if currentCategory}

        <div class="topbar">

            <button
                class="back-btn"
                onclick={back}
            >

                ←

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
                    onclick={() => choose(lvl)}
                >

                    <div class="lvl-id">

                        {lvl.id}

                    </div>

                    {#if lvl.locked}

                        <div class="lock">

                            🔒

                        </div>

                    {:else}

                        <div class="score-label">

                            SKOR

                        </div>

                        <div class="score">

                            {lvl.highscore}

                        </div>

                    {/if}

                </button>

            {/each}

        </div>

    {/if}

</div>

<style>

    :global(:root){

        --accent:#00a8ff;

        --accent-text:#fff;
    }

    .level-ui{

        width:100%;

        min-height:100vh;

        background:#111;

        color:white;

        padding:16px;

        box-sizing:border-box;

        font-family:sans-serif;
    }

    /* ===================== */

    .header{

        font-size:32px;

        font-weight:bold;

        color:var(--accent);

        margin-bottom:18px;
    }

    /* ===================== */

    .category-list{

        display:flex;

        flex-direction:column;

        gap:14px;
    }

    .category-card{

        border:none;

        background:#1c1c1c;

        border-left:6px solid var(--accent);

        padding:18px;

        color:white;

        text-align:left;

        cursor:pointer;

        display:flex;

        flex-direction:column;

        gap:12px;

        transition:0.15s;
    }

    .category-card:hover{

        background:#282828;
    }

    .cat-top{

        display:flex;

        justify-content:space-between;

        align-items:center;
    }

    .cat-title{

        font-size:24px;

        font-weight:bold;
    }

    .cat-counter{

        color:var(--accent);

        font-size:15px;
    }

    /* ===================== */

    .progress-wrap{

        width:100%;

        height:12px;

        background:#262626;
    }

    .progress{

        height:100%;

        background:var(--accent);

        transition:0.2s;
    }

    /* ===================== */

    .topbar{

        display:flex;

        align-items:center;

        gap:16px;

        margin-bottom:20px;
    }

    .back-btn{

        width:52px;

        height:52px;

        border:none;

        background:var(--accent);

        color:var(--accent-text);

        font-size:24px;

        cursor:pointer;
    }

    .title{

        font-size:30px;

        font-weight:bold;

        color:var(--accent);
    }

    /* ===================== */

    .level-grid{

        display:grid;

        grid-template-columns:
            repeat(auto-fill,minmax(120px,1fr));

        gap:14px;
    }

    .level-card{

        border:none;

        background:#1e1e1e;

        color:white;

        min-height:120px;

        padding:14px;

        cursor:pointer;

        border-top:5px solid var(--accent);

        display:flex;

        flex-direction:column;

        justify-content:space-between;

        transition:0.15s;
    }

    .level-card:hover{

        background:#292929;
    }

    .lvl-id{

        font-size:34px;

        font-weight:bold;

        color:var(--accent);
    }

    .score-label{

        font-size:12px;

        opacity:0.7;
    }

    .score{

        font-size:24px;

        font-weight:bold;
    }

    /* ===================== */

    .locked{

        opacity:0.45;

        filter:grayscale(1);

        cursor:not-allowed;
    }

    .lock{

        font-size:28px;
    }

</style>
