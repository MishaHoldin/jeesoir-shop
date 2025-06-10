const products = gql`
query($filters: ProductFiltersInput) {
  products(filters: $filters, pagination: { limit: 20 }, sort: []) {
    documentId
    images {
      url
    }
    sizes {
      Name
    }
    Name
    price
  }
}
`;

const getProduct = gql`
query($documentId: ID!)
{
  product(documentId: $documentId ) {
    documentId
   
    images {
      url
    }
    sizes {
      Name
    }
    Name
    price
    productNumber
    description
    material
    sizeTable{
      url
    }
    color{
      Name
      color
    }
    same_product{
      documentId
      Name
      images{
        url
      }
      description
      price
    }
  }
}
`;
const getProductSize = gql`
query($products: ID!)
{
  sizes(filters: {
    products:{documentId: {eq: $products}}
  }) {
    documentId
    Name
  }
}
`
export { products, getProduct, getProductSize };