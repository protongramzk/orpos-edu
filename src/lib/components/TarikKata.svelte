<script>

    let {
        level,
        judul = "TARIK KATA",
        onWin = () => {},
        onExit = () => {}
    } = $props();

    let pairs =
        level?.pairs ?? [];

    let left = $state([]);
    let right = $state([]);

    let selected =
        $state(null);

    let matched =
        $state([]);

    $effect(() => {

        if(!pairs.length)
            return;

        left =
            pairs.map(
                p => p[0]
            );

        right =
            [...pairs]
            .map(
                p => p[1]
            )
            .sort(
                () =>
                Math.random()-0.5
            );

    });

    function chooseLeft(i){

        selected = i;
    }

    function chooseRight(i){

        if(selected === null)
            return;

        const leftWord =
            left[selected];

        const original =
            pairs.find(
                p =>
                p[0] === leftWord
            );

        if(
            original &&
            original[1] === right[i]
        ){

            matched.push(
                selected
            );

            matched = [
                ...matched
            ];

            if(
                matched.length ===
                pairs.length
            ){
                onWin(100);
            }
        }

        selected = null;
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

    <div class="grid">

        <div class="column">

            {#each left as item, i}

                <button

                    class="
                        card
                        {selected===i
                            ? 'selected'
                            : ''}
                        {matched.includes(i)
                            ? 'done'
                            : ''}
                    "

                    onclick={() =>
                        chooseLeft(i)
                    }

                >

                    {item}

                </button>

            {/each}

        </div>

        <div class="column">

            {#each right as item, i}

                <button

                    class="card"

                    onclick={() =>
                        chooseRight(i)
                    }

                >

                    {item}

                </button>

            {/each}

        </div>

    </div>

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

    color:var(--accent);

    font-weight:bold;
}

.grid{

    display:grid;

    grid-template-columns:
        1fr 1fr;

    gap:16px;
}

.column{

    display:flex;

    flex-direction:column;

    gap:10px;
}

.card{

    border:none;

    background:#1c1c1c;

    color:white;

    padding:16px;

    text-align:center;

    cursor:pointer;

    min-height:60px;
}

.selected{

    border:3px solid
    var(--accent);
}

.done{

    opacity:.35;

    pointer-events:none;
}

</style>
