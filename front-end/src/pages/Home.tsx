import { Row, Col } from 'react-bootstrap';
import { sampleProd } from '../data';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <Row>
            {
                sampleProd.map((prod) => (
                    <Col key={prod.slug} sm={6} md={4} lg={3}>
                        <Link to={'/product/' + prod.slug}>
                            <img src={prod.image} alt={prod.name} className='product-image' />
                            <h2>{prod.name}</h2>
                            <p>${prod.price}</p>
                        </Link>
                    </Col>
                )
                )
            }
        </Row>
    )
}
