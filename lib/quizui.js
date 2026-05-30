/*
========================================
QUIZ UI ENGINE
Reusable Phaser Quiz Framework
========================================
*/

class QuizUI {

  constructor(options = {}) {

    this.options = {

      canvasId: "game",

      width: 450,
      height: 800,

      backgroundColor: 0x05090a,

      questionPerPage: 1,

      passingScore: 0.7,

      title: "QuizUI",

      ...options
    };

    this.data = options.data || [];

    this.onWin =
      options.onWin || (() => {});

    this.onLose =
      options.onLose || (() => {});

    this.onAnswer =
      options.onAnswer || (() => {});

    this.currentIndex = 0;

    this.isLocked = false;

    this.finished = false;

    this.stats = {
      answered: 0,
      correct: 0,
      wrong: 0
    };

    // =========================
    // ACCENT
    // =========================

    this.accent =
      getComputedStyle(
        document.documentElement
      )
      .getPropertyValue("--accent")
      .trim() || "#7fffd4";

    this.colors = {

      accent:
        Phaser.Display.Color.HexStringToColor(
          this.accent
        ).color,

      accentSoft:
        Phaser.Display.Color.HexStringToColor(
          this.hexAlpha(this.accent, 0.18)
        ).color,

      accentDark:
        Phaser.Display.Color.HexStringToColor(
          this.hexDarken(this.accent, 0.7)
        ).color,

      green: 0x00c853,

      red: 0xff1744,

      bg: 0x05090a,

      panel: 0x0d1416
    };

    this.createGame();
  }

  // =========================
  // GAME
  // =========================

