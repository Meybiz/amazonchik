import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/button'
import {FormEvent, useContext, useState} from 'react';
import { Store } from '../Store';
import { nameMutate, emailMutate } from '../hooks/userHook';
import { Modal } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function ProfilePage() {

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const [edit, setEdit] = useState(false)
  const [labelName, setLabelName] = useState(userInfo?.name)
  const [labelEmail, setLabelEmail] = useState(userInfo?.email)
  const [balance, setBalance] = useState(userInfo?.balance || 0)
  const [addState, setAddState] = useState(false)
  const [name, setName] = useState('AAA')
  const [price, setPrice] = useState(0)
  const [description, setDesc] = useState('asdasdasdasdads')
  const [countInStock, setCountInStock] = useState(0)
  const [slug, setSlug] = useState('ass')
  const [image, setImage] = useState('../images/p3.jpg')
  const [category, setCategory] = useState('aaa')
  const [brand, setBrand] = useState('sas')
  const [numReviews, setNumReviews] = useState(0)
  const [rating, setRating] = useState(0)

  const handleAddProduct = async (event: FormEvent<HTMLFormElement>)  => {
      event.preventDefault();
      const newProduct = {
          name,
          slug,
          image,
          brand,
          category,
          price,
          countInStock,
          description,
          numReviews,
          rating,
      };
      try {
          console.log(event)
          const response = await fetch('http://localhost:4000/api/products', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newProduct),
          });

          if (response.ok) {
              console.log('Product added successfully');
          } else {
              console.error('Failed to add product');
          }
      } catch (error) {
          console.error('Error adding product:', error);
      }
  }
  const mut = nameMutate()
  const emailMut = emailMutate()

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
      mut.mutate({ name: labelName }, {
        onSuccess: (data) => {
          dispatch({ type: 'CHANGE_NAME', payload: data.name })
          dispatch({ type: 'CHANGE_EMAIL', payload: data.email })
          setEdit(false)
        },
        onError: (error) => {
          console.error('Ошибка при обновлении имени', error)
        }
      })
      emailMut.mutate({ email: labelEmail }, {
        onSuccess: (data) => {

          dispatch({ type: 'CHANGE_EMAIL', payload: data.email })
          setEdit(false)
        },
        onError: (error) => {
          console.error('Ошибка при обновлении почты', error)
        }
      })
    }
  }
  const handleUnSave = () => {
    setEdit(false)
  }
  const handleBalance = () => {
    setBalance(balance + 5)
  }
  const adddProduct = () => {
    setAddState(true)
  }
  return (
    <>
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
        <Form.Group>
          <Form.Label>Баланс: {balance} руб. {'                         '}
            <Button onClick={handleBalance}>Пополнить</Button>
          </Form.Label>
        </Form.Group>
        {edit ? (
          <>
            <Button onClick={handleSave} disabled={mut.isLoading}>{mut.isLoading ? 'Сохранение...' : 'Сохранить'}</Button>
            <Button onClick={handleUnSave} disabled={mut.isLoading}>Отмена</Button>
          </>
        ) : (
          <Button onClick={handleClick}>Редактировать</Button>
        )}
      </Form>
      <br />
      <Button variant='success' onClick={adddProduct}>+ Добавить товар</Button>
      {addState === true ? (
        <Modal show={addState}>
          <Modal.Title className='p-3'>Заполните форму</Modal.Title>
          <Modal.Body>
            <Form onSubmit={handleAddProduct}>
              <Form.Group className='mb-3'>
                <Form.Label>Название:</Form.Label>
                <Form.Control value={name} type='text' placeholder='Название' onChange={(e) => setName(e.target.value)} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Цена:</Form.Label>
                <Form.Control value={price} type='text' placeholder='Цена' onChange={(e) => setPrice(Number(e.target.value))} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Количество:</Form.Label>
                <Form.Control value={countInStock} type='text' placeholder='Количество' onChange={(e) => setCountInStock(Number(e.target.value))} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <FloatingLabel label='Описание' controlId='floatingTextarea'>
                  <Form.Control value={description} as='textarea' placeholder="Leave a comment here" onChange={(e) => setDesc(e.target.value)} />
                </FloatingLabel>
              </Form.Group>
              <Button variant='secondary' onClick={() => setAddState(false)}>Закрыть</Button>
              <Button variant='success' type='submit' className='m-3'>Добавить</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  )
}
