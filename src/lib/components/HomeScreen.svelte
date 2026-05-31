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

<div class="home min-h-screen p-5 bg-dark text-white flex flex-col">

    <div class="hero text-center mb-7">

        <div class="logo w-20 h-20 m-auto mb-3 bg-accent text-accent-content flex items-center justify-center">

            <span
                class="material-icons icon-lg"
            >
                school
            </span>

        </div>

        <div class="title text-5xl font-extrabold text-accent">

            Orpos Edu

        </div>

        <div class="subtitle mt-1 text-muted text-sm">

            Version 0.1.0 Beta

        </div>

    </div>

    <div class="grid grid-cols-2 gap-14 flex-1">

        {#each menus as menu}

            <button
                class="card border-none bg-card text-white aspect-square flex flex-col justify-center items-center gap-3 cursor-pointer border-t-5 transition-transform hover-bg-hover hover-translate-y-neg-1 active-scale-97"
                onclick={() =>
                    openGame(menu.id)
                }
            >

                <span
                    class="material-icons icon text-accent icon-xl"
                >
                    {menu.icon}
                </span>

                <span
                    class="label text-base font-bold text-center"
                >
                    {menu.title}
                </span>

            </button>

        {/each}

    </div>

    <div class="bottom mt-5 grid grid-cols-2 gap-12">

        <button
            class="btn border-none bg-accent text-accent-content p-4 flex items-center justify-center gap-10 font-bold cursor-pointer transition-all hover-brightness active-scale-97"
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
            class="btn border-none bg-accent text-accent-content p-4 flex items-center justify-center gap-10 font-bold cursor-pointer transition-all hover-brightness active-scale-97"
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
