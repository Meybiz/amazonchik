import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'
import { useContext } from 'react';
import { Store } from '../Store';
export default function ProfilePage() {

    const { state } = useContext(Store)
    const { userInfo } = state
  return (
    <Form>
        <Form.Group className='mb-3'>
            <Form.Label>Имя: {userInfo?.name}</Form.Label>
        </Form.Group>
        <Form.Group>
            <Form.Label>Email: {userInfo?.email}</Form.Label>
        </Form.Group>
        <Button></Button>
    </Form>
  )
}
