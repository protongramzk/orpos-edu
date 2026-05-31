<script>

    let {
        level = null,
        judul = "ABC QUIZ",
        life = 3,
        onWin = () => {},
        onExit = () => {}
    } = $props();

    // =========================
    // DATA
    // =========================

    let questions = $derived(
        level?.questions ?? []
    );

    // =========================
    // STATE
    // =========================

    let current = $state(0);

    let score = $state(0);

    let currentLife = $state(life);

    let selected = $state(-1);

    let locked = $state(false);

    let removed = $state({});

    let questionScore = $state(0);

    // =========================
    // DERIVED
    // =========================

    let total = $derived(
        questions.length
    );

    let soal = $derived(
        questions[current]
    );

    let scorePerQuestion = $derived(
        total > 0
            ? 100 / total
            : 0
    );

    let progress = $derived(
        total > 0
            ? ((current) / total) * 100
            : 0
    );

    // =========================
    // RESET PER SOAL
    // =========================

    $effect(() => {

        current;

        questionScore =
            scorePerQuestion;

        selected = -1;

        removed = {};

        locked = false;

    });

    // =========================
    // ANSWER
    // =========================

    async function choose(i) {

        if (!soal) return;

        if (locked) return;

        if (removed[i]) return;

        locked = true;

        selected = i;

        const benar =
            i === soal.t;

        await wait(250);

        // =====================
        // SALAH
        // =====================

        if (!benar) {

            currentLife--;

            questionScore -=
                scorePerQuestion /
                soal.a.length;

            if (
                questionScore < 0
            ) {
                questionScore = 0;
            }

            removed[i] = true;

            removed = {
                ...removed
            };

            selected = -1;

            locked = false;

            if (
                currentLife <= 0
            ) {

                onExit();

            }

            return;
        }

        // =====================
        // BENAR
        // =====================

        score += questionScore;

        await wait(300);

        current++;

        if (
            current >= total
        ) {

            onWin(
                Number(
                    score.toFixed(1)
                )
            );

            return;
        }

        locked = false;

    }

    function wait(ms) {

        return new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    ms
                )
        );

    }

</script>

{#if !level}

<div class="empty min-h-screen flex items-center justify-center bg-dark text-white">

    LEVEL TIDAK DITEMUKAN

</div>

{:else if total === 0}

<div class="empty min-h-screen flex items-center justify-center bg-dark text-white">

    LEVEL INI BELUM PUNYA SOAL

</div>

{:else}

<div class="root min-h-screen bg-dark text-white p-4">

    <!-- TOP -->

    <div class="topbar flex items-center gap-3">

        <button
            class="back border-none bg-accent text-accent-content w-12 h-12 cursor-pointer"
            onclick={onExit}
        >
            ←
        </button>

        <div class="title flex-1 text-2xl font-bold text-accent">

            {judul}

        </div>

        <div class="life font-bold">

            ❤️ {currentLife}

        </div>

    </div>

    <!-- SCORE -->

    <div class="score mt-3">

        Skor:
        {score.toFixed(1)}

    </div>

    <!-- PROGRESS -->

    <div class="progress mt-3 progress-bar">

        <div
            class="fill progress-fill"
            style:width={`${progress}%`}
        ></div>

    </div>

    <div class="counter mt-2 text-gray">

        Soal
        {current + 1}
        /
        {total}

    </div>

    <!-- QUESTION -->

    <div class="question mt-5 p-4 bg-card border-l-5 text-2xl font-bold">

        {soal.q}

    </div>

    <!-- OPTIONS -->

    <div class="options mt-5 flex flex-col gap-10">

        {#each soal.a as answer, i}

            <button

                class="
                    option
                    border-none
                    bg-input
                    text-white
                    flex
                    gap-14
                    p-4
                    cursor-pointer
                    text-left
                    {selected === i && i === soal.t ? 'bg-success' : ''}
                    {selected === i && i !== soal.t ? 'bg-danger' : ''}
                    {removed[i] ? 'opacity-25 pointer-events-none' : ''}
                "

                onclick={() =>
                    choose(i)
                }

            >

                <div class="letter w-10 h-10 bg-accent text-accent-content flex items-center justify-center font-bold">

                    {
                        ["A","B","C","D"][i]
                    }

                </div>

                <div class="text flex-1 flex items-center">

                    {answer}

                </div>

            </button>

        {/each}

    </div>

</div>

{/if}
