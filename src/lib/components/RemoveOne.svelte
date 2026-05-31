<script>

    let {

        level,

        judul = "REMOVE ONE",

        onWin = () => {},

        onExit = () => {}

    } = $props();

    let rounds =
        level?.items ?? [];

    let current =
        $state(0);

    let score =
        $state(0);

    let selected =
        $state(null);

    let locked =
        $state(false);

    let wrongItem =
        $state(null);

    let round =
        $derived(
            rounds[current]
        );

    let options =
        $derived.by(() => {

            if(!round)
                return [];

            return [

                ...round.t,

                ...round.f

            ].sort(
                () =>
                Math.random() - 0.5
            );

        });

    let progress =
        $derived(

            rounds.length

            ?

            (current /
            rounds.length) * 100

            :

            0

        );

    async function choose(item){

        if(locked)
            return;

        locked = true;

        const correct =
            round.f.includes(item);

        if(correct){

            selected = item;

            score +=
                100 /
                rounds.length;

            await wait(500);

            current++;

            selected = null;

            locked = false;

            if(
                current >=
                rounds.length
            ){

                onWin(
                    Math.round(score)
                );

            }

            return;
        }

        wrongItem = item;

        await wait(450);

        wrongItem = null;

        locked = false;
    }

    function wait(ms){

        return new Promise(

            r => setTimeout(
                r,
                ms
            )

        );

    }

    function itemClass(item){

        if(
            selected === item
        ){

            return "correct";

        }

        if(
            wrongItem === item
        ){

            return "wrong";

        }

        return "";
    }

</script>

<div class="root">

    <div class="topbar">

        <button
            class="back"
            onclick={onExit}
        >

            ←

        </button>

        <div class="title">

            {judul}

        </div>

        <div class="score">

            {Math.round(score)}

        </div>

    </div>

    <div class="progress-wrap">

        <div
            class="progress"
            style:width={`${progress}%`}
        ></div>

    </div>

    {#if round}

        <div class="question">

            Pilih item yang
            tidak termasuk
            kelompok.

        </div>

        <div class="list">

            {#each options as item}

                <button

                    class="
                        item
                        {itemClass(item)}
                    "

                    onclick={() =>
                        choose(item)
                    }

                >

                    <span
                        class="bullet"
                    ></span>

                    <span>

                        {item}

                    </span>

                </button>

            {/each}

        </div>

    {/if}

</div>

<style>

.root{

    min-height:100vh;

    background:#111;

    color:white;

    padding:16px;

    box-sizing:border-box;

    display:flex;

    flex-direction:column;

    gap:16px;

}

.topbar{

    display:flex;

    align-items:center;

    gap:12px;

}

.back{

    width:50px;

    height:50px;

    border:none;

    background:var(--accent);

    color:var(--accent-text);

    font-size:22px;

    cursor:pointer;

}

.title{

    flex:1;

    font-size:24px;

    font-weight:bold;

    color:var(--accent);

}

.score{

    font-weight:bold;

    color:var(--accent);

}

.progress-wrap{

    height:10px;

    background:#222;

}

.progress{

    height:100%;

    background:var(--accent);

    transition:0.25s;

}

.question{

    font-size:22px;

    font-weight:bold;

    line-height:1.5;

}

.list{

    display:flex;

    flex-direction:column;

    gap:12px;

}

.item{

    border:none;

    background:#1b1b1b;

    color:white;

    padding:18px;

    display:flex;

    align-items:center;

    gap:14px;

    text-align:left;

    cursor:pointer;

    transition:
        transform .15s,
        background .15s;

}

.item:hover{

    background:#262626;

    transform:
        translateX(6px);

}

.bullet{

    width:12px;

    height:12px;

    background:var(--accent);

    flex-shrink:0;

}

.correct{

    background:
        var(--accent) !important;

    color:
        var(--accent-text);

    animation:
        success .4s ease;

}

.correct .bullet{

    background:
        var(--accent-text);

}

.wrong{

    animation:
        shake .35s;

    background:
        #5b2222;

}

@keyframes shake{

    0%{

        transform:
            translateX(0);

    }

    25%{

        transform:
            translateX(-8px);

    }

    50%{

        transform:
            translateX(8px);

    }

    75%{

        transform:
            translateX(-6px);

    }

    100%{

        transform:
            translateX(0);

    }

}

@keyframes success{

    from{

        opacity:.6;

        transform:
            translateX(-12px);

    }

    to{

        opacity:1;

        transform:
            translateX(0);

    }

}

</style>
