import axios from 'axios'
import React from 'react';

function App() {
  const [graphqlDataList, setGraphqlDataList] = React.useState([]);
  const [graphqlData, setGraphqlData] = React.useState('');

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
  }, [])

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
  }, [])
  return (
    <div className="App">
      <div>{graphqlDataList}</div>
      <div>{graphqlData}</div>
    </div>
  );
}

export default App;
