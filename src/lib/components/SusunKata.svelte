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

<div class="root min-h-screen bg-dark text-white p-4">

    <div class="topbar flex gap-3 items-center">

        <button
            class="back w-12 h-12 border-none bg-accent text-accent-content cursor-pointer"
            onclick={onExit}
        >
            ←
        </button>

        <div class="title text-accent text-3xl font-bold">

            {judul}

        </div>

    </div>

    {#if item}

        <div class="progress mt-5 progress-bar">

            <div
                class="fill progress-fill"
                style:width={`${progress}%`}
            ></div>

        </div>

        <div class="clue mt-8 text-xl text-center">

            {item.clue}

        </div>

        <div class="letters mt-7 bg-card p-5 text-center text-4xl font-bold tracking-widest text-accent">

            {shuffled}

        </div>

        <input

            bind:value={answer}

            class="input w-full mt-5 p-4 bg-input border-none text-white"

            placeholder="Jawaban..."

            onkeydown={(e) =>
                e.key === "Enter"
                && submit()
            }

        />

        <button
            class="submit w-full mt-3 p-4 border-none bg-accent text-accent-content font-bold cursor-pointer"
            onclick={submit}
        >

            CEK

        </button>

    {/if}

</div>
