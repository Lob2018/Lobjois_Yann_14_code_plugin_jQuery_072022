import Combo from "./combo.interface";

interface Props {  
  labelId: string;
  defaultValue?: Combo;
  messageIfNoData:string;
  data: Combo[];
}

export default Props;
