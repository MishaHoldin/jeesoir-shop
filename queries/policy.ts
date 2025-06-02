const returnPolicy = gql`
query
{
  return{
    text
  }
}
`;

const privacyPolicy = gql`
query
{
  privacyPolicy{
    text
  }
}
`;
const termsPolicy = gql`
query
{
  term{
    Text
  }
}

`;

export { returnPolicy, privacyPolicy, termsPolicy };