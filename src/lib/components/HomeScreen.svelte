<script>

    import { goto } from "$app/navigation";

    // =========================
    // MENU GRID
    // =========================

    const menus = [

        {
            id: "abcd",
            title: "ABC QUIZ",
            icon: "quiz"
        },

        {
            id: "susunkata",
            title: "SUSUN KATA",
            icon: "drag_indicator"
        },

        {
            id: "tarikkata",
            title: "TARIK GARIS",
            icon: "gesture"
        },

        {
            id: "benarsalah",
            title: "BENAR SALAH",
            icon: "check_circle"
        },
        { id:"urutkan",
title:"Urutkan",
icon:"sort"}

    ];

    // =========================
    // NAVIGATION
    // =========================

    function openGame(id) {

        goto(`/${id}`);
    }

    // =========================
    // COLOR PICKER
    // =========================

    let colorInput;

    function openColorPicker() {
        colorInput.click();
    }

    function setAccent(e) {

        const color = e.target.value;

        document.documentElement.style.setProperty(
            "--accent",
            color
        );

        document.documentElement.style.setProperty(
            "--accent-text",
            getContrast(color)
        );

        localStorage.setItem("accent", color);
    }

    function getContrast(hex) {

        hex = hex.replace("#", "");

        const r = parseInt(hex.slice(0,2), 16);
        const g = parseInt(hex.slice(2,4), 16);
        const b = parseInt(hex.slice(4,6), 16);

        const brightness =
            (r * 299 + g * 587 + b * 114) / 1000;

        return brightness > 140 ? "#111" : "#fff";
    }

    // =========================
    // LOAD ACCENT
    // =========================

    $effect(() => {

        const saved =
            localStorage.getItem("accent");

        if (!saved) return;

        document.documentElement.style.setProperty(
            "--accent",
            saved
        );

        document.documentElement.style.setProperty(
            "--accent-text",
            getContrast(saved)
        );

    });

</script>

<div class="home">

    <!-- TITLE -->

    <div class="title">
        GAME LAUNCHER
    </div>

    <!-- GRID -->

    <div class="grid">

        {#each menus as m}

            <button
                class="card"
                onclick={() => openGame(m.id)}
            >

                <span class="material-icons icon">
                    {m.icon}
                </span>

                <div class="label">
                    {m.title}
                </div>

            </button>

        {/each}

    </div>

    <!-- ACTIONS -->

    <div class="bottom">

        <button
            class="btn"
            onclick={openColorPicker}
        >
            <span class="material-icons">
                palette
            </span>

            COLOR
        </button>

        <button class="btn">
            <span class="material-icons">
                groups
            </span>

            SOCIAL
        </button>

    </div>

    <!-- hidden input -->

    <input
        bind:this={colorInput}
        type="color"
        hidden
        onchange={setAccent}
    />

</div>

<style>

    :global(:root){
        --accent:#00a8ff;
        --accent-text:#fff;
    }

    :global(body){
        margin:0;
        background:#111;
    }

    .home{

        min-height:100vh;

        padding:16px;

        box-sizing:border-box;

        background:#111;

        color:white;

        font-family:sans-serif;

        display:flex;

        flex-direction:column;
    }

    .title{

        font-size:34px;

        font-weight:bold;

        color:var(--accent);

        margin-bottom:24px;
    }

    .grid{

        display:grid;

        grid-template-columns:repeat(2,1fr);

        gap:14px;

        margin-bottom:40px;
    }

    .card{

        border:none;

        background:#1b1b1b;

        color:white;

        aspect-ratio:1;

        display:flex;

        flex-direction:column;

        justify-content:center;

        align-items:center;

        gap:12px;

        border-top:5px solid var(--accent);

        cursor:pointer;

        transition:0.15s;
    }

    .card:hover{
        background:#2a2a2a;
    }

    .icon{

        font-size:48px;

        color:var(--accent);
    }

    .label{

        font-weight:bold;

        font-size:16px;

        text-align:center;
    }

    .bottom{

        display:grid;

        grid-template-columns:1fr 1fr;

        gap:12px;
    }

    .btn{

        background:var(--accent);

        color:var(--accent-text);

        border:none;

        padding:16px;

        display:flex;

        justify-content:center;

        align-items:center;

        gap:10px;

        font-weight:bold;

        cursor:pointer;
    }

    .btn:hover{
        filter:brightness(1.1);
    }

</style>
