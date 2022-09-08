# Getting Started with React Dropdown Component Library

A library of React component for projects using [Create React App](https://github.com/facebook/create-react-app).

# react-dropdown-component-library

Created to replace the JQuery's widget [`selectmenu.js`](https://github.com/jquery/jquery-ui/blob/main/ui/widgets/selectmenu.js).

## Installation

```
npm install react-dropdown-component-library
```

## Usage

With value as title attribute and the default css

```typescript
import Dropdown from 'react-dropdown-component-library'
import 'react-dropdown-component-library/dist/style.css' // the default CSS

const App = () => {

    const [textValueDropdown1, setTextValueDropdown1] = React.useState("");
    const handleTextValueChangeDropdown1 = (value: string) => {
        setTextValueDropdown1(value ? value : "");
    };

    ...
    // show the selected value in the h1 tag (Marketing)
    return(
        <>            
            <h1>Dropdown value : {textValueDropdown1}</h1>
            <label id="combo-label1">Dropdown 1 with values</label>
            <Dropdown
            labelId="combo-label1"
            defaultValue={{ value: "Marketing" }}
            data={[
                { value: "Marketing" },
                { value: "Engineering" },
                { value: "Human Resources" },
                { value: "Legal" },
            ]}
            messageIfNoData="No data found"
            liftingDropDownValueUp={handleTextValueChangeDropdown1}
            />
        </>
    )
};
export default App;
```

Or with overrideValue as title attribute, and with your own style based [`from the original SASS file`](https://github.com/Lob2018/Lobjois_Yann_14_code_plugin_jQuery_072022/tree/main/src/lib/style.scss).

```typescript
import Dropdown from 'react-dropdown-component-library'
import './style.css'; // your own CSS

const App = () => {

    const [textValueDropdown2, setTextValueDropdown2] = React.useState("");
    const handleTextValueChangeDropdown2 = (value: string) => {
        setTextValueDropdown2(value ? value : "");
    };

    ...
    // show the selected overrideValue in the h1 tag (CA)
    return(
        <>            
            <h1>Dropdown value : {textValueDropdown2}</h1>
            <label id="combo-label2">Dropdown 2 with values</label>
            <Dropdown
            labelId="combo-label2"
            defaultValue={{ value: "California", overrideValue: "CA" }}
            data={[
                {
                    value: "California",
                    overrideValue: "CA",
                },
                {
                    value: "Colorado",
                    overrideValue: "CO",
                },
            ]}
            messageIfNoData="No data found"
            liftingDropDownValueUp={handleTextValueChangeDropdown2}
            />
        </>
    )
};
export default App;
```

## Documentation

[`The complete documentation of react-dropdown-component-library`](https://lob2018.github.io/Lobjois_Yann_14_code_plugin_jQuery_072022/).
