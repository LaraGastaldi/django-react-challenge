import {Component, useState} from "react";
import apiService from "../services/api.service";
import {Alert, Button, Col, Container, Nav, Navbar, Row, Tab, Table, Tabs} from "react-bootstrap";
import EditEmployeeModal from "../components/editemployee.modal";
import ConfirmdeleteemployeeModal from "../components/confirmdeleteemployee.modal";
import NewEmployeeModal from "../components/newemployee.modal";
import NewCompanyModal from "../components/newcompany.modal";

import adminimg from '../images/admin.png';
import userimg from '../images/user.png';
import ConfirmDeleteCompanyModal from "../components/confirmdeletecompany.modal";
import EditCompanyModal from "../components/editcompany.modal";
import Timeline from "./timeline";


export default class Main extends Component {
    state = {
        ok: true,
        employees: [],
        companies: [],
        employee: null,
        company: null,
        showEditEmployee: false,
        showDelEmployee: false,
        showNewEmployee: false,
        showEditCompany: false,
        showDelCompany: false,
        showNewCompany: false
    }

    async reloadValues() {
        try {
            // @ts-ignore
            const employees = await apiService.getEmployees();
            // @ts-ignore
            const companies = await apiService.getCompanies();

            this.setState({
                ok: true,
                employees: employees,
                companies: companies
            });
        } catch (e) {
            console.log(e);
            this.setState({...this.state, ok: false});
        }
    }
    user = {
        is_staff: false,
        id: 0,
        company: {
            id: 0
        }
    };
    async componentDidMount() {
        try {
            // @ts-ignore
            this.user = JSON.parse(localStorage.getItem('user'));
            console.log(this.user);
        }  catch (e) {
            this.setState({...this.state, ok: false});
            return;
        }
        await this.reloadValues();
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login';
    }

    editEmployeeModal(employee: any) {
        this.setState({...this.state, employee: employee, showEditEmployee: true});
    }

    delEmployeeModal(employee: any) {
        this.setState({...this.state, employee: employee, showDelEmployee: true});
    }

    newEmployeeModal() {
        this.setState({...this.state, showNewEmployee: true});
    }

    newCompanyModal() {
        this.setState({...this.state, showNewCompany: true});
    }

    editCompanyModal(company: any) {
        this.setState({...this.state, company: company, showEditCompany: true});
    }

    delCompanyModal(company: any) {
        this.setState({...this.state, company: company, showDelCompany: true});
    }

    render() {
        if (!this.state.ok) {
            return <Alert variant='warning' dismissible onClose={() => window.location.href = 'login'}>
                <Alert.Heading>Erro</Alert.Heading>
                <p>Necessário fazer login</p>
            </Alert>
        }
        return <>
            <Navbar className="bg-body-tertiary mb-5">
                <Container>
                    <Navbar.Brand>Admin Page</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Brand>
                            <img width="45" alt="Icon" src={this.user.is_staff ? adminimg : userimg} />
                        </Navbar.Brand>
                        <Nav.Link onClick={() => {this.logout()}}>Logout</Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <EditEmployeeModal onHide={(changed: boolean = false) => {
                if (changed) this.reloadValues().then();
                this.setState({...this.state, showEditEmployee: false});
            }} show={this.state.showEditEmployee} employee={this.state.employee}></EditEmployeeModal>

            <ConfirmdeleteemployeeModal onHide={(changed: boolean = false) => {
                if (changed) this.reloadValues().then();
                this.setState({...this.state, showDelEmployee: false});
            }} show={this.state.showDelEmployee} employee={this.state.employee}></ConfirmdeleteemployeeModal>

            <NewEmployeeModal onHide={(changed: boolean = false) => {
                if (changed) this.reloadValues().then();
                this.setState({...this.state, showNewEmployee: false});
            }} show={this.state.showNewEmployee} companies={this.state.companies}></NewEmployeeModal>

            <EditCompanyModal onHide={(changed: boolean = false) => {
                if (changed) this.reloadValues().then();
                this.setState({...this.state, showEditCompany: false});
            }} show={this.state.showEditCompany} company={this.state.company}></EditCompanyModal>

            <ConfirmDeleteCompanyModal onHide={(changed: boolean = false) => {
                if (changed) this.reloadValues().then();
                this.setState({...this.state, showDelCompany: false});
            }} show={this.state.showDelCompany} company={this.state.company}></ConfirmDeleteCompanyModal>

            <NewCompanyModal onHide={(changed: boolean = false) => {
                if (changed) this.reloadValues().then();
                this.setState({...this.state, showNewCompany: false});
            }} show={this.state.showNewCompany}></NewCompanyModal>

            <Container>
                <Row className="justify-content-center">
                    <Col sm={12} md={10} lg={10}>
                        <Tabs defaultActiveKey="users">
                            <Tab eventKey="users" title="Funcionários">
                                {this.user.is_staff ? <Button className="my-2" size="sm" variant="outline-dark" onClick={() => this.newEmployeeModal()}>+ Novo funcionário</Button>
                                    : <></>
                                }
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>E-mail</th>
                                            <th>Usuário</th>
                                            <th>Empresa</th>
                                            <th>Edit</th>
                                            <th>Del</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.employees.map((value: any) => {
                                            return <tr key={value.id}>
                                                <td>{value.id}</td>
                                                <td>{value.name}</td>
                                                <td>{value.email}</td>
                                                <td>{value.username}</td>
                                                <td>{value.company.name}</td>
                                                <td>{!this.user.is_staff ? <></> :<Button variant="secondary" onClick={() => {this.editEmployeeModal(value)}}>✍️</Button>}</td>
                                                <td>{value.id === this.user.id || !this.user.is_staff ? <></> :<Button variant="danger" onClick={() => {this.delEmployeeModal(value)}}>X</Button>}</td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Tab>
                            <Tab eventKey="companies" title="Empresas">
                                {this.user.is_staff ? <Button className="my-2" size="sm" variant="outline-dark" onClick={() => this.newCompanyModal()}>+ Nova empresa</Button>
                                    : <></>
                                }
                                    <Table hover>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Edit</th>
                                        <th>Del</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.companies.map((value: any) => {
                                            return <tr key={value.id}>
                                                <td>{value.id}</td>
                                                <td>{value.name}</td>
                                                <td>{!this.user.is_staff ? <></> : <Button variant="secondary" onClick={() => {this.editCompanyModal(value)}}>✍️</Button>}</td>
                                                <td>{value.id === this.user.company.id || !this.user.is_staff ? <></> :<Button variant="danger" onClick={() => {this.delCompanyModal(value)}}>X</Button>}</td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Tab>
                            {/*<Tab eventKey="timeline" title="Timeline">*/}
                            {/*    <Timeline users={this.state.employees}></Timeline>*/}
                            {/*</Tab>*/}
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        </>
    }
}