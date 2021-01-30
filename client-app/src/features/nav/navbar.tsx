import React from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Menu } from "semantic-ui-react";
import { selectActivity } from "../../actions/activities/select";
import { setEditMode } from "../../actions/editMode/set";


export const Navbar = () => {
  const dispatcher = useDispatch();

  return (


    <Menu fixed="top" inverted>
      <Container>
          <Menu.Item header>
              <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
              Reactivities
          </Menu.Item>
          <Menu.Item name='Activities'/>
            <Menu.Item>
                <Button onClick = {() => {
                  dispatcher(selectActivity(null));
                  dispatcher(setEditMode(true));
                }} positive content='Create Activity' />
            </Menu.Item>
        <Menu.Item name="messages" />
        <Menu.Item name="friends" />
      </Container>
    </Menu>
  );
};
