import axios from "axios"
import { dayPosition, discipline, subjectPosition, weekType, subjectType, account, group, course, department, } from '../types/AdminType';
import store from "../store";
import { updateAccountInfo } from "../store/adminSlice";

type info = {
    id: number,
    name: string,
    route: string
}

interface IRequestValue {
    value: info[]
}

export const RequestValue: IRequestValue = {
    value: [
        { id: 0, name: "default", route: "" },
        { id: 1, name: "discipline", route: "api/schedule/discipline" },
        { id: 2, name: "subjectPosition", route: "api/schedule/subject-position" },
        { id: 3, name: "dayPosition", route: "api/schedule/day-position" },
        { id: 4, name: "weekType", route: "api/schedule/week-type" },
        { id: 5, name: "subjectType", route: "api/schedule/subject-type" },
        { id: 6, name: "account", route: "api/account" },
        { id: 7, name: "group", route: "api/group" },
        { id: 8, name: "course", route: "api/course" },
        { id: 9, name: "department", route: "api/department" },
        { id: 10, name: "schedule", route: "api/schedule/subject" },
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
                            const tmparr = [] as discipline[]
                            const data = response.data as discipline[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, accountId: obj.accountId, name: obj.name, description: obj.description }) })
                            return (tmparr)
                        }
                    case "subjectPosition":
                        {
                            const tmparr = [] as subjectPosition[]
                            const data = response.data as subjectPosition[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, index: obj.index, startLabel: obj.startLabel, endLabel: obj.endLabel, name: obj.name }) })
                            return (tmparr)
                        }
                    case "dayPosition":
                        {
                            const tmparr = [] as dayPosition[]
                            const data = response.data as dayPosition[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, index: obj.index, name: obj.name }) })
                            return (tmparr)
                        }
                    case "weekType":
                        {
                            const tmparr = [] as weekType[]
                            const data = response.data as weekType[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, index: obj.index, name: obj.name }) })
                            return (tmparr)
                        }
                    case "subjectType":
                        {
                            const tmparr = [] as subjectType[]
                            const data = response.data as subjectType[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, name: obj.name }) })
                            return (tmparr)
                        }
                    case "account":
                        {
                            const tmparr = [] as account[]
                            const data = response.data as account[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, groupId: obj.groupId, identityId: obj.identityId, name: obj.name, surname: obj.surname, patronymic: obj.patronymic }) })
                            return (tmparr)
                        }
                    case "group":
                        {
                            const tmparr = [] as group[]
                            const data = response.data as group[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, courseId: obj.courseId, departmentId: obj.departmentId, name: obj.name }) })
                            return (tmparr)
                        }
                    case "course":
                        {
                            const tmparr = [] as course[]
                            const data = response.data as course[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, grade: obj.grade, name: obj.name }) })
                            return (tmparr)
                        }
                    case "department":
                        {
                            const tmparr = [] as department[]
                            const data = response.data as department[]
                            data.map((obj, i) => { tmparr.push({ id: obj.id, name: obj.name }) })
                            return (tmparr)
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
        store.dispatch(updateAccountInfo({ token: "", accountId: 0 }))
        return ([])
    }
}