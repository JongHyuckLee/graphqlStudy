import axios from 'axios'
import React from 'react';

function App() {
  const [graphqlDataList, setGraphqlDataList] = React.useState([]);
  const [graphqlData, setGraphqlData] = React.useState('');
  const [graphqlCreate, setGraphqlCreate] = React.useState('');
  const [graphqlUpdate, setGraphqlUpdate] = React.useState('');
  const onCreateClickHandler = () => {
    (
       async () => {
         const result = await axios.post('http://localhost:4000/graphql', {
           query: ` mutation {
                          submitPost(input: {
                            author: "createTestAuthor",
                            body: "createTestBody"
                          }) {
                            id,
                            author,
                            body
                          }
                        }`
         });
         setGraphqlCreate(JSON.stringify(result?.data));
        }
    )()
  };

  const onUpdateClickHandler = () => {
      (
          async () => {
              const result = await axios.post('http://localhost:4000/graphql', {
                  query: ` mutation {
                          updatePost(input: {
                            id: 1,
                            author: "updateTestAuthor",
                            body: "updateTestBody"
                          }) {
                            id,
                            author,
                            body
                          }
                        }`
              });
              setGraphqlUpdate(JSON.stringify(result?.data));
          }
      )()
  }

  React.useEffect(() => {
    (async () => {
      const result = await axios.get('http://localhost:4000/graphql',  {
        params: {
          query: `{
                    posts {
                            id,
                            author,
                            body
                          }
                  }`
        }
      });
      setGraphqlDataList(JSON.stringify(result?.data));
    })()
  }, []);

  React.useEffect(() => {
    (async () => {
      const result = await axios.get('http://localhost:4000/graphql',  {
        params: {
          query: `{
                    post(id: 1) {
                                  id,
                                  author,
                                  body
                    }
                  }`
        }
      });
      setGraphqlData(JSON.stringify(result?.data));
    })()
  }, []);
  return (
    <div className="App">
      <div>{graphqlDataList}</div>
      <div>{graphqlData}</div>
      <button onClick={onCreateClickHandler}>Create Post</button>
      <div>{graphqlCreate}</div>
      <button onClick={onUpdateClickHandler}>Update Update</button>
      <div>{graphqlUpdate}</div>
    </div>
  );
}

export default App;
