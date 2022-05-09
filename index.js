const body = document.querySelector('body')
const wrapper = document.createElement('div');
const keyboard = document.createElement('div');
const keyboardKeys = document.createElement('div');
const textField = document.createElement('div');
const textArea = document.createElement('textarea');
const textInfo = document.createElement('p');

wrapper.classList.add('wrapper');
keyboard.classList.add('keyboard');
keyboardKeys.classList.add('keyboard-keys');
textField.classList.add('text-field');
textArea.classList.add('text-area');
textInfo.innerHTML = 'Клавиатура создана в операционной системе Windows'


body.append(wrapper);
wrapper.append(textField);
wrapper.append(keyboard);
wrapper.append(textInfo);
keyboard.append(textField);
keyboard.append(keyboardKeys);
textField.append(textArea);

const Keyboard = {
  elements: {
    keys: []
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    this.elements.keys = keyboardKeys.querySelectorAll(".keyboard-key");
    keyboard.appendChild(keyboardKeys);
    keyboardKeys.appendChild(this.createKeys());
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      'Backquote', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, 'Enter',
      'ShiftLeft', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'Meta', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
    ];

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");

      // Add attributes/classes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add("keyboard-key");

      keyElement.dataset.letter = key;

      const insertLineBreak = ["Backspace", "Delete", "Enter", "Shift"].indexOf(key) !== -1;

      switch (key) {
        case 'Backquote':
          keyElement.classList.add("backquote", 'min-width');
          keyElement.innerHTML = '`';
          keyElement.addEventListener("click", () => {
            textArea.value += '`';
          });
          break;
        case "Backspace":
          keyElement.classList.add("backspace");
          keyElement.innerHTML = 'backspace';
          keyElement.addEventListener("click", () => {
            textArea.value = textArea.value.substring(0, textArea.value.length - 1);
          });
          break;

        case "Tab":
          keyElement.classList.add("tab");
          keyElement.innerHTML = 'tab';

          break;
        case "Delete":
          keyElement.classList.add("del");
          keyElement.innerHTML = 'del';
          keyElement.addEventListener("click", () => {
            textArea.value = '';
          });
          break;

        case "CapsLock":
          keyElement.classList.add("caps-lock", "key-active", 'lrg-width');
          keyElement.innerHTML = 'caps lock';
          break;

        case "Enter":
          keyElement.classList.add("enter", 'lrg-width');
          keyElement.innerHTML = 'enter';
          keyElement.addEventListener('click', () => {
            textArea.value += "\n";
          })
          break;

        case "ShiftLeft":
          keyElement.classList.add("shift", 'med-width');
          keyElement.innerHTML = 'shift';

          break;
        case "ShiftRight":
          keyElement.classList.add("shift");
          keyElement.innerHTML = 'shift';

          break;
        case "ControlLeft":
          keyElement.classList.add("ctrl", 'med-width');
          keyElement.innerHTML = 'ctrl';

          break;
        case "ControlRight":
          keyElement.classList.add("ctrl", 'med-width');
          keyElement.innerHTML = 'ctrl';
          break;

        case "Meta":
          keyElement.classList.add("win", 'min-width');
          keyElement.innerHTML = 'win';
          break;

        case "AltLeft":
          keyElement.classList.add("alt", 'med-width');
          keyElement.innerHTML = 'alt';
          break;

        case "AltRight":
          keyElement.classList.add("alt", 'med-width');
          keyElement.innerHTML = 'alt';
          break;

        case "Space":
          keyElement.classList.add("space", 'max-width');
          keyElement.innerHTML = '<i class="fa-solid fa-horizontal-rule"></i>';
          keyElement.addEventListener('click', () => {
            textArea.value += ' '
          })
          break;

        case "ArrowUp":
          keyElement.classList.add("up");
          keyElement.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
          keyElement.addEventListener('click', () => {
            textArea.value += '\u2191';
          })
          break;

        case "ArrowDown":
          keyElement.classList.add("down");
          keyElement.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
          keyElement.addEventListener('click', () => {
            textArea.value += '\u2193';
          })
          break;

        case "ArrowLeft":
          keyElement.classList.add("left");
          keyElement.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
          keyElement.addEventListener('click', () => {
            textArea.value += '\u2190';
          })
          break;

        case "ArrowRight":
          keyElement.classList.add("right");
          keyElement.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
          keyElement.addEventListener('click', () => {
            textArea.value += '\u2192';
          })
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            textArea.value = textArea.value + keyElement.innerHTML;
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }

    });

    return fragment;
  },
}

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

document.addEventListener('keydown', function (event) {

  const keyPressed = event.key;
  const codePressed = event.code;

  const element = document.querySelector(`[data-letter="${keyPressed}"]`) || document.querySelector(`[data-letter="${codePressed}"]`);

  if (element) {
    // console.log(element)
    element.classList.add('pressed');
    textArea.value = textArea.value + element.value;
  }


});
document.addEventListener('keyup', function (event) {

  const keyPressed = event.key;
  const codePressed = event.code;

  const element = document.querySelector(`[data-letter="${keyPressed}"]`) || document.querySelector(`[data-letter="${codePressed}"]`);

  if (element) {
    element.classList.remove('pressed');
  }
});