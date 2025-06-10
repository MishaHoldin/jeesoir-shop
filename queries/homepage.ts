const homepage = gql`
query
{
  homepage(status: PUBLISHED) {
    documentId
    banner {
      id
      Title
      btnText
      btnLink
      image{
        url
      }
    }
    swiperItems {
      id
      Title
      products(filters: {}, pagination: {limit: 20}, sort: []){
        documentId
        images{
          url
        }
        sizes{
          Name
        }
        Name
        price
      }
      btnText
      btnLink
    }
    itemBlock {
      id
      image{
        url
      }
    }
    swiperItems2 {
      id
      Title
      products(filters: {}, pagination: {limit: 20}, sort: []){
        documentId
        images{
          url
        }
        sizes{
          Name
        }
        Name
        price
      }
      btnText
      btnLink
    }
    images {
      id
      image{
        url
      }
    }
    swiperItems3 {
      id
      Title
      products(filters: {}, pagination: {limit: 20}, sort: []){
        documentId
        images{
          url
        }
        sizes{
          Name
        }
        Name
        price
      }
      btnText
      btnLink
    }
  }
}
`;

export { homepage };