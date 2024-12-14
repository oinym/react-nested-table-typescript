import { useEffect, useState } from "react";

interface Props{
  record: any;
  updateAttribute: Function;
  text: string;
  expanded: boolean;
  callback: Function;
  hasChild: boolean;
}

export default function CheckboxTitleComponent(props: Props) {
  const { record, text, expanded, callback, hasChild ,updateAttribute} = props;
  console.log('ReRendering checkbox...')
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log('ReRendering expanded checkbox...')
    updateAttribute('checked',checked)
  },[expanded, checked, record])

  return <div className="checkbox-wrapper">
    {hasChild &&
      <div className="box">

        <button onClick={() => callback(!expanded)}>{!expanded ? '-' : '+'}</button>
      </div>
    }
    
    <input type={'checkbox'} onChange={()=>setChecked(!checked)} />
    <span>
      {text}
    </span>
  </div>;
}
