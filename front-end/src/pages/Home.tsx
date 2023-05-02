import { Row, Col } from 'react-bootstrap';
import Loading from '../components/Loading';
import Message from '../components/Message';
import ProdItem from './../components/ProdItem';
import { Helmet } from 'react-helmet-async';
import { useGetProdQuery } from './../hooks/prodHook';
import { getError } from './../utils';
import { ApiEr } from '../types/ApiEr';



export default function Home() {
    const { data: products, isLoading, error } = useGetProdQuery()

    return (
        isLoading ? (
            <Loading />
        ) : error ? (
            <Message variant='danger'>{getError(error as ApiEr)}</Message>
        ) :
        <Row>
            <Helmet>
                <title>AMAZONCHIK TS</title>
            </Helmet>
            {
                products!.map((prod) => (
                    <Col key={prod.slug} sm={6} md={4} lg={3}>
                        <ProdItem product={prod}/>
                    </Col>
                )
                )
            }
        </Row>
    )
}
