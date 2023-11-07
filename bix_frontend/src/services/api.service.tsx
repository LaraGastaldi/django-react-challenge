import axios from "axios";

type Employee = {
    id: number;
    name: string;
    username: string;
    company: Company;
    email: string;
}

type Company = {
    id: number;
    name: string;
}

class ApiService {

    static config() {
        let token = localStorage.getItem('token');
        if (!token) {
            throw Error('Must do login');
        }
        return new axios.AxiosHeaders({'Authorization': 'Token ' + token});
    }

    static async noThrowError(method: string, uri: string, data: any = undefined, useAuth: boolean = true) {
        let response;
        try {
            response = await axios({
                method: method,
                url: process.env.REACT_APP_API_URL + uri,
                data: data,
                headers: useAuth ? this.config() : undefined
            })

        } catch (e: any) {
            console.log(e);
            response = e.response;
        }
        return response;
    }
    static async login(username: string, password: string) {
        const response = (await this.noThrowError('post', '/login', {
            'username': username,
            'password': password
        }, false));

        if (response.status !== 201) {
            return false;
        }
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        return true;
    }

    static async getEmployees(): Promise<Employee[]> {
        const response = (await this.noThrowError('get', '/user/'));
        if (response.status !== 200) {
            throw Error('Error on request');
        }
        return response.data;
    }

    static async updateEmployee(employeeId: number, employee: Employee) {
        const response = (await this.noThrowError('patch', '/user/' + employeeId + '/', employee));

        if (response.status !== 200) {
            throw Error('Error on request');
        }
        return response.data;
    }

    static async createEmployee(employee: Employee) {
        const response = (await this.noThrowError('post', '/user/', employee));

        if (response.status !== 201) {
            throw Error('Error on request');
        }

        return response.data;
    }

    static async deleteEmployee(employeeId: number) {
        const response = (await this.noThrowError('delete', '/user/' + employeeId + '/'));

        if (response.status !== 204) {
            throw Error('Error on request');
        }

        return true;
    }

    static async getCompanies(): Promise<Company[]> {
        const response = (await this.noThrowError('get', '/company/'));
        if (response.status !== 200) {
            throw Error('Error on request');
        }
        return response.data;
    }

    static async createCompany(company: Company): Promise<any> {
        const response = (await this.noThrowError('post', '/company/', company));

        if (response.status !== 201) throw Error('Error on request');

        return response.data;
    }

    static async updateCompany(companyId: number, company: {name: string}): Promise<any> {
        const response = (await this.noThrowError('patch', '/company/' + companyId + '/', company));

        if (response.status !== 200) throw Error('Error on request');

        return response.data;
    }

    static async deleteCompany(companyId: number): Promise<any> {
        const response = await this.noThrowError('delete', '/company/' + companyId + '/');

        if (response.status !== 204) throw Error('Error on request');

        return true;
    }
}

export default ApiService;