import React from "react";
import Combo from "../interfaces/combo.interface";
import Props from "../interfaces/props.interface";
import "./Dropdown.css";

/**
 * Dropdown component
 * @component
 * @param {Props} props <pre><b>The props are the dropdown label's unique id, an optional default value, a message when data is empty, and data.</b> 

Corresponding to the Props interface {
  labelId: string;
  defaultValue?: Combo; // Optional to select the default value of the dropdown
  data: Combo[];
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
      messageIfNoData="Pas de données trouvées"
    />
</b></pre>
 * @returns {React.ReactElement} The corresponding Dropdown
 */
const Dropdown: React.FC<Props> = ({
  labelId,
  defaultValue,
  messageIfNoData,
  data,
}) => {
  const message = messageIfNoData;
  const comboId = "combo-" + labelId;
  const listboxId = "listbox-" + labelId;
  const dataIsFilled = Boolean(data) && data?.length > 0;
  const dataIsOverrided = Boolean(data[0]?.overrideValue);

  const [index, setIndex] = React.useState(initializeIndex());
  const [value, setValue] = React.useState(initializeValue());

  const [overrideValue, setOverrideValue] = React.useState(
    initializeOverrideValue()
  );
  const [close, setclose] = React.useState(true);
  const [searchString, setSearchString] = React.useState("");
  // No side effect when the user is typing a word
  React.useEffect(() => {
    if (searchString) {
      const newSearchStringToLowerCase = searchString.toLowerCase();
      const findIndex = data.findIndex((combo) => {
        return combo.value.toLowerCase().startsWith(newSearchStringToLowerCase);
      }, newSearchStringToLowerCase);

      let interval = setInterval(() => {
        if (findIndex >= 0) {
          updateValue(data[findIndex], findIndex, true);
        } else setSearchString("");
      }, 500);
      // the cleanup function for no memory leak
      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  const divTagContainer = React.useRef<HTMLDivElement>(null);

  /**
   * Initialize selected value's index
   * @returns {number} - 0 or the default value's corresponding index
   */
  function initializeIndex() {
    if (defaultValue) {
      const index = data
        .map(function (v) {
          return v.value;
        })
        .indexOf(defaultValue.value);
      return index;
    } else return 0;
  }
  /**
   * Initialize selected value's
   * @returns  {string} - The default value or the first one
   */
  function initializeValue() {
    if (defaultValue) {
      return defaultValue.value;
    } else {
      return data[0].value;
    }
  }
  /**
   * Initialize selected override value
   * @returns  {string} - The override value or the first value
   */
  function initializeOverrideValue() {
    if (dataIsOverrided) {
      return data[index].overrideValue;
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
      return Math.min(data.length - 1, index + addedPosition);
    } else {
      return Math.max(0, index + addedPosition);
    }
  };
  /**
   * Update the selected value of the dropdown and scroll to it if needed (even on click)
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
  }
  /**
   * Scroll to the selected div tag in the dropdown list
   * @param currentIndex {number} currentIndex - The index of selected value in the dropdown list
   */
  const scrollToSelectedDiv = (currentIndex: number) => {
    const { current } = divTagContainer;
    const selected = document.querySelector(
      `#${labelId + currentIndex}`
    ) as HTMLElement | null;

    if (current && selected && isScrollable(current)) {
      const offsetHeight = selected.offsetHeight;
      const offsetTop = selected.offsetTop;
      const { offsetHeight: parentOffsetHeight, scrollTop } = current;
      const isAbove = offsetTop < scrollTop;
      const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;
      if (isAbove) {
        current.scrollTo(0, offsetTop);
      } else if (isBelow) {
        current.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
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
        setCloseDropdown(!close);
      };
      const ENTER = () => {
        setCloseDropdown(!close);
      };
      const ESCAPE = () => {
        setCloseDropdown(true);
      };
      const HOME = () => {
        updateValue(data[0], 0, true);
      };
      const END = () => {
        updateValue(data[data.length - 1], data.length - 1, true);
      };
      const PAGEUP = () => {
        const newIndexPageUp = changeIndexInRangedValues(-10);
        updateValue(data[newIndexPageUp], newIndexPageUp, true);
      };
      const PAGEDOWN = () => {
        const newIndexPageDown = changeIndexInRangedValues(10);
        updateValue(data[newIndexPageDown], newIndexPageDown, true);
      };
      const ARROWUP = () => {
        const newIndexArrowUp = changeIndexInRangedValues(-1);
        updateValue(data[newIndexArrowUp], newIndexArrowUp, true);
      };
      const ARROWDOWN = () => {
        const newIndexArrowDown = changeIndexInRangedValues(1);
        updateValue(data[newIndexArrowDown], newIndexArrowDown, true);
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
        aria-labelledby={labelId}
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
        aria-labelledby={labelId}
        tabIndex={-1}
        ref={divTagContainer}
      >
        {data.map((d, index) => (
          <div
            onClick={() => updateValue(d, index)}
            key={labelId + index}
            title={d.overrideValue ? d.overrideValue : d.value}
            role="option"
            id={labelId + index}
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
