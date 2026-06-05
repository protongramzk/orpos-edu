<script>
  // 1. Menggunakan $props() untuk input komponen
  let { title = "Quiz", questions = [], settings = { timeLimit: 0, shuffle: false, repeat: false } } = $props();

  // 2. State management dengan $state()
  let index = $state(0);
  let score = $state(0);
  let wrong = $state(0);
  let time = $state(settings.timeLimit);
  let state = $state("idle"); // idle | answer | end
  let selected = $state(null);
  let showCorrect = $state(false);
  let batch = $state(1);

  let timer = null;

  function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function getQuestions() {
    return settings.shuffle ? shuffleArray(questions) : [...questions];
  }

  let pool = $state(getQuestions());

  // 3. Menggunakan $effect untuk menggantikan onMount & onDestroy
  $effect(() => {
    if (settings.timeLimit > 0) {
      timer = setInterval(() => {
        time--;
        if (time <= 0) endQuiz();
      }, 1000);
    }
    
    // Cleanup function otomatis dijalankan saat komponen unmount atau effect rerun
    return () => clearInterval(timer);
  });

  // 4. $derived untuk reaktivitas turunan (gantinya $: total = ...)
  let total = $derived(score + wrong);
  let percent = $derived(total ? Math.round((score / total) * 100) : 0);
  let currentQ = $derived(pool[index]);

  function pick(i) {
    if (state !== "idle") return;

    selected = i;
    state = "answer";
    showCorrect = true;

    if (i === currentQ.t) {
      score++;
    } else {
      wrong++;
    }

    setTimeout(() => {
      next();
    }, 350);
  }

  function next() {
    selected = null;
    showCorrect = false;
    state = "idle";
    index++;

    if (index >= pool.length) {
      if (settings.repeat && settings.timeLimit > 0) {
        index = 0;
        pool = settings.shuffle ? shuffleArray(questions) : [...questions];
        batch++;
      } else {
        endQuiz();
      }
    }
  }

  function endQuiz() {
    state = "end";
    clearInterval(timer);
  }

  function reset() {
    index = 0;
    score = 0;
    wrong = 0;
    batch = 1;
    pool = getQuestions();
    time = settings.timeLimit;
    state = "idle";
  }
</script>

{#if state !== "end"}
  <div class="p-5 bg-dark min-h-screen flex flex-col gap-4">
    <div class="flex justify-between items-center bg-card p-4 rounded-lg">
      <div class="font-bold text-xl">{title}</div>
      <div class="flex gap-4 items-center">
        <div>✔ {score}</div>
        <div>✖ {wrong}</div>
        {#if settings.timeLimit > 0}
          <div class="text-accent">
            <span class="material-icons">timer</span>
            {time}s
          </div>
        {/if}
      </div>
    </div>

    <div class="bg-card p-5 rounded-xl text-2xl font-bold animate-success">
      {currentQ?.q}
    </div>

    <div class="grid gap-3">
      {#each currentQ?.a as ans, i}
        <button
          class="p-4 rounded-lg text-left transition-all active-scale-95
          {showCorrect && i === currentQ.t ? 'bg-success text-white' : ''}
          {selected === i && i !== currentQ.t ? 'bg-danger text-white animate-shake' : 'bg-card hover-bg-hover'}"
          onclick={() => pick(i)}
        >
          <span class="material-icons text-sm">radio_button_unchecked</span>
          {ans}
        </button>
      {/each}
    </div>
  </div>
{:else}
  <div class="p-5 min-h-screen flex flex-col justify-center items-center gap-4 bg-dark">
    <div class="text-4xl font-bold">Hasil Quiz 🎯</div>
    <div class="bg-card p-5 rounded-xl w-full max-w-md flex flex-col gap-2">
      <div>Benar: {score}</div>
      <div>Salah: {wrong}</div>
      <div>Nilai: {percent}/100</div>
      <div>Batch: {batch}</div>
      <div>Time: {settings.timeLimit > 0 ? settings.timeLimit + "s" : "∞"}</div>
    </div>
    <button
      class="bg-accent text-white p-4 rounded-lg active-scale-95 flex items-center gap-2"
      onclick={reset}
    >
      <span class="material-icons">replay</span>
      Back / Restart
    </button>
  </div>
{/if}
