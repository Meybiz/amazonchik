import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'
import { useContext, useState } from 'react';
import { Store } from '../Store';
import { nameMutate } from '../hooks/userHook';
export default function ProfilePage() {

    const { state, dispatch } = useContext(Store)
    const { userInfo } = state
    const [edit, setEdit] = useState(false)
    const [labelName, setLabelName] = useState(userInfo?.name)
    const [labelEmail, setLabelEmail] = useState(userInfo?.email)

  const mut = nameMutate()
    const handleClick = () => {
        setEdit(true)
    }

    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabelName(e.target.value)
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabelEmail(e.target.value)
    }
    const handleSave = () => {
      if (typeof labelName !== 'undefined' && typeof labelEmail !== 'undefined') {
        mut.mutate({ name: labelName, email: labelEmail}, {
        onSuccess: (data) => {
          
          dispatch({ type: 'CHANGE_NAME', payload: data.name })
          dispatch({ type: 'CHANGE_EMAIL', payload: data.email })
          setEdit(false)
        },
        onError: (error) => {
          console.error('Ошибка при обновлении имени', error)
        }
      })
      }
      

    }
  return (
    <Form>
        <Form.Group className='mb-3'>
            <Form.Label>
              Имя: {' '}{edit ? (
                <Form.Control type='text' value={labelName} onChange={handleName}></Form.Control>
              ) : (
                userInfo?.name
              )}</Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Email: {' '}{edit ? (
                <Form.Control type='text' value={labelEmail} onChange={handleEmail}></Form.Control>
              ) : (
                userInfo?.email
              )}</Form.Label>
        </Form.Group>
        {edit ? (
          <Button onClick={handleSave} disabled={mut.isLoading}>{mut.isLoading ? 'Сохранение...' : 'Сохранить'}</Button>
        ) : (
          <Button onClick={handleClick}>Редактировать</Button>
        )}
    </Form>
  )
}
