document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const historyOutput = document.getElementById('history-output');
  let currentValue = '';
  let firstOperand = null;
  let operator = null;

  // Обробка натискання чисел
  document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
      currentValue += button.textContent;
      display.value = currentValue;
    });
  });

  // Обробка операторів
  document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
      if (currentValue !== '') {
        firstOperand = parseFloat(currentValue);
        operator = button.dataset.operation;
        currentValue = '';
        display.value = '';
      }
    });
  });

  // Обчислення результату
  document.querySelector('.equals').addEventListener('click', () => {
    if (firstOperand !== null && currentValue !== '') {
      const secondOperand = parseFloat(currentValue);
      let result;
      switch (operator) {
        case 'add':
          result = firstOperand + secondOperand;
          break;
        case 'subtract':
          result = firstOperand - secondOperand;
          break;
        case 'multiply':
          result = firstOperand * secondOperand;
          break;
        case 'divide':
          result = secondOperand !== 0 ? firstOperand / secondOperand : 'Помилка: /0';
          break;
        default:
          result = 'Невідома операція';
      }
      const historyEntry = `${firstOperand} ${getOperatorSymbol(operator)} ${secondOperand} = ${result}`;
      historyOutput.innerHTML += `<div>${historyEntry}</div>`;
      display.value = result;
      currentValue = '';
      firstOperand = null;
      operator = null;
    }
  });

  // Скидання калькулятора
  document.querySelector('.clear').addEventListener('click', () => {
    currentValue = '';
    firstOperand = null;
    operator = null;
    display.value = '';
  });

  function getOperatorSymbol(op) {
    switch (op) {
      case 'add':
        return '+';
      case 'subtract':
        return '-';
      case 'multiply':
        return '×';
      case 'divide':
        return '÷';
      default:
        return '';
    }
  }
});
