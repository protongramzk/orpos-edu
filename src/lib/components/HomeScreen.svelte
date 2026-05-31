<script>

    import { goto } from "$app/navigation";

    const menus = [

        {
            id:"abcd",
            title:"ABC QUIZ",
            icon:"quiz"
        },

        {
            id:"susunkata",
            title:"SUSUN KATA",
            icon:"spellcheck"
        },

        {
            id:"tarikkata",
            title:"TARIK GARIS",
            icon:"gesture"
        },

        {
            id:"benarsalah",
            title:"BENAR SALAH",
            icon:"check_circle"
        },

        {
            id:"urutkan",
            title:"URUTKAN",
            icon:"sort"
        },

        {
            id:"removeone",
            title:"HAPUS SATU",
            icon:"highlight_off"
        }

    ];

    let colorInput;

    function openGame(id){

        goto(`/${id}`);

    }

    function openColorPicker(){

        colorInput?.click();

    }

    function openSocial(){

        window.open(
            "https://facebook.com/groups/763653822106492/",
            "_blank"
        );

    }

    function setAccent(e){

        const color =
            e.target.value;

        document.documentElement
        .style
        .setProperty(
            "--accent",
            color
        );

        document.documentElement
        .style
        .setProperty(
            "--accent-text",
            getContrast(color)
        );

        localStorage.setItem(
            "accent",
            color
        );

    }

    function getContrast(hex){

        hex =
            hex.replace("#","");

        const r =
            parseInt(
                hex.slice(0,2),
                16
            );

        const g =
            parseInt(
                hex.slice(2,4),
                16
            );

        const b =
            parseInt(
                hex.slice(4,6),
                16
            );

        const brightness =

            (r * 299 +
            g * 587 +
            b * 114)

            / 1000;

        return brightness > 140
            ? "#111"
            : "#fff";

    }

    $effect(() => {

        const saved =
            localStorage.getItem(
                "accent"
            );

        if(!saved)
            return;

        document.documentElement
        .style
        .setProperty(
            "--accent",
            saved
        );

        document.documentElement
        .style
        .setProperty(
            "--accent-text",
            getContrast(saved)
        );

    });

</script>

<div class="home">

    <div class="hero">

        <div class="logo">

            <span
                class="material-icons"
            >
                school
            </span>

        </div>

        <div class="title">

            Orpos Edu

        </div>

        <div class="subtitle">

            Version 0.1.0 Beta

        </div>

    </div>

    <div class="grid">

        {#each menus as menu}

            <button
                class="card"
                onclick={() =>
                    openGame(menu.id)
                }
            >

                <span
                    class="material-icons icon"
                >
                    {menu.icon}
                </span>

                <span
                    class="label"
                >
                    {menu.title}
                </span>

            </button>

        {/each}

    </div>

    <div class="bottom">

        <button
            class="btn"
            onclick={
                openColorPicker
            }
        >

            <span
                class="material-icons"
            >
                palette
            </span>

            TEMA

        </button>

        <button
            class="btn"
            onclick={
                openSocial
            }
        >

            <span
                class="material-icons"
            >
                groups
            </span>

            KOMUNITAS

        </button>

    </div>

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

    padding:20px;

    box-sizing:border-box;

    background:#111;

    color:white;

    font-family:sans-serif;

    display:flex;

    flex-direction:column;

}

.hero{

    text-align:center;

    margin-bottom:28px;

}

.logo{

    width:80px;

    height:80px;

    margin:auto;

    margin-bottom:12px;

    background:var(--accent);

    color:var(--accent-text);

    display:flex;

    align-items:center;

    justify-content:center;

}

.logo .material-icons{

    font-size:42px;

}

.title{

    font-size:38px;

    font-weight:800;

    color:var(--accent);

}

.subtitle{

    margin-top:6px;

    color:#888;

    font-size:14px;

}

.grid{

    display:grid;

    grid-template-columns:
        repeat(2,1fr);

    gap:14px;

    flex:1;

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

    cursor:pointer;

    border-top:5px solid
    var(--accent);

    transition:
        .15s transform,
        .15s background;

}

.card:hover{

    background:#252525;

    transform:
        translateY(-4px);

}

.card:active{

    transform:
        scale(.97);

}

.icon{

    color:var(--accent);

    font-size:48px;

}

.label{

    font-size:15px;

    font-weight:bold;

    text-align:center;

}

.bottom{

    margin-top:20px;

    display:grid;

    grid-template-columns:
        1fr 1fr;

    gap:12px;

}

.btn{

    border:none;

    background:var(--accent);

    color:var(--accent-text);

    padding:16px;

    display:flex;

    align-items:center;

    justify-content:center;

    gap:10px;

    font-weight:bold;

    cursor:pointer;

    transition:
        .15s transform,
        .15s filter;

}

.btn:hover{

    filter:brightness(1.08);

}

.btn:active{

    transform:scale(.97);

}

</style>
