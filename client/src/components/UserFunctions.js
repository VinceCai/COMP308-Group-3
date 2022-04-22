import axios from 'axios';

export const register =  newUser => {
    return axios
    .post('http://localhost:5000/api/users', newUser)
    .then(res => {
        console.log(res);
        return { status: 'Registerd! in usersFunctions' };
        
    })
    .catch(err => {
        console.error("got Error when register: " + err);
        return {'error': err.response.data.message}
    });

}
export const login =  user => {
    return axios
    .post('http://localhost:5000/signin', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        console.log('res', res);
        let user = res.data.user;
        console.log("login user " + user);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userToken', res.data.token);
        localStorage.setItem('userName', user.first_name);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userEmail', user.email);
        console.log("login user email " + user.email);
        return user;
    }).catch(err => {
        console.error("got Error when login: " + err);
        return {'error': err.response.data.message}
    });
    
}

const removeCookies = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
}

export const logout =  student => {
    return axios
    .get('http://localhost:5000/signout')
    .then(res => {
        removeCookies();
        return { status: 'logout success' };
    })
    .catch(err => {
        console.error("got Error when logout: " + err);
        removeCookies();
        return {'error': err.response.data.message}
    });
}
