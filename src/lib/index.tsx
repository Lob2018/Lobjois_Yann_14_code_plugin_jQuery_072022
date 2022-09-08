import React from "react";
import "./style.scss";

interface Combo {
  value: string;
  overrideValue?: string;
}
interface Props {
  labelId: string;
  defaultValue?: Combo;
  messageIfNoData: string;
  data: Combo[];
  liftingDropDownValueUp: (value: string) => void;
}

/**
 * Dropdown component
 * @component
 * @param {Props} props <pre><b>The props are the dropdown label's unique id, an optional default value, a message when data is empty, and data.<br/>The setter function liftingDropDownValueUp to update the parent's state with the selected value</b> 

Corresponding to the Props interface {
  labelId: string;
  defaultValue?: Combo; // Optional to select the default value of the dropdown
  data: Combo[];
  liftingDropDownValueUp: (value: string) => void; // function lifting state up the selected value
}
The Combo interface {
  value: string; // The value shown in the dropdown
  overrideValue?: string; // Optional to change the title tag's value.  
}

<b>Example : 
    &lt;Dropdown
      labelId="service-label"
      defaultValue={{ value: "Marketing" }}
      data={[
        { value: "Sales" },
        { value: "Marketing" },
        { value: "Engineering" },
        { value: "Human Resources" },
        { value: "Legal" },
      ]}
      messageIfNoData="No data found"
      liftingDropDownValueUp={handleTextValueChangeDropdown1}
    />
</b></pre>
 * @returns {React.ReactElement} The corresponding Dropdown
 */
