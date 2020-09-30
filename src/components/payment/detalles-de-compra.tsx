import React from "react";
import { Card, CardBody, CardText, CardTitle, Badge } from "reactstrap";

interface Props {
  title: string;
  content: string;
  monto: number;
}

export function DetallesPayment({ title, content, monto }: Props) {
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{content}</CardText>
          <strong>
            <Badge color="light">$ {monto} USA</Badge>
          </strong>
        </CardBody>
      </Card>
    </>
  );
}
