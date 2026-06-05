<script>
  import QuizStarter from "$lib/components/QuizStarter.svelte";
  import QuizPlayer from "$lib/components/QuizPlayer.svelte";

  // Gunakan $state untuk reaktivitas Svelte 5
  let quizData = $state(null);

  // Fungsi callback untuk menerima data dari QuizStarter
  function handleStart(payload) {
    quizData = payload;
  }

  // Fungsi untuk kembali ke menu
  function handleBack() {
    quizData = null;
  }
</script>

<div class="min-h-screen bg-dark text-white">

  {#if !quizData}
    <!-- 
      Kirimkan handleStart sebagai callback prop. 
      Nggak perlu lagi pakai on:start
    -->
    <QuizStarter onstart={handleStart} />
  {:else}
    <!-- PLAYER MODE -->
    <QuizPlayer
      title={quizData.title}
      questions={quizData.questions}
      settings={quizData.settings}
    />

    <!-- Floating back button -->
    <button
      class="fixed bottom-5 right-5 bg-card p-3 rounded-full shadow-lg active-scale-95 cursor-pointer z-50"
      onclick={handleBack}
      title="Back to menu"
    >
      <span class="material-icons">arrow_back</span>
    </button>
  {/if}

</div>
