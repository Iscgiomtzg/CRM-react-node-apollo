import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
  mutation crearCliente($input: ClienteInput){
    crearCliente(input: $input){
      id
      nombre
      apellido
      empresa
      emails{
        email
      }
      edad
      tipo
    }
  }
`;

export const ACTUALIZAR_CLIENTE = gql `
  mutation actualizarCliente($input: ClienteInput){
    actualizarCliente(input:$input){
      id
      nombre
      apellido
      empresa
      emails{
        email
      }
      edad
      tipo
    }
  }
`;

export const ELIMINAR_CLIENTE = gql `
  mutation  eliminarCliente($id:ID!){
    eliminarCliente(id:$id)
  }
`;

export const NUEVO_PRODUCTO = gql `
  mutation nuevoProducto($input: ProductoInput){
    nuevoProducto(input:$input){
      nombre
      precio
      stock
    }
  }
`;

export const ELIMINAR_PRODUCTO = gql `
  mutation eliminarProducto($id: ID!){
    eliminarProducto(id:$id)
  }
`;