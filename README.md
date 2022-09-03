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

```
import Dropdown from 'react-dropdown-component-library'
import 'react-dropdown-component-library/dist/style.css' 

...
return(
    <>
        <Dropdown
        labelId="combo-label1"
        defaultValue={{ value: "Marketing" }}
        data={[
            { value: "France" },
            { value: "Marketing" },
            { value: "Engineering" },
            { value: "Human Resources" },
            { value: "Legal" },
        ]}
        messageIfNoData="Pas de données trouvées"
        />
    </>
)
```

Or with overrideValue as title attribute, and with your own style based [`from the original SASS file`](https://github.com/Lob2018/Lobjois_Yann_14_code_plugin_jQuery_072022/tree/main/src/lib/style.scss).

```
import Dropdown from 'react-dropdown-component-library'

...
return(
    <>
        <Dropdown
        labelId="combo-label1"
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
        messageIfNoData="Pas de données trouvées"
        />
    </>
)
```