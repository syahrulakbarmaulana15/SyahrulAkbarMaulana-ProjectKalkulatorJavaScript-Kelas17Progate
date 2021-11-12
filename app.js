const buttons = document.getElementById('buttons'),
    input = document.getElementById('input');

let operationStatus = false,
    firstValue,
    typeOperation;

input.value = '0';

/* ────────────────────── Functions ───────────────────── */

const writeScreen = number => {
    if (input.value === '0' || operationStatus === true) {
        input.value = number;
    } else if (number === '.' && !input.value.includes('.')) {
        input.value += number;
    } else if (number !== '.') {
        input.value += number;
    } else {
        null;
    }

    operationStatus = false;
};

const getOperation = (element, operation) => {
    operationStatus = true;
    firstValue = Number(input.value);
    typeOperation = operation;
    input.value = element.innerText;
};

const runOperation = operation => {
    const getResult = (firstValue, typeOperation) => {
        const secondValue = Number(input.value);
        let result;

        switch (typeOperation) {
            case '+':
                result = firstValue + secondValue;
                break;

            case '-':
                result = firstValue - secondValue;
                break;

            case '/':
                result = firstValue / secondValue;
                break;

            case '*':
                result = firstValue * secondValue;
                break;

            default:
                break;
        }

        result === Infinity ? (input.value = 'Error') : (input.value = result);
    };

    switch (operation) {
        case 'clear':
            input.value = '0';
            break;

        case 'del':
            input.value = input.value.slice(0, input.value.length - 1);
            break;

        case 'equals':
            getResult(firstValue, typeOperation);
            operationStatus = true;
            break;

        default:
            break;
    }
};

/* ──────────────────── Main Function ─────────────────── */

const calculator = () => {
    if (!buttons) return;

    buttons.addEventListener('click', e => {
        const t = e.target,
            d = t.dataset;

        if (d.number) writeScreen(d.number);
        if (d.math) getOperation(t, d.math);
        if (d.operation) runOperation(d.operation);
    });
};

calculator();