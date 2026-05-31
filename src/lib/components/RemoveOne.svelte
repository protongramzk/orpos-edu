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

            return "bg-accent text-accent-content animate-success";

        }

        if(
            wrongItem === item
        ){

            return "bg-danger-dark animate-shake";

        }

        return "bg-card";
    }

</script>

<div class="root min-h-screen bg-dark text-white p-4 flex flex-col gap-4">

    <div class="topbar flex items-center gap-3">

        <button
            class="back w-13 h-13 border-none bg-accent text-accent-content text-xl cursor-pointer"
            onclick={onExit}
        >

            ←

        </button>

        <div class="title flex-1 text-2xl font-bold text-accent">

            {judul}

        </div>

        <div class="score font-bold text-accent">

            {Math.round(score)}

        </div>

    </div>

    <div class="progress-wrap progress-bar">

        <div
            class="progress progress-fill"
            style:width={`${progress}%`}
        ></div>

    </div>

    {#if round}

        <div class="question text-xl font-bold">

            Pilih item yang
            tidak termasuk
            kelompok.

        </div>

        <div class="list flex flex-col gap-3">

            {#each options as item}

                <button

                    class="
                        item
                        border-none
                        text-white
                        p-5
                        flex
                        items-center
                        gap-14
                        text-left
                        cursor-pointer
                        transition-transform
                        hover-bg-hover-alt
                        hover-translate-x-2
                        {itemClass(item)}
                    "

                    onclick={() =>
                        choose(item)
                    }

                >

                    <div
                        class="bullet {selected === item ? 'bg-accent-content' : 'bg-accent'}"
                    ></div>

                    <span>

                        {item}

                    </span>

                </button>

            {/each}

        </div>

    {/if}

</div>
