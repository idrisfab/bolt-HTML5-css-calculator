class Calculator {
  constructor() {
    this.currentInput = '';
    this.history = [];
    this.initialize();
  }

  initialize() {
    this.display = document.querySelector('.current-input');
    this.historyDisplay = document.querySelector('.history');
    this.buttons = document.querySelectorAll('button');
    this.addEventListeners();
    this.updateDisplay();
  }

  addEventListeners() {
    this.buttons.forEach(button => {
      button.addEventListener('click', () => this.handleButtonClick(button.dataset.value));
    });

    document.addEventListener('keydown', (e) => this.handleKeyboardInput(e));
  }

  handleButtonClick(value) {
    if (value === 'C') {
      this.clear();
    } else if (value === 'DEL') {
      this.delete();
    } else if (value === '=') {
      this.calculate();
    } else {
      this.appendInput(value);
    }
    this.updateDisplay();
  }

  handleKeyboardInput(e) {
    const key = e.key;
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '.'].includes(key)) {
      this.appendInput(key);
    } else if (key === 'Enter') {
      this.calculate();
    } else if (key === 'Backspace') {
      this.delete();
    } else if (key === 'Escape') {
      this.clear();
    }
    this.updateDisplay();
  }

  appendInput(value) {
    if (this.currentInput.length >= 20) return;
    if (value === '.' && this.currentInput.includes('.')) return;
    this.currentInput += value;
  }

  delete() {
    this.currentInput = this.currentInput.slice(0, -1);
  }

  clear() {
    this.currentInput = '';
    this.history = [];
  }

  calculate() {
    if (!this.currentInput) return;
    
    try {
      const result = eval(this.currentInput);
      if (isNaN(result) || !isFinite(result)) {
        throw new Error('Invalid operation');
      }
      
      this.history.push(`${this.currentInput} = ${result}`);
      if (this.history.length > 5) {
        this.history.shift();
      }
      
      this.currentInput = result.toString();
    } catch (error) {
      this.currentInput = 'Error';
      setTimeout(() => {
        this.currentInput = '';
        this.updateDisplay();
      }, 1000);
    }
  }

  updateDisplay() {
    this.display.value = this.currentInput;
    this.historyDisplay.textContent = this.history.join('\n');
  }
}

new Calculator();
