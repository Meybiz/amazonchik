import { useNavigate } from "react-router-dom"
import { useGetHistory } from './../hooks/orderHook';
import { Helmet } from 'react-helmet-async';
import Loading from './../components/Loading';
import Message from './../components/Message';
import { getError } from './../utils';
import { ApiEr } from "../types/ApiEr";
import { Button } from 'react-bootstrap';



export default function HisoryPage() {
  
  const nav = useNavigate()
  const {data: orders, isLoading, error} = useGetHistory()


    return (
        <div>
            <Helmet>
                <title>История покупок</title>
            </Helmet>
            <h1>История покупок</h1>
            {isLoading ? (
                <Loading></Loading>
            )
            :
            error ? (
                <Message variant='danger'>{getError(error as ApiEr)}</Message>
            )
            : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Номер заказа</th>
                            <th>Cтоимость</th>
                            <th>Статус</th>
                            <th>Доставка</th>
                            <th>Подробности</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders!.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                {/* <td>{order.createAt.substring(0, 10)}</td> */}
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Не оплачено'}</td>
                                <td>{order.isDeliver ? order.deliverAt.substring(0, 10) : 'Не доставлено'}</td>
                                <td>
                                    <Button type="button" variant="primary" onClick={() => nav(`/order/${order._id}`)}>Подробнее</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
  )
}
