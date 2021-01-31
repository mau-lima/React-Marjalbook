import React from "react";
import { Button, Card, Segment } from "semantic-ui-react";
import { increment } from "../../actions/counter/increment";
import { decrement } from "../../actions/counter/decrement";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../app/modules/rootState";

export const CounterDashboard = () => {
  const counter = useSelector((state: IRootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <Segment >
      <Card fluid>
        <Card.Content>
          <Card.Header>Counter</Card.Header>
          <Card.Meta>
            <span className="date">Holds its state on Redux</span>
          </Card.Meta>
          <Card.Description>Value: {counter}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            positive
            type="button"
            content="+"
            onClick={() => dispatch(increment(3))}
          />
          <Button
            negative
            type="button"
            content="-"
            onClick={() => dispatch(decrement(2))}
          />
        </Card.Content>
      </Card>
    </Segment>
  );
};
