import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../../hook'
import { aboba } from '../../../store/testSlice'
import ModalAdmin from '../modalAdmin/ModalAdmin'
import useModal from '../modalAdmin/useModalAdmin'

interface inputProps {
    content: {subject: string, type: string, teacher: string, classroom: string}
}

const AdminScheduleItem: FC<inputProps> =
  ({content}) => {
  const dispatch = useAppDispatch()
  const { isOpen, toggle } = useModal()
  const [item, setItem] = useState({})
  const click = () => {
    
    toggle()
  }
  return (
    <>
      <ModalAdmin isOpen={isOpen} toggle={toggle}>
        <div>
          subject:
          <input name="myInput" defaultValue={content.subject}></input>
        </div>
        <div>
          type:
          <input defaultValue={content.type}></input>
        </div>
        <div>
          teacher:
          <input defaultValue={content.teacher}></input>
        </div>
        <div>
          classroom:
          <input defaultValue={content.classroom}></input>
        </div>
        <button onClick={click}>Сохранить</button>
      </ModalAdmin>
      <td onClick={toggle}>
              {content.subject} {content.type} {content.teacher} {content.classroom}
      </td>
    </>
  )
}

export default AdminScheduleItem;