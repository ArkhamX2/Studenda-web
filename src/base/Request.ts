import axios from "axios"
import { dayPosition, discipline, subjectPosition, weekType, subjectType, account, group, course, department, role, security, markType, task,  } from '../types/AdminType';
import store from "../store";
import { updateAccountData } from "../store/accountSlice";

type info = {
    id: number,
    name: string,
    altName?: string,
    route: string
}

interface IRequestValue {
    value: info[]
}

export const RequestValue: IRequestValue = {
    value: [
        { id: 0, name: "default", route: "" },
        { id: 1, name: "discipline", altName: "дисциплины", route: "api/schedule/discipline" },
        { id: 2, name: "subjectPosition", altName: "дни недели", route: "api/schedule/subject-position" },
        { id: 3, name: "dayPosition", altName: "номера пар", route: "api/schedule/day-position" },
        { id: 4, name: "weekType", altName: "типы недель", route: "api/schedule/week-type" },
        { id: 5, name: "subjectType", altName: "типы занятий", route: "api/schedule/subject-type" },
        { id: 6, name: "account", altName: "пользователи", route: "api/security/account" },
        { id: 7, name: "group", altName: "группы", route: "api/group" },
        { id: 8, name: "role", altName: "роли", route: "api/security/role" },
        { id: 9, name: "course", altName: "курсы", route: "api/course" },
        { id: 10, name: "department", altName: "факультеты", route: "api/department" },
        { id: 11, name: "markType", altName: "типы оценок", route: "api/journal/mark-type" },
        { id: 12, name: "schedule", altName: "расписание", route: "api/schedule/subject" },
        { id: 13, name: "task", altName: "задания", route: "api/journal/task" },
    ]
}

export const request = async (RequestValueId: number, method: string, data: undefined | any = undefined, params: undefined | any = undefined, headers: undefined | any = undefined, additionalInfo: string = ""): Promise<any[]> => {
    try {
        if (RequestValue.value[RequestValueId].route !== "" || additionalInfo !== "") {
            if (method === "delete" && data !== undefined) {
                data = data.id
            }
            const url = "http://88.210.3.137/" + RequestValue.value[RequestValueId].route + additionalInfo
            const response = await axios({
                method: method,
                url: url,
                data: [data],
                params: params,
                headers: headers
            })
            console.log(response.data)
            if (method === "get") {
                switch (RequestValue.value[RequestValueId].name) {
                    case "discipline":
                        {
                            return (response.data as discipline[]).map((obj) => { return ({ id: obj.id, accountId: obj.accountId, name: obj.name, description: obj.description }) })
                        }
                    case "subjectPosition":
                        {
                            return (response.data as subjectPosition[]).map((obj) => { return ({ id: obj.id, index: obj.index, startLabel: obj.startLabel, endLabel: obj.endLabel, name: obj.name }) })
                        }
                    case "dayPosition":
                        {
                            return (response.data as dayPosition[]).map((obj) => { return ({ id: obj.id, index: obj.index, name: obj.name }) })
                        }
                    case "weekType":
                        {
                            return (response.data as weekType[]).map((obj) => { return ({ id: obj.id, index: obj.index, name: obj.name }) })
                        }
                    case "subjectType":
                        {
                            return (response.data as subjectType[]).map((obj) => { return ({ id: obj.id, name: obj.name }) })
                        }
                    case "account":
                        {
                            return (response.data as account[]).map((obj) => { return ({ id: obj.id, identityId: obj.identityId, email: obj.email, surname: obj.surname, name: obj.name, patronymic: obj.patronymic, roleId: obj.roleId, groupId: obj.groupId }) })
                        }
                    case "group":
                        {
                            return (response.data as group[]).map((obj) => { return ({ id: obj.id, courseId: obj.courseId, departmentId: obj.departmentId, name: obj.name }) })
                        }
                    case "course":
                        {
                            return (response.data as course[]).map((obj) => { return ({ id: obj.id, grade: obj.grade, name: obj.name }) })
                        }
                    case "department":
                        {
                            return (response.data as department[]).map((obj) => { return ({ id: obj.id, name: obj.name }) })
                        }
                    case "role":
                        {
                            return (response.data as role[]).map((obj) => { return ({ id: obj.id, name: obj.name, permission: obj.permission, tokenLifetimeSeconds: obj.tokenLifetimeSeconds, canRegister: obj.canRegister }) })
                        }
                    case "markType":
                        {
                            return (response.data as markType[]).map((obj) => { return ({ id: obj.id, name: obj.name, minValue: obj.minValue, maxValue: obj.maxValue }) })
                        }
                    case "task":
                        {
                            return (response.data as task[]).map((obj) => { return ({ id: obj.id, disciplineId: obj.disciplineId, subjectTypeId: obj.subjectTypeId, issuerAccountId: obj.issuerAccountId, assigneeAccountId: obj.assigneeAccountId, markTypeId: obj.markTypeId, mark: obj.mark, name: obj.name, description: obj.description, startedAt: obj.startedAt, endedAt: obj.endedAt }) })
                        }
                    default:
                        {
                            return response.data
                        }
                }
            }
            return response.data
        }
        else {
            return ([])
        }
    }
    catch (error) {
        console.error(error)
        store.dispatch(updateAccountData({ token: "", accountId: 0 }))
        return ([])
    }
}