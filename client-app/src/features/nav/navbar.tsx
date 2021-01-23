import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface IProps{
  openCreateForm: () => void;
}

export const Navbar = ({openCreateForm} :IProps) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
          <Menu.Item header>
              <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
              Reactivities
          </Menu.Item>
          <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button onClick = {openCreateForm}positive content='Create Activity' />
            </Menu.Item>
        <Menu.Item name="messages" />
        <Menu.Item name="friends" />
      </Container>
    </Menu>
  );
};
