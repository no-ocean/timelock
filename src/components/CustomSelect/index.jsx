import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { MdHorizontalRule } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import styles from './custom-select.module.scss';
const CaretDownIcon = ({disabled}) => {
  return <div className={`${styles.arrow} ${disabled ? styles.disabled : ''}`}></div>;
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon disabled={props.isDisabled}/>
    </components.DropdownIndicator>
  );
};

const CustomOption = props => (
  <components.Option {...props}>
    <div className={styles.option}>
      <img src={props.data.icon} alt="icon" className={styles.icon} />
      <span className={styles.label}>{props.data.label}</span>
    </div>
  </components.Option>
);

const CustomSingleValue = props => (
  <components.SingleValue {...props}>
    <div className={styles.option}>
      <img src={props.data.icon} alt="icon" className={styles.icon} />
      <span className={styles.label}>{props.data.label}</span>
    </div>
  </components.SingleValue>
);

const style = {
  control: (base, state) => ({
    ...base,
    borderRadius: '6px',
    borderColor: '#E1E1E1',
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      borderColor: state.isFocused ? '#33B18B' : '#E1E1E1'
    }
  })
};

const styleWithButtons = {
  control: (base, state) => ({
    ...base,
    borderRadius: '6px',
    borderColor: '#E1E1E1',
    boxShadow: state.isFocused ? 0 : 0,
    "&:hover": {
      borderColor: state.isFocused ? '#E1E1E1' : '#E1E1E1'
    },
    width: '100%',
  }),
  container: styles => ({ ...styles,  width: '100%' }),
  valueContainer: styles => ({ ...styles, padding: '2px 0 2px 8px'})
};

const CustomSelect = (
  {
    options,
    icons = false,
    buttons = false,
    field,
    setValue,
    name,
    isDisabled
  }
) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = (e) => {
    e.preventDefault();
    const newIndex = selectedOption
      ? (options.findIndex((option) => option.value === selectedOption.value) + 1) % options.length
      : 1;
    const newOption = options[newIndex];
    setSelectedOption(newOption);
    setValue(name, newOption.value);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    const newIndex = selectedOption
      ? (options.findIndex((option) => option.value === selectedOption.value) - 1 + options.length) % options.length
      : options.length - 1;
    const newOption = options[newIndex];
    setSelectedOption(newOption);
    setValue(name, newOption.value);
  };

  // return select with inc/dec buttons
  if (buttons) {
    return (
      <div className={styles.wrapper}>
        <button disabled={isDisabled} className={styles.button} onClick={(e) => handlePrev(e)}>
          <MdHorizontalRule />
        </button>
        <Select
          {...field}
          isDisabled={isDisabled}
          components={{
            DropdownIndicator,
            IndicatorSeparator: () => null
          }}
          placeholder={"Choose"}
          options={options}
          value={options.find(option => option.value === field.value)}
          onChange={(option) => { field.onChange(option.value); setSelectedOption(option); }}
          styles={styleWithButtons}
        />
        <button disabled={isDisabled} className={styles.button} onClick={(e) => handleNext(e)}>
          <MdAdd />
        </button>
      </div>
    )
  }

  // return select with icons
  if (icons) {
    return (
      <Select
        {...field}
        isDisabled={isDisabled}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
          Option: CustomOption,
          SingleValue: CustomSingleValue
        }}
        placeholder={"Choose"}
        options={options}
        value={options.find(option => option.value === field.value)}
        onChange={(option) => { field.onChange(option.value); setSelectedOption(option); }}
        styles={style}
      />
    );
  }

  // return default select
  return (
    <Select
      {...field}
      isDisabled={isDisabled}
      components={{
        DropdownIndicator,
        IndicatorSeparator: () => null
      }}
      placeholder={"Choose"}
      options={options}
      value={options.find(option => option.value === field.value)}
      onChange={(option) => { field.onChange(option.value); setSelectedOption(option); }}
      styles={style}
    />
  );
};

export default CustomSelect;