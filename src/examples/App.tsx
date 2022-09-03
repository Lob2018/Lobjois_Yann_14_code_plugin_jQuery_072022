import React from "react";
import  Dropdown  from "../lib";

const App = () => (
  <div style={{ width: "100%", margin: "15px auto" }}>
    <h1>Render React Dropdown Component Library</h1>
    <label id="combo-label1">Dropdown with values</label>
    <Dropdown
      labelId="combo-label1"
      defaultValue={{ value: "Marketing" }}
      data={[
        { value: "Sales" },
        { value: "Marketing" },
        { value: "Engineering" },
        { value: "Human Resources" },
        { value: "Legal" },
      ]}
      messageIfNoData="Pas de données trouvées"
    />
    <label id="combo-label2">Dropdown with values and overrided titles</label>
    <Dropdown
      labelId="combo-label2"
      defaultValue={{ value: "California", overrideValue: "CA" }}
      data={[
        {
          value: "Alabama",
          overrideValue: "AL",
        },
        {
          value: "Alaska",
          overrideValue: "AK",
        },
        {
          value: "American Samoa",
          overrideValue: "AS",
        },
        {
          value: "Arizona",
          overrideValue: "AZ",
        },
        {
          value: "Arkansas",
          overrideValue: "AR",
        },
        {
          value: "California",
          overrideValue: "CA",
        },
        {
          value: "Colorado",
          overrideValue: "CO",
        },
        {
          value: "Connecticut",
          overrideValue: "CT",
        },
        {
          value: "Delaware",
          overrideValue: "DE",
        },
        {
          value: "District Of Columbia",
          overrideValue: "DC",
        },
        {
          value: "Federated States Of Micronesia",
          overrideValue: "FM",
        },
        {
          value: "Florida",
          overrideValue: "FL",
        },
        {
          value: "Georgia",
          overrideValue: "GA",
        },
        {
          value: "Guam",
          overrideValue: "GU",
        },
        {
          value: "Hawaii",
          overrideValue: "HI",
        },
        {
          value: "Idaho",
          overrideValue: "ID",
        },
        {
          value: "Illinois",
          overrideValue: "IL",
        },
        {
          value: "Indiana",
          overrideValue: "IN",
        },
        {
          value: "Iowa",
          overrideValue: "IA",
        },
        {
          value: "Kansas",
          overrideValue: "KS",
        },
        {
          value: "Kentucky",
          overrideValue: "KY",
        },
        {
          value: "Louisiana",
          overrideValue: "LA",
        },
        {
          value: "Maine",
          overrideValue: "ME",
        },
        {
          value: "Marshall Islands",
          overrideValue: "MH",
        },
        {
          value: "Maryland",
          overrideValue: "MD",
        },
        {
          value: "Massachusetts",
          overrideValue: "MA",
        },
        {
          value: "Michigan",
          overrideValue: "MI",
        },
        {
          value: "Minnesota",
          overrideValue: "MN",
        },
        {
          value: "Mississippi",
          overrideValue: "MS",
        },
        {
          value: "Missouri",
          overrideValue: "MO",
        },
        {
          value: "Montana",
          overrideValue: "MT",
        },
        {
          value: "Nebraska",
          overrideValue: "NE",
        },
        {
          value: "Nevada",
          overrideValue: "NV",
        },
        {
          value: "New Hampshire",
          overrideValue: "NH",
        },
        {
          value: "New Jersey",
          overrideValue: "NJ",
        },
        {
          value: "New Mexico",
          overrideValue: "NM",
        },
        {
          value: "New York",
          overrideValue: "NY",
        },
        {
          value: "North Carolina",
          overrideValue: "NC",
        },
        {
          value: "North Dakota",
          overrideValue: "ND",
        },
        {
          value: "Northern Mariana Islands",
          overrideValue: "MP",
        },
        {
          value: "Ohio",
          overrideValue: "OH",
        },
        {
          value: "Oklahoma",
          overrideValue: "OK",
        },
        {
          value: "Oregon",
          overrideValue: "OR",
        },
        {
          value: "Palau",
          overrideValue: "PW",
        },
        {
          value: "Pennsylvania",
          overrideValue: "PA",
        },
        {
          value: "Puerto Rico",
          overrideValue: "PR",
        },
        {
          value: "Rhode Island",
          overrideValue: "RI",
        },
        {
          value: "South Carolina",
          overrideValue: "SC",
        },
        {
          value: "South Dakota",
          overrideValue: "SD",
        },
        {
          value: "Tennessee",
          overrideValue: "TN",
        },
        {
          value: "Texas",
          overrideValue: "TX",
        },
        {
          value: "Utah",
          overrideValue: "UT",
        },
        {
          value: "Vermont",
          overrideValue: "VT",
        },
        {
          value: "Virgin Islands",
          overrideValue: "VI",
        },
        {
          value: "Virginia",
          overrideValue: "VA",
        },
        {
          value: "Washington",
          overrideValue: "WA",
        },
        {
          value: "West Virginia",
          overrideValue: "WV",
        },
        {
          value: "Wisconsin",
          overrideValue: "WI",
        },
        {
          value: "Wyoming",
          overrideValue: "WY",
        },
      ]}
      messageIfNoData="Pas de données trouvées"
    />
        <Dropdown
      labelId="combo1-label2"
      defaultValue={{ value: "Alaska" }}
      data={[]}
      messageIfNoData="Pas de données trouvées"
    />
  </div>
);

export default App;
