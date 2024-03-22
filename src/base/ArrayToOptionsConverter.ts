import { option } from "../types/OptionType";

export const ArrayToOptions = (array: any[] | undefined) => {
    const tmparray: option[] = [];
    if (array === undefined) {
        return tmparray
    }
    array.map((obj) => (((!Object.keys(obj).includes("surname"))
        ?
        !Object.keys(obj).includes("grade")
            ?
            (tmparray.push({ value: obj.id, label: obj.name }))
            :
            (tmparray.push({ value: obj.id, label: String(obj.grade) }))
        :
        (tmparray.push({ value: obj.id, label: "" + obj.surname + " " + obj.name + " " + obj.patronymic })))))
    return tmparray
}