  createGame() {

    const self = this;

    class QuizScene extends Phaser.Scene {

      constructor() {
        super("QuizScene");
      }

      create() {

        self.scene = this;

        self.boot();
      }
    }

    this.game = new Phaser.Game({

      type: Phaser.AUTO,

      parent: this.options.canvasId,

      backgroundColor:
        this.options.backgroundColor,

      render: {
        antialias: true
      },

      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter:
          Phaser.Scale.CENTER_BOTH,
        width: this.options.width,
        height: this.options.height
      },

      scene: QuizScene
    });
  }

  // =========================
  // BOOT
  // =========================

  boot() {

    this.width =
      this.scene.scale.width;

    this.height =
      this.scene.scale.height;

    this.drawBackground();

    this.createTitle();

    this.createStats();

    this.createQuestion();

    this.createButtons();

    this.updateStats();

    this.loadQuestion();

    this.scene.scale.on(
      "resize",
      this.resize,
      this
    );

    this.scene.cameras.main.fadeIn(500);
  }

  // =========================
  // BACKGROUND
  // =========================

  drawBackground() {

    const g =
      this.scene.add.graphics();

    g.lineStyle(
      1,
      this.colors.accent,
      0.05
    );

    for (
      let x = 0;
      x < this.width;
      x += 40
    ) {

      g.moveTo(x, 0);
      g.lineTo(x, this.height);
    }

    for (
      let y = 0;
      y < this.height;
      y += 40
    ) {

      g.moveTo(0, y);
      g.lineTo(this.width, y);
    }

    g.strokePath();
  }

  // =========================
  // TITLE
  // =========================

  createTitle() {

    this.title =
      this.scene.add.text(
        this.width / 2,
        50,
        this.options.title,
        {
          fontFamily: "Arial",

          fontSize: "34px",

          fontStyle: "bold",

          color: this.accent
        }
      )
      .setOrigin(0.5);
  }

  // =========================
  // STATS
  // =========================

  createStats() {

    this.statsPanel =
      this.scene.add.rectangle(
        this.width / 2,
        110,
        this.width - 40,
        50,
        this.colors.panel
      )
      .setStrokeStyle(
        2,
        this.colors.accent,
        0.3
      );

    this.statsText =
      this.scene.add.text(
        this.width / 2,
        110,
        "",
        {
          fontFamily: "Arial",

          fontSize: "20px",

          color: this.accent
        }
      )
      .setOrigin(0.5);
  }

  // =========================
  // QUESTION
  // =========================

  createQuestion() {

    this.questionPanel =
      this.scene.add.rectangle(
        this.width / 2,
        220,
        this.width - 40,
        130,
        this.colors.panel
      )
      .setStrokeStyle(
        2,
        this.colors.accent,
        0.25
      );

    this.questionText =
      this.scene.add.text(
        this.width / 2,
        220,
        "",
        {
          fontFamily: "Arial",

          fontSize: "30px",

          color: "#ffffff",

          align: "center",

          wordWrap: {
            width: this.width - 100
          }
        }
      )
      .setOrigin(0.5);
  }

  // =========================
  // BUTTONS
  // =========================

  createButtons() {

    this.buttons = [];

    for (let i = 0; i < 10; i++) {

      const y = 360 + i * 80;

      const bg =
        this.scene.add.rectangle(
          this.width / 2,
          y,
          this.width - 60,
          62,
          this.colors.accentDark
        );

      bg
        .setStrokeStyle(
          2,
          this.colors.accent,
          0.4
        )
        .setInteractive();

      const txt =
        this.scene.add.text(
          this.width / 2,
          y,
          "",
          {
            fontFamily: "Arial",

            fontSize: "24px",

            color: "#ffffff",

            align: "center",

            wordWrap: {
              width: this.width - 120
            }
          }
        )
        .setOrigin(0.5);

      bg.on("pointerover", () => {

        if (this.isLocked) return;

        bg.setFillStyle(
          this.colors.accentSoft
        );

        this.scene.tweens.add({
          targets: bg,
          scaleX: 1.02,
          scaleY: 1.02,
          duration: 100
        });
      });

      bg.on("pointerout", () => {

        if (this.isLocked) return;

        bg.setFillStyle(
          this.colors.accentDark
        );

        this.scene.tweens.add({
          targets: bg,
          scaleX: 1,
          scaleY: 1,
          duration: 100
        });
      });

      bg.on("pointerdown", () => {
        this.selectAnswer(i);
      });

      this.buttons.push({
        bg,
        txt
      });
    }
  }

  // =========================
  // LOAD QUESTION
  // =========================

  async loadQuestion() {

    this.isLocked = true;

    if (
      this.currentIndex >=
      this.data.length
    ) {

      this.finishQuiz();

      return;
    }

    this.current =
      this.data[this.currentIndex];

    this.questionText.setText(
      this.current.question
    );

    // hide unused buttons
    this.buttons.forEach((b, i) => {

      const exists =
        this.current.choices[i];

      b.bg.setVisible(!!exists);
      b.txt.setVisible(!!exists);

      if (!exists) return;

      b.bg.setFillStyle(
        this.colors.accentDark
      );

      b.bg.setStrokeStyle(
        2,
        this.colors.accent,
        0.4
      );

      b.bg.setScale(1);

      b.txt.setText(
        this.current.choices[i]
      );
    });

    await this.animateQuestion();

    this.isLocked = false;
  }

  // =========================
  // ANIMATION
  // =========================

  async animateQuestion() {

    this.scene.tweens.add({

      targets: [
        this.questionText,
        ...this.buttons.map(
          b => b.bg
        ),
        ...this.buttons.map(
          b => b.txt
        )
      ],

      alpha: {
        from: 0,
        to: 1
      },

      duration: 260
    });

    return new Promise(r =>
      setTimeout(r, 280)
    );
  }

  // =========================
  // SELECT
  // =========================

  async selectAnswer(index) {

    if (this.isLocked) return;

    this.isLocked = true;

    const correct =
      index === this.current.answer;

    const selected =
      this.buttons[index];

    const trueButton =
      this.buttons[
        this.current.answer
      ];

    this.stats.answered++;

    if (correct) {

      this.stats.correct++;

      selected.bg.setFillStyle(
        this.colors.green
      );

      this.scene.tweens.add({

        targets: selected.bg,

        scaleX: 1.05,

        scaleY: 1.05,

        duration: 150,

        yoyo: true
      });

    } else {

      this.stats.wrong++;

      selected.bg.setFillStyle(
        this.colors.red
      );

      trueButton.bg.setFillStyle(
        this.colors.green
      );

      this.scene.tweens.add({

        targets: selected.bg,

        x: selected.bg.x - 10,

        duration: 45,

        repeat: 5,

        yoyo: true
      });
    }

    this.onAnswer({
      correct,
      current: this.current
    });

    this.updateStats();

    await new Promise(r =>
      setTimeout(r, 1000)
    );

    this.currentIndex++;

    await this.loadQuestion();
  }

  // =========================
  // STATS UPDATE
  // =========================

  updateStats() {

    this.statsText.setText(
      `DONE ${this.stats.answered}/${this.data.length}   TRUE ${this.stats.correct}   FALSE ${this.stats.wrong}`
    );

    this.scene.tweens.add({

      targets: this.statsPanel,

      scaleX: 1.02,

      scaleY: 1.02,

      duration: 120,

      yoyo: true
    });
  }

  // =========================
  // FINISH
  // =========================

  finishQuiz() {

    this.finished = true;

    const score =
      this.stats.correct /
      this.data.length;

    const win =
      score >=
      this.options.passingScore;

    this.questionPanel.setFillStyle(
      win ? 0x001d12 : 0x220011
    );

    this.questionPanel.setStrokeStyle(
      3,
      win
        ? this.colors.green
        : this.colors.red,
      0.7
    );

    this.questionText.setText(
`${win ? "QUIZ COMPLETE" : "QUIZ FAILED"}

SCORE ${Math.round(score * 100)}%

TRUE ${this.stats.correct}
FALSE ${this.stats.wrong}`
    );

    this.questionText.setStyle({

      fontSize: "34px",

      align: "center",

      color:
        win
        ? "#00ff99"
        : "#ff5577"
    });

    this.buttons.forEach(b => {

      b.bg.setVisible(false);
      b.txt.setVisible(false);
    });

    this.scene.tweens.add({

      targets: this.questionPanel,

      scaleX: 1.03,

      scaleY: 1.03,

      duration: 900,

      yoyo: true,

      repeat: -1
    });

    if (win) {

      this.onWin(this.stats);

    } else {

      this.onLose(this.stats);
    }
  }

  // =========================
  // RESIZE
  // =========================

  resize(gameSize) {

    this.width = gameSize.width;

    this.height = gameSize.height;
  }

  // =========================
  // HELPERS
  // =========================

  hexDarken(hex, factor = 0.7) {

    let c =
      Phaser.Display.Color.HexStringToColor(
        hex
      );

    c.red *= factor;
    c.green *= factor;
    c.blue *= factor;

    return Phaser.Display.Color.RGBToString(
      c.red,
      c.green,
      c.blue,
      0,
      "#"
    );
  }

  hexAlpha(hex) {
    return hex;
  }

  // =========================
  // PUBLIC API
  // =========================

  next() {

    this.currentIndex++;

    this.loadQuestion();
  }

  reset() {

    this.currentIndex = 0;

    this.stats = {
      answered: 0,
      correct: 0,
      wrong: 0
    };

    this.finished = false;

    this.updateStats();

    this.loadQuestion();
  }

  destroy() {

    this.game.destroy(true);
  }

  getStats() {

    return this.stats;
  }
}