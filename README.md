# Getting Started with React Dropdown Component Library

A library of React component for projects using [Create React App](https://github.com/facebook/create-react-app).

<br />

# react-dropdown-component-library

Created to replace the JQuery's widget [`selectmenu.js`](https://github.com/jquery/jquery-ui/blob/main/ui/widgets/selectmenu.js).

<br />

## Description

It is a single-select combobox component that is functionally similar to an HTML select element. This select-only drop-down list is not created with an `<input>` element and does not accept free-form user input. Users can navigate using the arrow keys, or type characters, and the corresponding option is automatically selected and displayed in the view.

A tooltip shows the returned value, which can be the selected value or a replacement value (with overrideValue).

>  Implements the [ARIA design pattern for combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), but option list navigation sets the value of the input.

<br />

## Installation

```
npm install react-dropdown-component-library
```

<br />

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

<br />

## Documentation

[`The complete documentation of react-dropdown-component-library`](https://lob2018.github.io/Lobjois_Yann_14_code_plugin_jQuery_072022/).

<br />

## CodeSandbox experience

[`Online React Dropdown Component Library code editor and prototyping`](https://codesandbox.io/s/dropdown-pybhpn?file=/src/examples/App.tsx)