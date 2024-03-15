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
    roleId: number,
    groupId?: number,
    identityId: string,
    name?: string,
    surname?: string,
    patronymic?: string
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

export type roleNames = {
    studentRoleName: "Student",
    leaderRoleName: "Leader",
    teacherRoleName: "Teacher",
    adminRoleName: "Admin"
}