const Dropdown = (props: Props) => {
  const message = props.messageIfNoData;
  const comboId = "combo-" + props.labelId;
  const listboxId = "listbox-" + props.labelId;
  const dataIsFilled = Boolean(props.data) && props.data?.length > 0;
  const dataIsOverrided = Boolean(props.data[0]?.overrideValue);

  const [index, setIndex] = React.useState(initializeIndex());
  const [value, setValue] = React.useState(initializeValue());

  const defautValueFound = initializeOverrideValue();

  const [overrideValue, setOverrideValue] = React.useState(defautValueFound);
  const [close, setclose] = React.useState(true);
  const [searchString, setSearchString] = React.useState("");

  // Fix cannot update a component while rendering another
  React.useEffect(() => {
    props.liftingDropDownValueUp(defautValueFound ? defautValueFound : "");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // No side effect when the user is typing a word
  React.useEffect(() => {
    if (searchString) {
      const newSearchStringToLowerCase = searchString.toLowerCase();
      const findIndex = props.data.findIndex((combo) => {
        return combo.value.toLowerCase().startsWith(newSearchStringToLowerCase);
      }, newSearchStringToLowerCase);

      let interval = setInterval(() => {
        if (findIndex >= 0) {
          updateValue(props.data[findIndex], findIndex, true);
        } else setSearchString("");
      }, 500);
      // the cleanup function for no memory leak
      return () => {
        clearInterval(interval);
      };
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  /**
   * Initialize selected value's index
   * @returns {number} - 0 or the default value's corresponding index
   */
  function initializeIndex() {
    if (props.defaultValue) {
      const index = props.data
        .map(function (v) {
          return v.value;
        })
        .indexOf(props.defaultValue.value);
      return index;
    } else return 0;
  }
  /**
   * Initialize selected value's
   * @returns  {string} - The default value or the first one
   */
  function initializeValue() {
    if (props.defaultValue) {
      return props.defaultValue.value;
    } else {
      return props.data[0].value;
    }
  }
  /**
   * Initialize selected override value
   * @returns  {string} - The override value or the first value
   */
  function initializeOverrideValue() {
    if (dataIsOverrided) {
      return props.data[index].overrideValue;
    } else {
      return value;
    }
  }

  /**
   * Close the dropdown and clear the searching values or open it
   * @param boolClose {boolean} - Close or toggle the dropdown
   */
  const setCloseDropdown = (boolClose: boolean) => {
    setclose(boolClose);
    if (!close) {
      setSearchString("");
    }
  };
  /**
   * Add a value to the current index respecting the list's range values
   * @param addedPosition {number} - The value to add to the index
   * @returns {number} - The new corresponding index
   */
  const changeIndexInRangedValues = (addedPosition: number): number => {
    if (addedPosition === 0) {
      return addedPosition;
    } else if (addedPosition > 0) {
      return Math.min(props.data.length - 1, index + addedPosition);
    } else {
      return Math.max(0, index + addedPosition);
    }
  };
  /**
   * Update the selected value of the dropdown, scroll to it if needed (even on click), and lift state up the selected value
   * @param newValue {object} newValue - The new selected value of the dropdown
   * @param currentIndex? {number} currentIndex - The index of the new value (optional)
   * @param keepOpened? {boolean} keepOpened - Do we need to keep the dropdown opened (optional, toggle by default)
   */
  function updateValue(
    newValue: Combo,
    currentIndex?: number,
    keepOpened?: boolean
  ) {
    if (currentIndex === 0 || currentIndex) {
      setIndex(currentIndex);
      scrollToSelectedDiv(currentIndex);
    }
    setValue(newValue.value);
    setOverrideValue(dataIsOverrided ? newValue.overrideValue : newValue.value);
    keepOpened ? setCloseDropdown(false) : setCloseDropdown(true);
    // lifting state up the selected value with the function
    if (dataIsOverrided) {
      props.liftingDropDownValueUp(
        newValue.overrideValue ? newValue.overrideValue : ""
      );
    } else {
      props.liftingDropDownValueUp(newValue.value ? newValue.value : "");
    }
  }
  /**
   * Scroll to the selected div tag in the dropdown list
   * @param currentIndex {number} currentIndex - The index of selected value in the dropdown list
   */
  const scrollToSelectedDiv = (currentIndex: number) => {
    const divTagContainer = document.querySelector(
      `#${listboxId}`
    ) as HTMLDivElement | null;

    if (divTagContainer)
      divTagContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    const selected = document.querySelector(
      `#${props.labelId + currentIndex}`
    ) as HTMLElement | null;

    if (divTagContainer && selected && isScrollable(divTagContainer)) {
      const offsetHeight = selected.offsetHeight;
      const offsetTop = selected.offsetTop;
      const { offsetHeight: parentOffsetHeight, scrollTop } = divTagContainer;
      const isAbove = offsetTop < scrollTop;
      const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;
      if (isAbove) {
        divTagContainer.scrollTo(0, offsetTop);
      } else if (isBelow) {
        divTagContainer.scrollTo(
          0,
          offsetTop - parentOffsetHeight + offsetHeight
        );
      }
    }
  };
  /**
   * Know if the Div element is scrollable
   * @param div {HTMLDivElement} - The div to test
   * @returns {boolean} - Is it scrollable or not
   */
  const isScrollable = (div: HTMLDivElement) => {
    return div && div.clientHeight < div.scrollHeight;
  };

  /**
   * Dropdown key down event
   * @param e {React.KeyboardEvent<HTMLElement>} e - The event
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e) {
      const { key } = e;
      const SPACE = () => {
        e.preventDefault();
        setCloseDropdown(!close);
      };
      const ENTER = () => {
        setCloseDropdown(!close);
      };
      const ESCAPE = () => {
        setCloseDropdown(true);
      };
      const HOME = () => {
        e.preventDefault();
        updateValue(props.data[0], 0, true);
      };
      const END = () => {
        e.preventDefault();
        updateValue(
          props.data[props.data.length - 1],
          props.data.length - 1,
          true
        );
      };
      const PAGEUP = () => {
        e.preventDefault();
        const newIndexPageUp = changeIndexInRangedValues(-10);
        updateValue(props.data[newIndexPageUp], newIndexPageUp, true);
      };
      const PAGEDOWN = () => {
        e.preventDefault();
        const newIndexPageDown = changeIndexInRangedValues(10);
        updateValue(props.data[newIndexPageDown], newIndexPageDown, true);
      };
      const ARROWUP = () => {
        e.preventDefault();
        const newIndexArrowUp = changeIndexInRangedValues(-1);
        updateValue(props.data[newIndexArrowUp], newIndexArrowUp, true);
      };
      const ARROWDOWN = () => {
        e.preventDefault();
        const newIndexArrowDown = changeIndexInRangedValues(1);
        updateValue(props.data[newIndexArrowDown], newIndexArrowDown, true);
      };
      const DEFAULT = () => {
        if (key.length === 1) {
          const newSearchString = searchString + key;
          setSearchString(newSearchString);
        }
      };
      const Keys: { [K: string]: Function } = {
        " ": SPACE,
        Enter: ENTER,
        Escape: ESCAPE,
        Home: HOME,
        End: END,
        PageUp: PAGEUP,
        PageDown: PAGEDOWN,
        ArrowUp: ARROWUP,
        ArrowDown: ARROWDOWN,
        Default: DEFAULT,
      };
      (Keys[key] || Keys["Default"])();
    }
  };
  /**
   * Dropdown blur event (close the dropdown)
   * @param e {React.KeyboardEvent<HTMLElement>} e - The event
   */
  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (
      e.currentTarget.getAttribute("aria-labelledby") !==
      e.relatedTarget?.getAttribute("aria-labelledby")
    )
      setCloseDropdown(true);
  };
  /**
   * Dropdown click event (open or close the dropdown)
   * @param e {React.KeyboardEvent<HTMLElement>} e - The event
   */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCloseDropdown(!close);
  };

  return dataIsFilled ? (
    <div className={close ? "combo js-select" : "combo js-select open"}>
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-controls={listboxId}
        aria-expanded={!close}
        aria-haspopup="listbox"
        aria-labelledby={props.labelId}
        id={comboId}
        className="combo-input"
        role="combobox"
        tabIndex={0}
        aria-activedescendant={!close ? value : ""}
        title={overrideValue}
        onBlur={handleBlur}
      >
        {value}
      </div>
      <div
        className="combo-menu"
        role="listbox"
        id={listboxId}
        aria-labelledby={props.labelId}
        tabIndex={-1}
      >
        {props.data.map((d, index) => (
          <div
            onClick={() => updateValue(d, index)}
            key={props.labelId + index}
            title={d.overrideValue ? d.overrideValue : d.value}
            role="option"
            id={props.labelId + index}
            className={
              value === d.value ? "combo-option option-current" : "combo-option"
            }
            aria-selected={value === d.value ? true : false}
          >
            {d.value}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>{message}</p>
  );
};

export default Dropdown;
