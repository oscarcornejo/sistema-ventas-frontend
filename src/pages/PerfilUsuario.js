import React, {useState} from 'react';
import { connect } from 'react-redux';

const PerfilUsuario = ({user}) => {


    const [id, setId] = useState(user._id);
    const [nombres, setNombres] = useState(user.nombres);
    const [apellidos, setApellidos] = useState(user.apellidos);
    const [email, setEmail] = useState(user.email);
    const [telefono, setTelefono] = useState(user.telefono);
    const [role, setRole] = useState(user.role);

    return (
        <div>
            <p>{nombres}</p>
            <p>{apellidos}</p>
            <p>{email}</p>
            <p>{telefono}</p>
            <p>{role}</p>
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.authReducers.user
});

export default connect(mapStateToProps)(PerfilUsuario);
