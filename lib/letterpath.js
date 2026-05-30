/*
========================================
LETTER PATH ENGINE
Portable Phaser Word Puzzle Engine
========================================
Usage:

const game = new LetterPath({
  canvasId: 'game',

  matrix: [
    ['S',0,0],
    ['A','M','A'],
    ['H',0,0]
  ],

  accentColor: '#00ff88',

  onWordFound(word) {
    console.log('FOUND:', word);
  },

  onWin() {
    console.log('WIN 🔥');
  }
});

========================================
*/

class LetterPath {

  constructor(options = {}) {

    this.options = {

      width: 450,
      height: 800,

      backgroundColor: '#111111',

      accentColor:
        getComputedStyle(document.documentElement)
          .getPropertyValue('--accent')
          .trim() || '#4f46e5',

      wheelRadius: 95,

      gridCellSize: 58,

      gridSpacing: 8,

      allowShuffle: true,

      lineWidth: 6,

      debug: false,

      ...options
    };

    this.matrix = options.matrix || [];

    this.canvasId = options.canvasId || 'game';

    this.callbacks = {
      onReady: options.onReady || (() => {}),
      onWin: options.onWin || (() => {}),
      onLose: options.onLose || (() => {}),
      onWordFound: options.onWordFound || (() => {}),
      onWordWrong: options.onWordWrong || (() => {}),
      onStateChange: options.onStateChange || (() => {})
    };

    this.state = {
      foundWords: [],
      selectedLetters: [],
      isDragging: false
    };

    this.events = {};

    this.validWords =
      this.extractValidWords(this.matrix);

    this.wheelLetters =
      this.extractUniqueLetters(this.matrix);

    this.createGame();
  }

  // =========================
  // EVENT SYSTEM
  // =========================

  on(event, callback) {

    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(callback);
  }

  emit(event, data) {

    if (!this.events[event]) return;

    this.events[event].forEach(cb => cb(data));
  }

  // =========================
  // GAME INIT
  // =========================

