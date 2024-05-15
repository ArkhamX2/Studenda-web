export const translation: Map<string, Map<string, string>> = new Map([
    ['discipline', new Map([['accountId', 'Преподаватель'], ['name', 'Название'], ['description', 'Примечание']])],

    ['subjectPosition', new Map([['index', 'Индекс'], ['startLabel', 'Начало пары'], ['endLabel', 'Конец пары'], ['name', 'Номер пары']])],

    ['dayPosition', new Map([['index', 'Индекс'], ['name', 'День недели']])],

    ['weekType', new Map([['index', 'Индекс'], ['name', 'Тип недели']])],

    ['subjectType', new Map([['index', 'Индекс'], ['name', 'Тип занятия']])],

    ['course', new Map([['grade', 'Номер'], ['name', 'Название']])],

    ['department', new Map([['name', 'Факультет']])],

    ['group', new Map([['courseId', 'Курс'], ['departmentId', 'Факультет'], ['name', 'Название']])],

    ['role', new Map([['permission', 'Права'],
    ['tokenLifetimeSeconds', 'Время жизни токена'],
    ['name', 'Название'],
    ['canRegister', 'Может зарегистрироваться сам']])],

    ['account', new Map([['email', 'E-mail'],
    ['password', 'Пароль'],
    ['surname', 'Фамилия'],
    ['name', 'Имя'],
    ['patronymic', 'Отчество'],
    ['roleId', 'Роль'],
    ['groupId', 'Группа']])],

    ['markType', new Map([['name', 'Факультет'], ['minValue', 'Минимальное значение'], ['maxValue', 'Максимальное значение']])],

    ['task', new Map
        ([['disciplineId', 'Дисциплина'],
        ['subjectTypeId', 'Тип занятия'],
        ['issuerAccountId', 'Преподаватель'],
        ['assigneeAccountId', 'Студент'],
        ['markTypeId', 'Тип оценивания'],
        ['mark', 'Оценка'],
        ['name', 'Название'],
        ['description', 'Описание'],
        ['startedAt', 'Дата назначения'],
        ['endedAt', 'Дата сдачи']])
    ],
]);
