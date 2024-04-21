export type subject = {
    id?: number, 
    academicYear: number, 
    disciplineId: number, 
    classroom?: string, 
    subjectTypeId?: number, 
    accountId?: number, 
    subjectPositionId: number, 
    dayPositionId: number, 
    weekTypeId: number, 
    groupId: number, 
    description?: string
}

export type discipline = {
    id?: number, 
    accountId: number,
    name: string,
    description?: string
}

export type subjectPosition = {
    id?: number, 
    index: number,
    startLabel?: string,
    endLabel?: string,
    name?: string
}

export type dayPosition = {
    id?: number, 
    index: number,
    name?: string
}

export type weekType = {
    id?: number, 
    index: number,
    name?: string
}

export type subjectType = {
    id?: number, 
    name: string
}

export type account = {
    id?: number, 
    identityId: string,    
    surname?: string,
    name?: string,
    patronymic?: string,
    roleId?: number,
    groupId?: number,
}

export type group = {
    id?: number, 
    courseId: number,
    departmentId: number,
    name: string
}

export type course = {
    id?: number, 
    grade: number,
    name?: string
}

export type department = {
    id?: number, 
    name: string
}

export type role = {
    id?: number,
    name: string,
    permission: string,
    tokenLifetimeSeconds: number,
    canRegister: boolean
}

export type security = {
    defaultPermission: string,
    leaderPermission: string,
    teacherPermission: string,
    adminPermission: string,
    coordinatedUniversalTime: Date
}

export type mark = {
    markTypeId: number,
    value: number
}

export type markType = {
    name: string,
    minValue: number,
    maxValue: number
}

export type task = {
    disciplineId: number,
    subjectTypeId: number,
    issuerAccountId: number,
    assigneeAccountId: number,
    markId: number,
    name: string,
    description?: string,
    startedAt: Date,
    endedAt: Date
}