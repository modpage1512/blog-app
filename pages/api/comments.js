import {GraphQLClient, gql} from "graphql-request"

const graphqlAPI = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDE3NTQ3NDgsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NreHcxczV3NTBpdWEwMXdlYjRtMTB4aDAvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMmFhNTJlYmUtMTE1Zi00MGIzLThjMTctMjE2NTg1YzU0NTAyIiwianRpIjoiY2t5N21kejhnMjgwcDAxejRkamQwZ3hjNSJ9.29WalK9oB3M_rgyzMIU9JFPS6hwdWCbxu7G6_caTmg3Ve2LVoIJ9Jzt2Yhs0PHdqFgQfgXyvDyyVpqfgRL4HjorrJJggX90HkMa_TY2IptEOr9d39tkpSeaR5OcWFdzm6tjbESBJSU1Q0TouNbl6DyEV0Q3kFYls5ByQaO36h43DqsULeyLfjgwWa6DvOe6MALj-DKZ5-Mc78d6bR-rU9JM60dM0rRNe1Eg0Fcd2A7mJCUk9Ma9ERbDanZ7O-AWjLG8yUbxdx9UDfyuGn4ZBaIp2IPUGRC8fb5ocLpNnBbZDMFtPrVOOfDwEui4xds-4w1K0hHoSftepSMI8O2hCs4Pek9741udO9IIij1YYuXlGr3lAKdMupFvh95qaLL1uUl4I2I3C87vPLCFSoPVMriEi5HleLcLadKVzDAUlhEyODamkcujWAi1wT0tdt0flwdXsc5YCaAPgPgeZ-aKSK5Qp76R_pi5GUj5wUybHa_WR40mNvfsrn94VB-TxDKUhTVpKWS424Cc92kRO1hxrlBB_c9myynE4tpVRsbw1XwAZoYIYzIfd1w_kOfRNlfDWPo8c8JNp4qHpfu0e8UlHG9V0E2BJuEPaD_Cz2brLGjg9cAVkDuucph6XIQrE9DH0OKN6KraVf5OJONOSSS6WSV_oi-dW0cZAFJNjs4jA7Ps";
const graphcmsToken = "https://api-us-east-1.graphcms.com/v2/ckxw1s5w50iua01web4m10xh0/master"

export default async function comments(req, res) {
  
  const graphQLClient = new GraphQLClient(graphcmsToken, {
    headers: {
      authorization: `Bearer ${graphqlAPI}`
    }
  })

  const query = gql `
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!){
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}){
        name,
        email, 
        comment,
        post {
          slug
        }
      }
    }
  `
    

    try {
      const result = await graphQLClient.request(query, {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        slug: req.body.slug,
      })
      return res.status(200).json(result)
    }catch(error){
      return res.status(500).json(error)
    }
    

}