import {Component, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState} from "react";
import apiService from "../services/api.service";
import {Alert, Button, Col, Container, Form, Nav, Navbar, Row, Tab, Table, Tabs} from "react-bootstrap";
import EditEmployeeModal from "../components/editemployee.modal";
import ConfirmdeleteemployeeModal from "../components/confirmdeleteemployee.modal";
import NewEmployeeModal from "../components/newemployee.modal";
import NewCompanyModal from "../components/newcompany.modal";
import {Chrono} from "react-chrono";

interface TimelineProps {
    users: any[]
}

export default class Timeline extends Component<TimelineProps> {

    state = {
        user: undefined
    };

    items = [
        {
            title: "Entrada na empresa Company 1"
        }
    ]

    render() {
        return <>
            <Form.Select onSelect={(value) => this.setState({user: value.currentTarget.value})}>
                <option>Selecione um usuário</option>
                {this.props.users !== undefined ?? this.props.users!.map((value: {name: string, id: number}) => <option value={value.id}>{value.name}</option>)}
            </Form.Select>
            <Container>
                {this.state.user !== undefined ?? <Chrono scrollable={false} items={this.items} />}
            </Container>
        </>
    }
}