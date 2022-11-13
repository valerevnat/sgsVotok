'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const data = {
        work: [
            {
                workshop: 'Цех №1',
                city: 'Москва',
                employee: 'Иванов И.И.',
    
            },
            {
                workshop: 'Цех №1',
                city: 'Москва',
                employee: 'Васильева О.П.',
    
            },
            {
                workshop: 'Цех №2',
                city: 'Воронеж',
                employee: 'Лютов П.А.',
    
            },
            {
                workshop: 'Цех №1',
                city: 'Москва',
                employee: 'Васильева О.П.',
    
            },
            {
                workshop: 'Цех №2',
                city: 'Воронеж',
                employee: 'Лютов П.А.',
    
            },
            {
                workshop: 'Цех №2',
                city: 'Воронеж',
                employee: 'Петров О.Н.',
    
            },
            {
                workshop: 'Цех №2',
                city: 'Воронеж',
                employee: 'Васильев К.П.',
    
            },
            {
                workshop: 'Цех №2',
                city: 'Воронеж',
                employee: 'Андреев А.А.',
    
            },
            {
                workshop: 'Цех №2',
                city: 'Воронеж',
                employee: 'Павлова О.М.',
    
            },
            {
                workshop: 'Цех №3',
                city: 'Воронеж',
                employee: 'Борисов С.С.',
    
            },
            {
                workshop: 'Цех №3',
                city: 'Воронеж',
                employee: 'Ларин О. М.',
    
            },
            {
                workshop: 'Цех №4',
                city: 'Москва',
                employee: 'Попугаев А.Г.',
    
            },
            {
                workshop: 'Цех №4',
                city: 'Москва',
                employee: 'Князев А.Г.',
    
            },
        ],
        brigade: ['Бригада №1', 'Бригада №2', 'Бригада №3'],
        shift: ['Смена 1', 'Смена 2'],
    } 

    const {form} = document.forms;
    const {elements} = form;
    const brigadeOption = document.getElementById('brigade');
    const shiftOption = document.getElementById('shift');

    const {work, brigade, shift} = data;

    function restOption(arr, parent) {
        arr.forEach(item => {
            const option = document.createElement("option");
            option.innerHTML = `
                <option value=${item} class="option-value">${item} </option>
            `;
            parent.appendChild(option)    
        })  
    }
    
    function dataToFill(arr, criteria) {
        arr.forEach(item => {
            const parent = document.getElementById(criteria);
            const option = document.createElement("option");
            parent.classList.add('parent')
            option.innerHTML = `
                <option value=${item} class="option-value">${item} </option>
            `;
            parent.appendChild(option)    
        })   

    }

    function dataForOptions(work) {
        for (let i = 0; i < elements.length -1; i++) {
            const criteria = elements[i].id;
            
            const optionValue = Array.from(new Set(work.map(item => {
                const arr = Object.keys(item).includes(criteria) ? item[criteria] : '';
                return arr;
            })))
            switch (criteria) {
                case 'city':
                    document.querySelectorAll(`.parent`).forEach(parent => {
                        parent.querySelectorAll(' :not(:first-child)').forEach(n => n.remove())
                    })
                    dataToFill(optionValue, criteria)
                    break;
                case 'workshop': 
                    dataToFill(optionValue, criteria)
                    break;
                case 'employee': 
                    dataToFill(optionValue, criteria)
                    break;
                default:
                    break;
            }    
        }
   
    }
    

    function optionsChanged(event) {
        event.preventDefault();

        if (event) {
            const {value, id} = event.target;
            const filterWork =  work.filter(item => {
                return item[id] == value;
            });
            dataForOptions(filterWork);
        }         
    }

    function retrieveFormValue(event) {
        event.preventDefault();
        const values = {};

        for (let i = 0; i < elements.length; i++) {
            const formElement = elements[i];
            const {name} = formElement;
            if(name) {
                const {value} = formElement;
                values[name] = value;
                
            }
        }
        // console.log('values', values);
        document.cookie = `dataFrom=${JSON.stringify(values)}`
        
    }

    restOption(brigade, brigadeOption);
    restOption(shift, shiftOption);
    dataForOptions(work);

    document.querySelectorAll('.parent').forEach(parent => {
        parent.addEventListener('change', optionsChanged);
    })
    form.addEventListener('submit', retrieveFormValue);

})


