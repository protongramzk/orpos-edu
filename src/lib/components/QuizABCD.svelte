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

<div class="empty">

    LEVEL TIDAK DITEMUKAN

</div>

{:else if total === 0}

<div class="empty">

    LEVEL INI BELUM PUNYA SOAL

</div>

{:else}

<div class="root">

    <!-- TOP -->

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

        <div class="life">

            ❤️ {currentLife}

        </div>

    </div>

    <!-- SCORE -->

    <div class="score">

        Skor:
        {score.toFixed(1)}

    </div>

    <!-- PROGRESS -->

    <div class="progress">

        <div
            class="fill"
            style:width={`${progress}%`}
        ></div>

    </div>

    <div class="counter">

        Soal
        {current + 1}
        /
        {total}

    </div>

    <!-- QUESTION -->

    <div class="question">

        {soal.q}

    </div>

    <!-- OPTIONS -->

    <div class="options">

        {#each soal.a as answer, i}

            <button

                class="
                    option
                    {selected === i && i === soal.t ? 'correct' : ''}
                    {selected === i && i !== soal.t ? 'wrong' : ''}
                    {removed[i] ? 'removed' : ''}
                "

                onclick={() =>
                    choose(i)
                }

            >

                <div class="letter">

                    {
                        ["A","B","C","D"][i]
                    }

                </div>

                <div class="text">

                    {answer}

                </div>

            </button>

        {/each}

    </div>

</div>

{/if}

<style>

.root{

    min-height:100vh;

    background:#111;

    color:white;

    padding:16px;

    box-sizing:border-box;

    font-family:sans-serif;

}

.topbar{

    display:flex;

    align-items:center;

    gap:12px;

}

.back{

    border:none;

    background:var(--accent);

    color:var(--accent-text);

    width:48px;

    height:48px;

    cursor:pointer;

}

.title{

    flex:1;

    font-size:24px;

    font-weight:bold;

    color:var(--accent);

}

.life{

    font-weight:bold;

}

.score{

    margin-top:12px;

}

.progress{

    margin-top:12px;

    height:10px;

    background:#222;

}

.fill{

    height:100%;

    background:var(--accent);

    transition:0.2s;

}

.counter{

    margin-top:8px;

    color:#999;

}

.question{

    margin-top:20px;

    padding:18px;

    background:#1b1b1b;

    border-left:5px solid var(--accent);

    font-size:24px;

    font-weight:bold;

}

.options{

    margin-top:20px;

    display:flex;

    flex-direction:column;

    gap:10px;

}

.option{

    border:none;

    background:#222;

    color:white;

    display:flex;

    gap:14px;

    padding:14px;

    cursor:pointer;

    text-align:left;

}

.letter{

    width:40px;

    height:40px;

    background:var(--accent);

    color:var(--accent-text);

    display:flex;

    align-items:center;

    justify-content:center;

    font-weight:bold;

}

.text{

    flex:1;

    display:flex;

    align-items:center;

}

.correct{

    background:#1f6d43;
}

.wrong{

    background:#8a2d2d;
}

.removed{

    opacity:.25;

    pointer-events:none;

}

.empty{

    min-height:100vh;

    display:flex;

    align-items:center;

    justify-content:center;

    background:#111;

    color:white;

    font-family:sans-serif;

}

</style>
