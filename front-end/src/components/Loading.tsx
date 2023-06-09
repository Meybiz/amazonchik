import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Подождите...</span>
    </Spinner>
  )
}
