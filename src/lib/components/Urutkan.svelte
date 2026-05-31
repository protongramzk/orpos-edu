
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

<div class="root">

    <div class="topbar">

        <button
            class="icon-btn"
            onclick={onExit}
        >
            <span
                class="material-symbols-rounded"
            >
                arrow_back
            </span>
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

                <div
                    class:dragging={
                        dragIndex === i
                    }
                    class="card"
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
                        class="drag-icon"
                    >

                        <span
                            class="material-symbols-rounded"
                        >
                            drag_indicator
                        </span>

                    </div>

                    <div
                        class="text"
                    >

                        {item}

                    </div>

                </div>

            {/each}

        </div>

        <button
            class="check"
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

.icon-btn{

    width:52px;
    height:52px;
    border:none;
    border-radius:16px;
    background:var(--accent);
    color:var(--accent-text);

    display:flex;
    align-items:center;
    justify-content:center;

    transition:.2s;

}

.icon-btn:active{

    transform:scale(.92);

}

.title{

    font-size:28px;
    font-weight:bold;
    color:var(--accent);

}

.clue{

    background:#1b1b1b;
    padding:16px;
    border-radius:16px;
    margin-bottom:18px;
    border-left:5px solid
    var(--accent);

}

.list{

    display:flex;
    flex-direction:column;
    gap:12px;

}

.card{

    display:flex;
    align-items:center;
    gap:12px;

    background:#1c1c1c;

    padding:16px;

    border-radius:18px;

    cursor:grab;

    transition:
        transform .25s,
        opacity .25s,
        box-shadow .25s;

}

.card:hover{

    transform:
        translateY(-2px);

}

.card:active{

    cursor:grabbing;

}

.dragging{

    opacity:.5;

    transform:
        scale(.97);

}

.drag-icon{

    color:var(--accent);

    display:flex;

    align-items:center;

}

.text{

    flex:1;

    font-size:16px;

}

.check{

    width:100%;

    margin-top:18px;

    padding:16px;

    border:none;

    border-radius:18px;

    background:
    var(--accent);

    color:
    var(--accent-text);

    font-weight:bold;

    display:flex;

    align-items:center;

    justify-content:center;

    gap:8px;

    transition:.2s;

}

.check:active{

    transform:scale(.98);

}

.material-symbols-rounded{

    font-size:24px;

}

</style>