  createGame() {

    const self = this;

    class MainScene extends Phaser.Scene {

      constructor() {
        super('MainScene');
      }

      create() {

        self.scene = this;

        self.boot(this);
      }
    }

    this.game = new Phaser.Game({

      type: Phaser.AUTO,

      parent: this.canvasId,

      backgroundColor:
        this.options.backgroundColor,

      render: {
        antialias: true,
        pixelArt: false,
        roundPixels: false
      },

      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: this.options.width,
        height: this.options.height
      },

      scene: MainScene
    });
  }

  // =========================
  // BOOT
  // =========================

  boot(scene) {

    this.scene = scene;

    this.gridCells = {};

    this.letterButtons = [];

    this.dragGraphics =
      scene.add.graphics();

    this.renderGrid();

    this.renderWheel();

    this.renderIndicator();

    this.setupInput();

    this.callbacks.onReady();

    this.emit('ready');
  }

  // =========================
  // WORD EXTRACTOR
  // =========================

  extractValidWords(matrix) {

    let words = [];

    const rows = matrix.length;
    const cols = matrix[0].length;

    // horizontal
    for (let r = 0; r < rows; r++) {

      let current = "";
      let coords = [];

      for (let c = 0; c < cols; c++) {

        if (matrix[r][c] !== 0) {

          current += matrix[r][c];

          coords.push({ r, c });

        } else {

          if (current.length > 1) {
            words.push({
              word: current,
              coords
            });
          }

          current = "";
          coords = [];
        }
      }

      if (current.length > 1) {
        words.push({
          word: current,
          coords
        });
      }
    }

    // vertical
    for (let c = 0; c < cols; c++) {

      let current = "";
      let coords = [];

      for (let r = 0; r < rows; r++) {

        if (matrix[r][c] !== 0) {

          current += matrix[r][c];

          coords.push({ r, c });

        } else {

          if (current.length > 1) {
            words.push({
              word: current,
              coords
            });
          }

          current = "";
          coords = [];
        }
      }

      if (current.length > 1) {
        words.push({
          word: current,
          coords
        });
      }
    }

    return words;
  }

  // =========================
  // UNIQUE LETTERS
  // =========================

  extractUniqueLetters(matrix) {

    const words =
      this.extractValidWords(matrix);

    let maxCounts = {};

    words.forEach(item => {

      let temp = {};

      for (let char of item.word) {
        temp[char] = (temp[char] || 0) + 1;
      }

      for (let char in temp) {

        maxCounts[char] = Math.max(
          maxCounts[char] || 0,
          temp[char]
        );
      }
    });

    let result = [];

    for (let char in maxCounts) {

      for (let i = 0; i < maxCounts[char]; i++) {
        result.push(char);
      }
    }

    return result;
  }

  // =========================
  // GRID
  // =========================

  renderGrid() {

    const scene = this.scene;

    const size =
      this.options.gridCellSize;

    const spacing =
      this.options.gridSpacing;

    const totalWidth =
      this.matrix[0].length * size +
      (this.matrix[0].length - 1) * spacing;

    const startX =
      (this.options.width - totalWidth) / 2;

    const startY = 90;

    this.matrix.forEach((row, r) => {

      row.forEach((char, c) => {

        if (char === 0) return;

        const x =
          startX +
          c * (size + spacing) +
          size / 2;

        const y =
          startY +
          r * (size + spacing) +
          size / 2;

        const bg =
          scene.add.rectangle(
            x,
            y,
            size,
            size,
            0x111111
          );

        bg.setStrokeStyle(2, 0xffffff);

        const text =
          scene.add.text(x, y, char, {

            fontFamily: 'Arial',

            fontSize: '30px',

            fontStyle: 'bold',

            color: '#ffffff'
          });

        text
          .setOrigin(0.5)
          .setAlpha(0)
          .setScale(0.5)
          .setResolution(window.devicePixelRatio);

        this.gridCells[`${r},${c}`] = {
          bg,
          text,
          char
        };
      });
    });
  }

  // =========================
  // WHEEL
  // =========================

  renderWheel() {

    const scene = this.scene;

    const cx =
      this.options.width / 2;

    const cy =
      this.options.height - 170;

    const radius =
      this.options.wheelRadius;

    this.wheelCenter = { x: cx, y: cy };

    scene.add.circle(
      cx,
      cy,
      radius + 20
    )
    .setStrokeStyle(2, 0xffffff, 0.15);

    this.drawWheelLetters();

    if (!this.options.allowShuffle) return;

    const shuffleBtn =
      scene.add.circle(
        cx + radius + 55,
        cy + 60,
        24,
        0x111111
      );

    shuffleBtn
      .setStrokeStyle(1, 0xffffff, 0.4)
      .setInteractive();

    const txt =
      scene.add.text(
        shuffleBtn.x,
        shuffleBtn.y,
        '🔄',
        {
          fontSize: '20px'
        }
      )
      .setOrigin(0.5);

    shuffleBtn.on('pointerdown', () => {

      this.resetSelection();

      Phaser.Utils.Array.Shuffle(
        this.wheelLetters
      );

      this.drawWheelLetters();
    });
  }

  drawWheelLetters() {

    this.letterButtons.forEach(btn => {
      btn.bg.destroy();
      btn.text.destroy();
    });

    this.letterButtons = [];

    const scene = this.scene;

    const count =
      this.wheelLetters.length;

    for (let i = 0; i < count; i++) {

      const angle =
        (i * (Math.PI * 2 / count))
        - Math.PI / 2;

      const x =
        this.wheelCenter.x +
        Math.cos(angle) *
        this.options.wheelRadius;

      const y =
        this.wheelCenter.y +
        Math.sin(angle) *
        this.options.wheelRadius;

      const bg =
        scene.add.circle(
          x,
          y,
          28,
          0x111111
        );

      bg
        .setStrokeStyle(
          2,
          0xffffff,
          0.22
        )
        .setInteractive();

      const text =
        scene.add.text(
          x,
          y,
          this.wheelLetters[i],
          {
            fontFamily: 'Arial',
            fontSize: '24px',
            fontStyle: 'bold',
            color: '#ffffff'
          }
        );

      text
        .setOrigin(0.5)
        .setResolution(
          window.devicePixelRatio
        );

      this.letterButtons.push({
        bg,
        text,
        letter: this.wheelLetters[i]
      });
    }
  }

  // =========================
  // INDICATOR
  // =========================

  renderIndicator() {

    this.indicator =
      this.scene.add.text(
        this.options.width / 2,
        this.wheelCenter.y -
        this.options.wheelRadius -
        70,
        '',
        {
          fontFamily: 'Arial',

          fontSize: '28px',

          fontStyle: 'bold',

          color: '#ffffff',

          letterSpacing: 4
        }
      );

    this.indicator
      .setOrigin(0.5)
      .setVisible(false)
      .setResolution(
        window.devicePixelRatio
      );
  }

  // =========================
  // INPUT
  // =========================

  setupInput() {

    const input = this.scene.input;

    input.on('pointerdown', pointer => {

      const hit =
        this.checkLetter(pointer);

      if (!hit) return;

      this.state.isDragging = true;

      this.selectLetter(hit);
    });

    input.on('pointermove', pointer => {

      if (!this.state.isDragging) return;

      const hit =
        this.checkLetter(pointer);

      if (
        hit &&
        !this.state.selectedLetters.includes(hit)
      ) {
        this.selectLetter(hit);
      }

      this.redrawLines(pointer);
    });

    const endDrag = () => {

      if (!this.state.isDragging) return;

      this.checkWord();

      this.resetSelection();
    };

    input.on('pointerup', endDrag);

    input.on('gameout', endDrag);
  }

  // =========================
  // POINTER CHECK
  // =========================

  checkLetter(pointer) {

    for (const btn of this.letterButtons) {

      const dist =
        Phaser.Math.Distance.Between(
          pointer.x,
          pointer.y,
          btn.bg.x,
          btn.bg.y
        );

      if (dist < 32) {
        return btn;
      }
    }

    return null;
  }

  // =========================
  // SELECT LETTER
  // =========================

  selectLetter(btn) {

    this.state.selectedLetters.push(btn);

    const accent =
      parseInt(
        this.options.accentColor
          .replace('#', '0x')
      );

    btn.bg.setFillStyle(accent, 1);

    btn.bg.setStrokeStyle(0);

    const word =
      this.state.selectedLetters
        .map(x => x.letter)
        .join('');

    this.indicator
      .setText(word)
      .setVisible(true);
  }

  // =========================
  // DRAG LINE
  // =========================

  redrawLines(pointer) {

    this.dragGraphics.clear();

    const selected =
      this.state.selectedLetters;

    if (selected.length === 0) return;

    const accent =
      parseInt(
        this.options.accentColor
          .replace('#', '0x')
      );

    this.dragGraphics.lineStyle(
      this.options.lineWidth,
      accent,
      0.9
    );

    this.dragGraphics.beginPath();

    this.dragGraphics.moveTo(
      selected[0].bg.x,
      selected[0].bg.y
    );

    for (let i = 1; i < selected.length; i++) {

      this.dragGraphics.lineTo(
        selected[i].bg.x,
        selected[i].bg.y
      );
    }

    this.dragGraphics.lineTo(
      pointer.x,
      pointer.y
    );

    this.dragGraphics.strokePath();
  }

  // =========================
  // CHECK WORD
  // =========================

  checkWord() {

    const word =
      this.state.selectedLetters
        .map(x => x.letter)
        .join('');

    const match =
      this.validWords.find(
        v => v.word === word
      );

    if (!match) {

      this.callbacks.onWordWrong(word);

      this.emit('wordWrong', word);

      return;
    }

    if (
      this.state.foundWords.includes(word)
    ) {
      return;
    }

    this.state.foundWords.push(word);

    this.callbacks.onWordFound(word);

    this.emit('wordFound', word);

    match.coords.forEach((coord, i) => {

      const cell =
        this.gridCells[
          `${coord.r},${coord.c}`
        ];

      if (!cell) return;

      this.scene.tweens.add({

        targets: cell.text,

        alpha: 1,

        scale: 1,

        duration: 350,

        delay: i * 70,

        ease: 'Back.easeOut'
      });
    });

    // WIN CHECK
    if (
      this.state.foundWords.length ===
      this.validWords.length
    ) {

      this.callbacks.onWin();

      this.emit('win');
    }
  }

  // =========================
  // RESET SELECTION
  // =========================

  resetSelection() {

    this.state.selectedLetters.forEach(btn => {

      btn.bg.setFillStyle(
        0x111111,
        1
      );

      btn.bg.setStrokeStyle(
        2,
        0xffffff,
        0.22
      );
    });

    this.state.selectedLetters = [];

    this.state.isDragging = false;

    this.dragGraphics.clear();

    this.indicator
      .setText('')
      .setVisible(false);
  }

  // =========================
  // PUBLIC METHODS
  // =========================

  reset() {

    this.state.foundWords = [];

    Object.values(this.gridCells)
      .forEach(cell => {

        cell.text
          .setAlpha(0)
          .setScale(0.5);
      });

    this.resetSelection();
  }

  shuffle() {

    Phaser.Utils.Array.Shuffle(
      this.wheelLetters
    );

    this.drawWheelLetters();
  }

  revealWord(word) {

    const match =
      this.validWords.find(
        x => x.word === word
      );

    if (!match) return;

    match.coords.forEach(coord => {

      const cell =
        this.gridCells[
          `${coord.r},${coord.c}`
        ];

      if (!cell) return;

      cell.text
        .setAlpha(1)
        .setScale(1);
    });
  }

  getState() {

    return {
      ...this.state
    };
  }

  loadLevel(matrix) {

    this.matrix = matrix;

    this.validWords =
      this.extractValidWords(matrix);

    this.wheelLetters =
      this.extractUniqueLetters(matrix);

    this.scene.scene.restart();
  }

  destroy() {

    this.game.destroy(true);
  }
}