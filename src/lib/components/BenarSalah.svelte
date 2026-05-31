<script>

    let {
        level,
        judul = "BENAR SALAH",
        life = 3,
        onWin = () => {},
        onExit = () => {}
    } = $props();

    let questions = $derived(
        level?.questions ?? []
    );

    let current = $state(0);

    let score = $state(0);

    let currentLife = $state(life);

    let locked = $state(false);

    let soal = $derived(
        questions[current]
    );

    let scorePerQuestion = $derived(
        questions.length
            ? 100 / questions.length
            : 0
    );

    let progress = $derived(
        questions.length
            ? current / questions.length * 100
            : 0
    );

    async function answer(v){

        if(locked) return;

        locked = true;

        const benar =
            v === soal.a;

        await wait(250);

        if(!benar){

            currentLife--;

            locked = false;

            if(currentLife <= 0){

                onExit();
            }

            return;
        }

        score += scorePerQuestion;

        current++;

        locked = false;

        if(current >= questions.length){

            onWin(
                Number(
                    score.toFixed(1)
                )
            );
        }
    }

    function wait(ms){

        return new Promise(
            r => setTimeout(r, ms)
        );
    }

</script>

{#if !level}

<div class="empty min-h-screen flex justify-center items-center bg-dark text-white">

    LEVEL TIDAK DITEMUKAN

</div>

{:else}

<div class="root min-h-screen bg-dark text-white p-4">

    <div class="topbar flex gap-3 items-center">

        <button
            class="back w-12 h-12 border-none bg-accent text-accent-content cursor-pointer"
            onclick={onExit}
        >
            ←
        </button>

        <div class="title flex-1 text-accent text-2xl font-bold">

            {judul}

        </div>

        <div>

            ❤️ {currentLife}

        </div>

    </div>

    <div class="score mt-4">

        Skor:
        {score.toFixed(1)}

    </div>

    <div class="progress mt-3 progress-bar">

        <div
            class="fill progress-fill"
            style:width={`${progress}%`}
        ></div>

    </div>

    <div class="question mt-6 p-5 bg-card border-l-5 text-2xl">

        {soal?.q}

    </div>

    <div class="buttons mt-6 grid grid-cols-2 gap-3">

        <button
            class="btn border-none p-5 text-white font-bold cursor-pointer bg-success"
            onclick={() =>
                answer(true)
            }
        >
            BENAR
        </button>

        <button
            class="btn border-none p-5 text-white font-bold cursor-pointer bg-danger"
            onclick={() =>
                answer(false)
            }
        >
            SALAH
        </button>

    </div>

</div>

{/if}
