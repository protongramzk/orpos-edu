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

    let round =
        $derived(
            rounds[current]
        );

    let list =
        $state([]);

    // =====================

    function shuffle(arr){

        return [...arr]
        .sort(
            () =>
            Math.random() - 0.5
        );

    }

    // =====================

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

    function moveUp(i){

        if(i === 0)
            return;

        [list[i-1],list[i]]
        =
        [list[i],list[i-1]];

        list = [...list];
    }

    function moveDown(i){

        if(
            i === list.length-1
        )
            return;

        [list[i+1],list[i]]
        =
        [list[i],list[i+1]];

        list = [...list];
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

    </div>

    {#if round}

        <div class="clue">

            {round.clue}

        </div>

        <div class="list">

            {#each list as item, i}

                <div class="card">

                    <div
                        class="text"
                    >

                        {item}

                    </div>

                    <div
                        class="actions"
                    >

                        <button
                            onclick={() =>
                            moveUp(i)}
                        >
                            ▲
                        </button>

                        <button
                            onclick={() =>
                            moveDown(i)}
                        >
                            ▼
                        </button>

                    </div>

                </div>

            {/each}

        </div>

        <button
            class="check"
            onclick={check}
        >

            CEK URUTAN

        </button>

    {/if}

</div>

<style>

.root{

    min-height:100vh;

    background:#111;

    color:white;

    padding:16px;

    box-sizing:border-box;
}

.topbar{

    display:flex;

    gap:12px;

    align-items:center;

    margin-bottom:20px;
}

.back{

    width:50px;

    height:50px;

    border:none;

    background:var(--accent);

    color:var(--accent-text);
}

.title{

    font-size:28px;

    font-weight:bold;

    color:var(--accent);
}

.clue{

    background:#1b1b1b;

    padding:16px;

    margin-bottom:16px;

    border-left:5px solid
    var(--accent);
}

.list{

    display:flex;

    flex-direction:column;

    gap:10px;
}

.card{

    display:flex;

    justify-content:
    space-between;

    align-items:center;

    background:#1c1c1c;

    padding:14px;
}

.actions{

    display:flex;

    gap:6px;
}

.actions button{

    width:40px;

    height:40px;

    border:none;

    background:
    var(--accent);

    color:
    var(--accent-text);
}

.check{

    width:100%;

    margin-top:16px;

    padding:16px;

    border:none;

    background:
    var(--accent);

    color:
    var(--accent-text);

    font-weight:bold;
}

</style>
