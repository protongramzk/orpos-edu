
<script>

    let {
        level,
        judul = "SUSUN KATA",
        onWin = () => {},
        onExit = () => {}
    } = $props();

    let words =
        level?.words ?? [];

    let current = $state(0);

    let answer = $state("");

    let score = $state(0);

    let item = $derived(
        words[current]
    );

    let shuffled = $derived.by(() => {

        if(!item) return "";

        return item.word
            .split("")
            .sort(() =>
                Math.random() - 0.5
            )
            .join("");

    });

    let progress = $derived(
        words.length
        ? current / words.length * 100
        : 0
    );

    function submit(){

        if(!item) return;

        if(
            answer
            .trim()
            .toUpperCase()
            !==
            item.word
        ){
            return;
        }

        score +=
            100 / words.length;

        answer = "";

        current++;

        if(
            current >= words.length
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

    {#if item}

        <div class="progress">

            <div
                class="fill"
                style:width={`${progress}%`}
            ></div>

        </div>

        <div class="clue">

            {item.clue}

        </div>

        <div class="letters">

            {shuffled}

        </div>

        <input

            bind:value={answer}

            class="input"

            placeholder="Jawaban..."

            onkeydown={(e) =>
                e.key === "Enter"
                && submit()
            }

        />

        <button
            class="submit"
            onclick={submit}
        >

            CEK

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
}

.back{

    width:50px;

    height:50px;

    border:none;

    background:var(--accent);

    color:var(--accent-text);
}

.title{

    color:var(--accent);

    font-size:28px;

    font-weight:bold;
}

.progress{

    margin-top:20px;

    height:10px;

    background:#222;
}

.fill{

    height:100%;

    background:var(--accent);
}

.clue{

    margin-top:30px;

    font-size:22px;

    text-align:center;
}

.letters{

    margin-top:25px;

    background:#1b1b1b;

    padding:20px;

    text-align:center;

    font-size:34px;

    font-weight:bold;

    letter-spacing:8px;

    color:var(--accent);
}

.input{

    width:100%;

    margin-top:20px;

    padding:16px;

    background:#222;

    border:none;

    color:white;

    box-sizing:border-box;
}

.submit{

    width:100%;

    margin-top:12px;

    padding:16px;

    border:none;

    background:var(--accent);

    color:var(--accent-text);

    font-weight:bold;
}

</style>
