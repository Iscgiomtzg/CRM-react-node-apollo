import gql from 'graphql-tag';

 export const CLIENTES_QUERY = gql`query getClientes($limite: Int, $offset: Int){
  getClientes(limite: $limite, offset: $offset){
    id
    nombre
    apellido
    empresa
    emails {
      email
    }
    edad
    tipo
    pedidos {
      producto
      precio
    }
  }
  totalClientes
}`;

export const CLIENTE_QUERY = gql `
  query consultarCliente($id:ID) {
    getCliente(id: $id){
      id
      nombre
      apellido
      empresa
      emails {
        email
      }
      edad
      tipo
    }
  }
`;

export const PRODUCTOS_QUERY = gql `
{
  obtenerProductos{
    id
    nombre
    precio
    stock
  }
}
`;