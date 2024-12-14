import {useEffect, useState } from 'react';
import './App.css';
import Table from './Table';
import tree from './mock.json';
import CheckboxTitleComponent from './components/CheckboxTitleComponent';

function App() {
  const [data, setData] = useState<any[]>(tree)

  useEffect(() => {
    console.log('data:',data)
  }, [data])

  const Schema = [
    { header: 'First Name', fieldName: 'first_name', element: CheckboxTitleComponent },
    { header: 'Last Name', fieldName: 'last_name' },
    { header: 'Age', fieldName: 'age' },
    { header: 'Gender', fieldName: 'gender' }

]

  return (
    <div className="App">
      <Table data={data} setData={setData} schema={Schema} expendedLook={true}  />
    </div>
  );
}

export default App;
