import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useGetProdDetailSlugQuery } from '../hooks/prodHook';
import Loading from '../components/Loading';
import Message from './../components/Message';
import { getError } from './../utils';
import { ApiEr } from '../types/ApiEr';
import { Row, Col, ListGroup, Card, Badge } from 'react-bootstrap';
import Ratings from './../components/Ratings';
export default function Products() {
  const par = useParams()
  const { slug } = par;
  const {
    data: products,
    refetch,
    isLoading,
    error,
  } = useGetProdDetailSlugQuery(slug!)
  return isLoading ? (
    <Loading />
  )
    :
    error ? (
      <Message variant='danger'>{getError(error as ApiEr)}</Message>
    )
      :
      !products ? (
        <Message variant='danger'>Товар не найден</Message>
      )
        :
        (
          <>
            <Helmet>
              <title>Products Page</title>
            </Helmet>
            <Row>
              <Col md={6}>
                <img className='large' src={products.image} alt={products.name} />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Helmet>
                      <title>{products.name}</title>
                    </Helmet>
                    <h1>{products.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Ratings ratings={products.rating} numReview={products.numReviews}>
                    </Ratings>
                  </ListGroup.Item>
                  <ListGroup.Item>Цена: ${products.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Описание:
                    <p>{products.description}</p>
                  </ListGroup.Item>
                </ListGroup>

              </Col>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Col>Цена:</Col>
                        <Col>${products.price}</Col>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                          {
                            products.countInStock > 0 ? (
                              <Badge bg="success">В наличии</Badge>
                            ) : (
                              <Badge bg="danger">Нет в наличии</Badge>
                            )
                          }</Col>
                        </Row>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )




}
