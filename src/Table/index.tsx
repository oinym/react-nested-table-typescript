import { useEffect, useState } from "react";
import Row from "./Row";

import './styles.css';
import { Schema } from "./types";

interface Props{
  data: any[];
  schema: Schema[];
  setData: Function;
  expendedLook: boolean;
}


export default function Table(props:Props) {
  const { setData, data, schema,expendedLook } = props
  const [items, setItems] = useState<any[]>(data);


  useEffect(() => {
    console.log('Table items:', items)
    setData(items)
  }, [items])
  
  function handleChangedItem(newItem:any, index:number) {
    let newItems = [...items];
    items[index] = newItem;
    setItems(newItems);
  }

  return (
    <table className="nested-table">
      <thead>
        <tr>
          {schema.map((column: Schema) => (
            <th>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.length>0&&items.map((row:any,index:number) =>  (
          <Row data={row}  handleChangeItem={(newItem:any)=>handleChangedItem(newItem,index)} level={0} 
            schema={schema} defaultExpended={expendedLook} />
        ))}
      </tbody>
    </table>
  )
}