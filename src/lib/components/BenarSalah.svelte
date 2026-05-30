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

<div class="empty">

    LEVEL TIDAK DITEMUKAN

</div>

{:else}

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

        <div>

            ❤️ {currentLife}

        </div>

    </div>

    <div class="score">

        Skor:
        {score.toFixed(1)}

    </div>

    <div class="progress">

        <div
            class="fill"
            style:width={`${progress}%`}
        ></div>

    </div>

    <div class="question">

        {soal?.q}

    </div>

    <div class="buttons">

        <button
            class="btn benar"
            onclick={() =>
                answer(true)
            }
        >
            BENAR
        </button>

        <button
            class="btn salah"
            onclick={() =>
                answer(false)
            }
        >
            SALAH
        </button>

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

}

.topbar{

    display:flex;

    gap:12px;

    align-items:center;

}

.back{

    width:48px;

    height:48px;

    border:none;

    background:var(--accent);

    color:var(--accent-text);

}

.title{

    flex:1;

    color:var(--accent);

    font-size:24px;

    font-weight:bold;

}

.score{

    margin-top:16px;

}

.progress{

    margin-top:12px;

    height:10px;

    background:#222;

}

.fill{

    height:100%;

    background:var(--accent);

}

.question{

    margin-top:24px;

    padding:20px;

    background:#1b1b1b;

    border-left:5px solid
    var(--accent);

    font-size:24px;

}

.buttons{

    margin-top:24px;

    display:grid;

    grid-template-columns:
    1fr 1fr;

    gap:12px;

}

.btn{

    border:none;

    padding:20px;

    color:white;

    font-weight:bold;

    cursor:pointer;

}

.benar{

    background:#1f6d43;

}

.salah{

    background:#8a2d2d;

}

.empty{

    min-height:100vh;

    display:flex;

    justify-content:center;

    align-items:center;

    background:#111;

    color:white;

}

</style>
