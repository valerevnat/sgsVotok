<template>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="city">City:</label>
            <select id="city" v-model="city" @change="onChange">
                <option disabled > Выберите город </option>
                <option v-for="option in optionsRelatedData('city')" :key="option">{{option}}</option>
            </select>
        </div>
        <div>
            <label for="workshop" >Workshop:</label>
            <select id="workshop" v-model="workshop" @change="onChange">
                <option disabled > Выберите цех </option>
                <option v-for="option in optionsRelatedData('workshop')" :key="option">{{option}}</option>
            </select>
        </div>
        <div>
            <label for="employee" >Employee:</label>
            <select id="employee" v-model="employee" @change="onChange">
                <option disabled> Выберите сотрудника </option>
                <option v-for="option in optionsRelatedData('employee')" :key="option">{{option}}</option>
            </select>
        </div>
        <div>
            <label for="brigade">Brigade:</label>
            <select id="brigade" v-model="brigade">
                <option disabled> Выберите бригаду </option>
                <option v-for="option in optionsBrigade" 
                        :key="option.name"
                >{{option.name}}</option>

            </select>
        </div>
        <div>
            <label for="shift">Shift:</label>
            <select id="shift" v-model="shift">
                <option disabled> Выберите бригаду </option>
                <option v-for="option in optionsShift" 
                        :key="option.name"
                >{{option.name}}</option>
            </select>
        </div>
        <div>
            <button type="submit" @submit="addReview">Submit</button>
        </div>
    </form>
    
    
</template>  

<script>

export default {
    data() {
        return {
            optionsBrigade: [
                { name: 'Бригада №1'},
                { name: 'Бригада №2'},
                { name: 'Бригада №3'},
            ],
            optionsShift: [
                { name: 'Смена 1'},
                { name: 'Смена 2'},
            ],
            optionsWork: [
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
            filterOption: [],

            city: null,
            workshop: null,
            employee: null,
            brigade: null,
            shift: null,
            dataForms: [],
        }
    },
    methods: {
        onSubmit() {
            let formsData = {
                city: this.city,
                workshop: this.workshop,
                employee: this.employee,
                brigade: this.brigade,
                shift: this.shift,
            }
            this.city = null
            this.workshop = null
            this.employee = null
            this.brigade = null
            this.shift = null
            document.cookie = `dataFromCookie=${JSON.stringify(formsData)}`
            this.filterOption = [];
        },
        onChange(event) {
            const {value, id} = event.target;
            const filterWork =  this.optionsWork.filter(item => {
                return item[id] == value;
            });
            this.filterOption = filterWork
        },

        addReview(data) {
            this.dataForms.push(data)
        },

        optionsRelatedData(newVal) {
            if(this.filterOption.length) {
                return Array.from(new Set(this.filterOption.map(item => {
                    const arr = item[newVal];
                    return arr;
                })))
            } else {
                return Array.from(new Set(this.optionsWork.map(item => {
                    const arr = item[newVal];
                    return arr;
                })))
            }
            
        },
    },

}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .app {
        padding: 20px;
    }
</style>