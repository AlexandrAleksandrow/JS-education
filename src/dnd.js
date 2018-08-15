/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let newDiv = document.createElement('div');

    newDiv.classList.add('draggable-div');
    newDiv.setAttribute('draggable', 'true');

    newDiv.style.width = `${Math.random()*300}px`;
    newDiv.style.height = `${Math.random()*300}px`;

    newDiv.style.background = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    newDiv.style.position = 'absolute';
    newDiv.style.top = `${Math.random() * (window.innerHeight - 500)}px`;
    newDiv.style.left = `${Math.random() * (window.innerWidth - 500)}px`;

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('dragstart', e => {
        let activeDiv;

        if (e.target.classList.contains('dragged')) {
            activeDiv = e.target;
        }

        activeDiv.setAttribute('dragged', '');
        activeDiv.style.zIndex = '100';

        let coordX = e.clientX - activeDiv.getBoundingClientRect().left;
        
        let coordY = e.clientY - activeDiv.getBoundingClientRect().top;

        e.dataTransfer.setData('coordX', `${coordX}`);
        e.dataTransfer.setData('coordY', `${coordY}`);
    })

    target.addEventListener('dragover', e => {
        e.preventDefault();
    })

    target.addEventListener('drop', e => {
        let newActiveDiv = document.querySelector('[dragged]');

        newActiveDiv.style.top = `${e.clientY - e.dataTransfer.getData('coordY')}px`;

        newActiveDiv.style.left = `${e.clientX - e.dataTransfer.getData('coordX')}px`;

        newActiveDiv.removeAttribute('dragged');
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
