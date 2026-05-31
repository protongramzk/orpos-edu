<script>

    let {
        level,
        judul = "URUTKAN",
        onWin = () => {},
        onExit = () => {}
    } = $props();

    let rounds =
        level?.items ?? [];

    let current =
        $state(0);

    let score =
        $state(0);

    let dragIndex =
        $state(null);

    let round =
        $derived(
            rounds[current]
        );

    let list =
        $state([]);

    function shuffle(arr){

        return [...arr]
        .sort(
            () =>
            Math.random() - 0.5
        );

    }

    $effect(() => {

        current;

        if(round){

            list =
                shuffle(
                    round.order
                );

        }

    });

    // =====================
    // DRAG DROP
    // =====================

    function dragStart(i){

        dragIndex = i;

    }

    function dragOver(e){

        e.preventDefault();

    }

    function drop(i){

        if(
            dragIndex === null ||
            dragIndex === i
        ) return;

        let copy =
            [...list];

        let item =
            copy.splice(
                dragIndex,
                1
            )[0];

        copy.splice(
            i,
            0,
            item
        );

        list = copy;

        dragIndex = null;

    }

    // =====================

    function check(){

        let correct = true;

        for(
            let i=0;
            i<round.order.length;
            i++
        ){

            if(
                list[i] !==
                round.order[i]
            ){

                correct = false;
                break;
            }

        }

        if(!correct)
            return;

        score +=
            100 /
            rounds.length;

        current++;

        if(
            current >=
            rounds.length
        ){

            onWin(
                score.toFixed(1)
            );

        }

    }

</script>

<div class="root min-h-screen bg-dark text-white p-4">

    <div class="topbar flex gap-3 items-center mb-5">

        <button
            class="icon-btn w-13 h-13 border-none rounded-lg bg-accent text-accent-content flex items-center justify-center transition-all active-scale-92 cursor-pointer"
            onclick={onExit}
        >
            <span
                class="material-symbols-rounded"
            >
                arrow_back
            </span>
        </button>

        <div class="title text-3xl font-bold text-accent">

            {judul}

        </div>

    </div>

    {#if round}

        <div class="clue bg-card p-4 rounded-lg mb-5 border-l-5">

            {round.clue}

        </div>

        <div class="list flex flex-col gap-3">

            {#each list as item, i}

                <div
                    class="card flex items-center gap-3 bg-card-alt p-4 rounded-xl cursor-grab transition-all hover-translate-y-neg-px-2 active-scale-97 {dragIndex === i ? 'opacity-50 active-scale-97 cursor-grabbing' : ''}"
                    draggable="true"
                    ondragstart={() =>
                        dragStart(i)
                    }
                    ondragover={dragOver}
                    ondrop={() =>
                        drop(i)
                    }
                >

                    <div
                        class="drag-icon text-accent flex items-center"
                    >

                        <span
                            class="material-symbols-rounded"
                        >
                            drag_indicator
                        </span>

                    </div>

                    <div
                        class="text flex-1 text-base"
                    >

                        {item}

                    </div>

                </div>

            {/each}

        </div>

        <button
            class="check w-full mt-5 p-4 border-none rounded-xl bg-accent text-accent-content font-bold flex items-center justify-center gap-2 transition-all active-scale-98 cursor-pointer"
            onclick={check}
        >

            <span
                class="material-symbols-rounded"
            >
                task_alt
            </span>

            CEK URUTAN

        </button>

    {/if}

</div>
