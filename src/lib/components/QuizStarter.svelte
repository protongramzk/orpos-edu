<script>
  // 1. Ganti createEventDispatcher dengan Callback Prop (Snippet/Props destructuring)
  // Kita asumsikan komponen ini menerima fungsi `onstart` dari parent-nya.
  let { onstart } = $props();

  // 2. Ubah let biasa menjadi $state() rune
  let rawInput = $state("");
  let timeLimit = $state(0); // 0 = infinite
  let shuffle = $state(false);
  let repeat = $state(false);

  function parseQuiz(input) {
    try {
      return JSON.parse(input);
    } catch (e) {
      alert("Format JSON salah bro 😵");
      return null;
    }
  }

  function startQuiz() {
    const data = parseQuiz(rawInput);
    if (!data) return;

    const payload = {
      title: data.title || "Quiz",
      questions: data[1] || data.questions || [],
      settings: {
        timeLimit,
        shuffle,
        // Di Svelte 5, state yang dibaca di sini otomatis mengambil nilai ter-update
        repeat: timeLimit > 0 ? repeat : false
      }
    };

    // 3. Panggil langsung fungsinya layaknya fungsi JavaScript biasa
    if (onstart) onstart(payload);
  }

  async function copyTemplate() {
    const template = {
      title: "Quiz Title",
      questions: [
        { q: "Pertanyaan?", a: ["A", "B", "C", "D"], t: 0 }
      ]
    };

    await navigator.clipboard.writeText(JSON.stringify(template, null, 2));
    alert("Template disalin 🔥");
  }
</script>

<div class="p-5 bg-card rounded-xl flex flex-col gap-4">

  <button class="bg-accent text-accent-content p-4 rounded-lg cursor-pointer active-scale-95 flex items-center gap-2"
    onclick={copyTemplate}>
    <span class="material-icons">content_copy</span>
    Copy Header Prompt
  </button>

  <textarea
    class="w-full h-20 bg-input text-white p-4 rounded-lg border-none"
    placeholder='Paste'
    bind:value={rawInput}
  />

  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <span>Waktu: {timeLimit}s</span>
      <span class="text-muted">0 = infinite</span>
    </div>
    <input
      type="range"
      min="0"
      max="600"
      bind:value={timeLimit}
      class="w-full"
    />
  </div>

  <label class="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" bind:checked={shuffle} />
    Acak urutan soal
  </label>

  <label class="flex items-center gap-2 cursor-pointer {timeLimit === 0 ? 'opacity-45 pointer-events-none' : ''}">
    <input type="checkbox" bind:checked={repeat} disabled={timeLimit === 0} />
    Ulang sampai waktu habis
  </label>

  <button
    class="bg-success text-white p-4 rounded-lg font-bold active-scale-95 flex items-center justify-center gap-2"
    onclick={startQuiz}
  >
    <span class="material-icons">play_arrow</span>
    Start Quiz
  </button>

</div>
