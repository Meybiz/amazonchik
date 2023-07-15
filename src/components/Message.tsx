import { Alert } from "react-bootstrap"

export default function Message({
    variant = "info",
    children,
} : {
    variant?: string,
    children: React.ReactNode
}) {
    return (
        <Alert variant={variant || "info"}>
            {children}
        </Alert>
    )
}
