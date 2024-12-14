import { useEffect, useState } from "react";
import { Schema } from "./types";

interface Props {
  level: number;
  data: any;
  schema: Schema[];
  defaultExpended: boolean;
  handleChangeItem: Function;
}


export default function Row(props: Props) {
  const { level, data, handleChangeItem,schema,defaultExpended} = props;
  const childLevel = level < 2 ? level + 1 : 2;
  const [expanded, setExpended] = useState(defaultExpended);
  const [item, setItem] = useState<any>(data);
  const childList = data.children;
  useEffect(() => {
    console.log('Rerendering Row component', item)
    handleChangeItem(item)
  }, [item,expanded]);


  function handleChange(key: string, value: any) {
    const newData = { ...item, [key]: value }
    setItem(newData);
  }

  function childCallback(childPosition: number, child: any) {
    let newItemData = { ...item }
    newItemData.children[childPosition] = child;
    setItem(newItemData);
  }

  function calcPadding(headerIndex:number,item:any){
    if(headerIndex===0&&!childList){
      return `${(level)*40}px`
    }
    if(headerIndex===0){
      return `${(level)*20}px`
    }
    return '0px'
  }
  return (
    <>
      <tr className={`row-${level}`}>
        {schema.map((column: Schema,index:number) => {
          return (
            <td style={{ textAlign: index === 0 ? "left" : "center", paddingLeft:`${calcPadding(index,item)} ` }}>{column.element
              ?
              column.element({ data: item, text: item[column.fieldName], expanded: expanded, callback:()=> setExpended(expanded===undefined?false:!expanded), updateAttribute:(key:string,value:any)=>handleChange(key,value), hasChild: !!childList })
              :
              item[column.fieldName]
            }</td>
          )
        })}
      </tr>
      {
        childList && !expanded&&
        childList.map((row: any,i:number) => (
          <Row data={row} level={childLevel} handleChangeItem={(row: any) => childCallback(i,row)} schema={schema}
            defaultExpended={defaultExpended} />
        ))
      }
    </>
  )
}

